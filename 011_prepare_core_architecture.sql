-- 011 - Preparacao incremental da arquitetura definitiva da SOU Ops.
-- Este arquivo NAO deve ser executado sem revisao previa.
-- Objetivo: preparar a base real para clients -> brands -> contracts -> demands
-- sem quebrar o frontend atual, que ainda depende de demands.client_id e localStorage.
--
-- Regras desta etapa:
-- - Nao remove colunas antigas.
-- - Nao remove demands.client_id.
-- - Adiciona demands.brand_id apenas como opcional.
-- - Nao migra dados automaticamente.
-- - Nao cria logica operacional complexa no banco.
-- - Nao implementa regras avancadas de cliente externo.
-- - Mantem RLS simples: admin com acesso total e colaboradores autenticados com acesso operacional basico.
-- - Collaborator autenticado possui acesso operacional amplo temporariamente.
-- - Policies especificas por brand_members serao implementadas em etapa futura.
-- - Cliente externo ainda nao esta habilitado nesta fase.
--
-- Dependencias esperadas antes da execucao:
-- - public.clients ja deve existir.
-- - public.demands ja deve existir.
-- - auth.users deve estar disponivel via Supabase Auth.

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
  email text,
  role text not null check (role in ('admin', 'collaborator', 'client')),
  position text,
  color text,
  status text not null default 'active' check (status in ('active', 'inactive')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles
alter column email drop not null;

create table if not exists public.brands (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  name text not null,
  slug text unique,
  status text not null default 'active' check (status in ('active', 'inactive', 'onboarding', 'paused', 'closed')),
  segment text,
  notes_internal text,
  notes_client text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.contracts (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  title text not null,
  contract_type text not null default 'paid' check (contract_type in ('paid', 'barter', 'mixed', 'courtesy')),
  status text not null default 'active' check (status in ('draft', 'active', 'paused', 'ended', 'cancelled')),
  start_date date,
  end_date date,
  billing_day integer check (billing_day between 1 and 31),
  monthly_value numeric(12, 2),
  barter_description text,
  is_internal boolean not null default false,
  finance_status text not null default 'regular',
  legal_status text not null default 'pending',
  notes_internal text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.contract_brands (
  id uuid primary key default gen_random_uuid(),
  contract_id uuid not null references public.contracts(id) on delete cascade,
  brand_id uuid not null references public.brands(id) on delete cascade,
  scope_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (contract_id, brand_id)
);

create table if not exists public.brand_members (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid not null references public.brands(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  member_role text not null default 'member',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (brand_id, profile_id)
);

alter table public.demands
add column if not exists brand_id uuid references public.brands(id) on delete set null;

create index if not exists profiles_auth_user_id_idx on public.profiles(auth_user_id);
create index if not exists profiles_role_idx on public.profiles(role);
create index if not exists brands_client_id_idx on public.brands(client_id);
create index if not exists brands_slug_idx on public.brands(slug);
create index if not exists brands_status_idx on public.brands(status);
create index if not exists contracts_client_id_idx on public.contracts(client_id);
create index if not exists contracts_status_idx on public.contracts(status);
create index if not exists contracts_contract_type_idx on public.contracts(contract_type);
create index if not exists contract_brands_contract_id_idx on public.contract_brands(contract_id);
create index if not exists contract_brands_brand_id_idx on public.contract_brands(brand_id);
create index if not exists brand_members_brand_id_idx on public.brand_members(brand_id);
create index if not exists brand_members_profile_id_idx on public.brand_members(profile_id);
create index if not exists demands_brand_id_idx on public.demands(brand_id);

do $$
begin
  if not exists (
    select 1
    from pg_trigger
    where tgname = 'set_profiles_updated_at'
      and tgrelid = 'public.profiles'::regclass
  ) then
    create trigger set_profiles_updated_at
    before update on public.profiles
    for each row execute function public.set_updated_at();
  end if;

  if not exists (
    select 1
    from pg_trigger
    where tgname = 'set_brands_updated_at'
      and tgrelid = 'public.brands'::regclass
  ) then
    create trigger set_brands_updated_at
    before update on public.brands
    for each row execute function public.set_updated_at();
  end if;

  if not exists (
    select 1
    from pg_trigger
    where tgname = 'set_contracts_updated_at'
      and tgrelid = 'public.contracts'::regclass
  ) then
    create trigger set_contracts_updated_at
    before update on public.contracts
    for each row execute function public.set_updated_at();
  end if;

  if not exists (
    select 1
    from pg_trigger
    where tgname = 'set_contract_brands_updated_at'
      and tgrelid = 'public.contract_brands'::regclass
  ) then
    create trigger set_contract_brands_updated_at
    before update on public.contract_brands
    for each row execute function public.set_updated_at();
  end if;

  if not exists (
    select 1
    from pg_trigger
    where tgname = 'set_brand_members_updated_at'
      and tgrelid = 'public.brand_members'::regclass
  ) then
    create trigger set_brand_members_updated_at
    before update on public.brand_members
    for each row execute function public.set_updated_at();
  end if;
end;
$$;

alter table public.profiles enable row level security;
alter table public.brands enable row level security;
alter table public.contracts enable row level security;
alter table public.contract_brands enable row level security;
alter table public.brand_members enable row level security;

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

drop policy if exists "profiles_select_self_or_admin_011" on public.profiles;
create policy "profiles_select_self_or_admin_011"
on public.profiles
for select
to authenticated
using (
  auth_user_id = auth.uid()
  or public.is_admin()
);

drop policy if exists "profiles_insert_self_non_admin_011" on public.profiles;
create policy "profiles_insert_self_non_admin_011"
on public.profiles
for insert
to authenticated
with check (
  auth_user_id = auth.uid()
  and role in ('collaborator', 'client')
);

drop policy if exists "profiles_update_admin_011" on public.profiles;
create policy "profiles_update_admin_011"
on public.profiles
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "brands_select_admin_or_collaborator_011" on public.brands;
create policy "brands_select_admin_or_collaborator_011"
on public.brands
for select
to authenticated
using (
  public.is_admin()
  or public.is_collaborator()
);

drop policy if exists "brands_insert_admin_011" on public.brands;
create policy "brands_insert_admin_011"
on public.brands
for insert
to authenticated
with check (public.is_admin());

drop policy if exists "brands_update_admin_011" on public.brands;
create policy "brands_update_admin_011"
on public.brands
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "contracts_select_admin_or_collaborator_011" on public.contracts;
create policy "contracts_select_admin_or_collaborator_011"
on public.contracts
for select
to authenticated
using (
  public.is_admin()
  or public.is_collaborator()
);

drop policy if exists "contracts_insert_admin_011" on public.contracts;
create policy "contracts_insert_admin_011"
on public.contracts
for insert
to authenticated
with check (public.is_admin());

drop policy if exists "contracts_update_admin_011" on public.contracts;
create policy "contracts_update_admin_011"
on public.contracts
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "contract_brands_select_admin_or_collaborator_011" on public.contract_brands;
create policy "contract_brands_select_admin_or_collaborator_011"
on public.contract_brands
for select
to authenticated
using (
  public.is_admin()
  or public.is_collaborator()
);

drop policy if exists "contract_brands_insert_admin_011" on public.contract_brands;
create policy "contract_brands_insert_admin_011"
on public.contract_brands
for insert
to authenticated
with check (public.is_admin());

drop policy if exists "contract_brands_update_admin_011" on public.contract_brands;
create policy "contract_brands_update_admin_011"
on public.contract_brands
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "brand_members_select_admin_or_collaborator_011" on public.brand_members;
create policy "brand_members_select_admin_or_collaborator_011"
on public.brand_members
for select
to authenticated
using (
  public.is_admin()
  or public.is_collaborator()
);

drop policy if exists "brand_members_insert_admin_011" on public.brand_members;
create policy "brand_members_insert_admin_011"
on public.brand_members
for insert
to authenticated
with check (public.is_admin());

drop policy if exists "brand_members_update_admin_011" on public.brand_members;
create policy "brand_members_update_admin_011"
on public.brand_members
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- Compatibilidade temporaria:
-- demands continua com client_id obrigatorio no modelo atual.
-- brand_id fica opcional ate o frontend ser adaptado e as demandas existentes serem migradas.
-- Regras mais especificas para cliente externo e acesso por marca ficam para etapa posterior.
