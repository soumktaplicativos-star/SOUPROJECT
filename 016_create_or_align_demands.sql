-- 016 - Criar ou alinhar demandas da SOU Ops.
--
-- Status: migration planejada. Nao executar sem revisar o projeto Supabase correto.
-- Projeto esperado do app: cxzssrlfoqkpfufuirsn.
--
-- Objetivo:
-- - Preparar public.demands para migracao incremental do Kanban/localStorage.
-- - Preservar compatibilidade com ownerId legado do frontend via owner_id text.
-- - Permitir brand_id e collaborator_id opcionais sem exigir migracao imediata.
--
-- Importante:
-- - Esta migration nao remove colunas.
-- - Esta migration nao apaga dados.
-- - Esta migration nao renomeia colunas automaticamente.
-- - Esta migration nao converte tipos existentes automaticamente.
-- - Se public.demands ja existir com owner_id uuid de uma migration antiga,
--   revisar manualmente antes de migrar dados do app, pois o frontend atual usa ownerId text.
--
-- Fora desta fase:
-- - Integracao do app com Supabase.
-- - CRUD Supabase de demandas.
-- - Kanban com Supabase.
-- - demand_assignees.
-- - Comentarios, anexos e checklist separado.
-- - Remocao de localStorage/fallback.

create extension if not exists pgcrypto;

create table if not exists public.demands (
  id uuid primary key default gen_random_uuid(),
  legacy_id text,
  client_id uuid references public.clients(id) on delete cascade,
  brand_id uuid references public.brands(id) on delete set null,
  owner_id text,
  collaborator_id uuid references public.collaborators(id) on delete set null,
  title text,
  client_name text,
  description text,
  status text not null default 'Backlog',
  priority text,
  project_priority text,
  flow_type text,
  stage text,
  due_date date,
  delivered_date date,
  calendar_date date,
  start_time time,
  estimated_hours numeric,
  actual_hours numeric,
  checklist jsonb not null default '[]'::jsonb,
  source text not null default 'sou_ops',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.demands
add column if not exists legacy_id text,
add column if not exists client_id uuid references public.clients(id) on delete cascade,
add column if not exists brand_id uuid references public.brands(id) on delete set null,
add column if not exists owner_id text,
add column if not exists collaborator_id uuid references public.collaborators(id) on delete set null,
add column if not exists title text,
add column if not exists client_name text,
add column if not exists description text,
add column if not exists status text not null default 'Backlog',
add column if not exists priority text,
add column if not exists project_priority text,
add column if not exists flow_type text,
add column if not exists stage text,
add column if not exists due_date date,
add column if not exists delivered_date date,
add column if not exists calendar_date date,
add column if not exists start_time time,
add column if not exists estimated_hours numeric,
add column if not exists actual_hours numeric,
add column if not exists checklist jsonb not null default '[]'::jsonb,
add column if not exists source text not null default 'sou_ops',
add column if not exists created_at timestamptz not null default now(),
add column if not exists updated_at timestamptz not null default now();

do $$
declare
  owner_id_type text;
begin
  select data_type
  into owner_id_type
  from information_schema.columns
  where table_schema = 'public'
    and table_name = 'demands'
    and column_name = 'owner_id';

  if owner_id_type is not null and owner_id_type <> 'text' then
    raise notice 'public.demands.owner_id atualmente e %. O frontend atual usa ownerId text; revisar conversao manual antes da migracao de dados.', owner_id_type;
  end if;
end;
$$;

create unique index if not exists demands_legacy_id_unique_idx
on public.demands(legacy_id);

create index if not exists demands_client_id_idx
on public.demands(client_id);

create index if not exists demands_brand_id_idx
on public.demands(brand_id);

create index if not exists demands_owner_id_idx
on public.demands(owner_id);

create index if not exists demands_collaborator_id_idx
on public.demands(collaborator_id);

create index if not exists demands_status_idx
on public.demands(status);

create index if not exists demands_due_date_idx
on public.demands(due_date);

create index if not exists demands_calendar_date_idx
on public.demands(calendar_date);

do $$
begin
  if to_regprocedure('public.set_updated_at()') is not null
    and not exists (
      select 1
      from pg_trigger
      where tgname = 'set_demands_updated_at'
        and tgrelid = 'public.demands'::regclass
    )
  then
    create trigger set_demands_updated_at
    before update on public.demands
    for each row execute function public.set_updated_at();
  end if;
end;
$$;

alter table public.demands enable row level security;

-- Fase 4.1B: acesso administrativo somente.
-- Regras por colaborador, cliente externo, brand_id e demand_assignees ficam para fases futuras.

drop policy if exists "demands_select_admin_016" on public.demands;
create policy "demands_select_admin_016"
on public.demands
for select
to authenticated
using (
  exists (
    select 1
    from public.profiles p
    where p.auth_user_id = auth.uid()
      and p.role = 'admin'
  )
);

drop policy if exists "demands_insert_admin_016" on public.demands;
create policy "demands_insert_admin_016"
on public.demands
for insert
to authenticated
with check (
  exists (
    select 1
    from public.profiles p
    where p.auth_user_id = auth.uid()
      and p.role = 'admin'
  )
);

drop policy if exists "demands_update_admin_016" on public.demands;
create policy "demands_update_admin_016"
on public.demands
for update
to authenticated
using (
  exists (
    select 1
    from public.profiles p
    where p.auth_user_id = auth.uid()
      and p.role = 'admin'
  )
)
with check (
  exists (
    select 1
    from public.profiles p
    where p.auth_user_id = auth.uid()
      and p.role = 'admin'
  )
);

drop policy if exists "demands_delete_admin_016" on public.demands;
create policy "demands_delete_admin_016"
on public.demands
for delete
to authenticated
using (
  exists (
    select 1
    from public.profiles p
    where p.auth_user_id = auth.uid()
      and p.role = 'admin'
  )
);
