-- Etapa 1 Supabase: tabelas essenciais da SOU Ops.
-- Esta migration nao insere dados reais e nao usa service_role.

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid not null unique references auth.users(id) on delete cascade,
  name text not null,
  email text not null,
  role text not null check (role in ('admin', 'collaborator', 'client')),
  position text,
  color text,
  status text not null default 'active' check (status in ('active', 'inactive')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  status text not null default 'Ativo',
  owner_id uuid references public.profiles(id) on delete set null,
  finance_status text not null default 'Regular',
  notes_internal text,
  notes_client text,
  contract_status text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.client_members (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  member_role text not null default 'member',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (client_id, profile_id)
);

create table if not exists public.demands (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  owner_id uuid references public.profiles(id) on delete set null,
  title text not null,
  description text,
  status text not null default 'Backlog',
  priority text not null default 'Media',
  project_priority text not null default 'Media',
  flow_type text not null default 'Ciclo mensal',
  stage text not null default 'Ideia',
  due_date date,
  delivered_date date,
  calendar_date date,
  start_time time,
  estimated_hours numeric(8, 2) not null default 0,
  actual_hours numeric(8, 2) not null default 0,
  is_client_visible boolean not null default false,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.demand_checklist_items (
  id uuid primary key default gen_random_uuid(),
  demand_id uuid not null references public.demands(id) on delete cascade,
  text text not null,
  done boolean not null default false,
  position integer not null default 0,
  is_client_visible boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists profiles_auth_user_id_idx on public.profiles(auth_user_id);
create index if not exists profiles_role_idx on public.profiles(role);
create index if not exists clients_owner_id_idx on public.clients(owner_id);
create index if not exists client_members_client_id_idx on public.client_members(client_id);
create index if not exists client_members_profile_id_idx on public.client_members(profile_id);
create index if not exists demands_client_id_idx on public.demands(client_id);
create index if not exists demands_owner_id_idx on public.demands(owner_id);
create index if not exists demand_checklist_items_demand_id_idx on public.demand_checklist_items(demand_id);

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists set_clients_updated_at on public.clients;
create trigger set_clients_updated_at
before update on public.clients
for each row execute function public.set_updated_at();

drop trigger if exists set_client_members_updated_at on public.client_members;
create trigger set_client_members_updated_at
before update on public.client_members
for each row execute function public.set_updated_at();

drop trigger if exists set_demands_updated_at on public.demands;
create trigger set_demands_updated_at
before update on public.demands
for each row execute function public.set_updated_at();

drop trigger if exists set_demand_checklist_items_updated_at on public.demand_checklist_items;
create trigger set_demand_checklist_items_updated_at
before update on public.demand_checklist_items
for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.clients enable row level security;
alter table public.client_members enable row level security;
alter table public.demands enable row level security;
alter table public.demand_checklist_items enable row level security;

create or replace function public.current_profile_id()
returns uuid
language sql
security definer
set search_path = public
stable
as $$
  select id
  from public.profiles
  where auth_user_id = auth.uid()
  limit 1
$$;

create or replace function public.current_profile_role()
returns text
language sql
security definer
set search_path = public
stable
as $$
  select role
  from public.profiles
  where auth_user_id = auth.uid()
  limit 1
$$;

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select coalesce(public.current_profile_role() = 'admin', false)
$$;

create or replace function public.is_collaborator()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select coalesce(public.current_profile_role() = 'collaborator', false)
$$;

create or replace function public.is_client()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select coalesce(public.current_profile_role() = 'client', false)
$$;

create or replace function public.can_access_client(target_client_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select
    public.is_admin()
    or exists (
      select 1
      from public.client_members cm
      where cm.client_id = target_client_id
        and cm.profile_id = public.current_profile_id()
    )
$$;

create or replace function public.can_access_demand(target_demand_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select
    public.is_admin()
    or exists (
      select 1
      from public.demands d
      where d.id = target_demand_id
        and (
          d.owner_id = public.current_profile_id()
          or public.can_access_client(d.client_id)
        )
    )
$$;

drop policy if exists "profiles_select_own_or_admin" on public.profiles;
create policy "profiles_select_own_or_admin"
on public.profiles
for select
to authenticated
using (
  auth_user_id = auth.uid()
  or public.is_admin()
);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
on public.profiles
for insert
to authenticated
with check (
  auth_user_id = auth.uid()
  and role in ('client', 'collaborator')
);

drop policy if exists "profiles_update_admin" on public.profiles;
create policy "profiles_update_admin"
on public.profiles
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "clients_select_by_access" on public.clients;
create policy "clients_select_by_access"
on public.clients
for select
to authenticated
using (public.can_access_client(id));

drop policy if exists "clients_insert_admin" on public.clients;
create policy "clients_insert_admin"
on public.clients
for insert
to authenticated
with check (public.is_admin());

drop policy if exists "clients_update_admin" on public.clients;
create policy "clients_update_admin"
on public.clients
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "clients_delete_admin" on public.clients;
create policy "clients_delete_admin"
on public.clients
for delete
to authenticated
using (public.is_admin());

drop policy if exists "client_members_select_by_access" on public.client_members;
create policy "client_members_select_by_access"
on public.client_members
for select
to authenticated
using (
  public.is_admin()
  or (
    public.is_collaborator()
    and public.can_access_client(client_id)
  )
  or (
    public.is_client()
    and profile_id = public.current_profile_id()
  )
);

drop policy if exists "client_members_insert_admin" on public.client_members;
create policy "client_members_insert_admin"
on public.client_members
for insert
to authenticated
with check (public.is_admin());

drop policy if exists "client_members_update_admin" on public.client_members;
create policy "client_members_update_admin"
on public.client_members
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "client_members_delete_admin" on public.client_members;
create policy "client_members_delete_admin"
on public.client_members
for delete
to authenticated
using (public.is_admin());

drop policy if exists "demands_select_by_access" on public.demands;
create policy "demands_select_by_access"
on public.demands
for select
to authenticated
using (
  public.is_admin()
  or (
    public.is_collaborator()
    and (
      owner_id = public.current_profile_id()
      or public.can_access_client(client_id)
    )
  )
  or (
    public.is_client()
    and is_client_visible = true
    and public.can_access_client(client_id)
  )
);

drop policy if exists "demands_insert_admin_or_collaborator" on public.demands;
create policy "demands_insert_admin_or_collaborator"
on public.demands
for insert
to authenticated
with check (
  public.is_admin()
  or (
    public.is_collaborator()
    and public.can_access_client(client_id)
  )
);

drop policy if exists "demands_update_admin_or_owner" on public.demands;
create policy "demands_update_admin_or_owner"
on public.demands
for update
to authenticated
using (
  public.is_admin()
  or (
    public.is_collaborator()
    and owner_id = public.current_profile_id()
  )
)
with check (
  public.is_admin()
  or (
    public.is_collaborator()
    and owner_id = public.current_profile_id()
  )
);

drop policy if exists "demands_delete_admin" on public.demands;
create policy "demands_delete_admin"
on public.demands
for delete
to authenticated
using (public.is_admin());

drop policy if exists "demand_checklist_items_select_by_access" on public.demand_checklist_items;
create policy "demand_checklist_items_select_by_access"
on public.demand_checklist_items
for select
to authenticated
using (
  public.is_admin()
  or (
    public.is_collaborator()
    and public.can_access_demand(demand_id)
  )
  or (
    public.is_client()
    and is_client_visible = true
    and exists (
      select 1
      from public.demands d
      where d.id = demand_id
        and d.is_client_visible = true
        and public.can_access_client(d.client_id)
    )
  )
);

drop policy if exists "demand_checklist_items_insert_admin_or_collaborator" on public.demand_checklist_items;
create policy "demand_checklist_items_insert_admin_or_collaborator"
on public.demand_checklist_items
for insert
to authenticated
with check (
  public.is_admin()
  or (
    public.is_collaborator()
    and public.can_access_demand(demand_id)
  )
);

drop policy if exists "demand_checklist_items_update_admin_or_collaborator" on public.demand_checklist_items;
create policy "demand_checklist_items_update_admin_or_collaborator"
on public.demand_checklist_items
for update
to authenticated
using (
  public.is_admin()
  or (
    public.is_collaborator()
    and public.can_access_demand(demand_id)
  )
)
with check (
  public.is_admin()
  or (
    public.is_collaborator()
    and public.can_access_demand(demand_id)
  )
);

drop policy if exists "demand_checklist_items_delete_admin" on public.demand_checklist_items;
create policy "demand_checklist_items_delete_admin"
on public.demand_checklist_items
for delete
to authenticated
using (public.is_admin());
