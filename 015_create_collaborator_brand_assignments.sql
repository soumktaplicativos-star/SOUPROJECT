-- 015 - Vinculo colaborador > marca da SOU Ops.
--
-- Status: migration planejada. Nao executar sem revisar o projeto Supabase correto.
-- Projeto esperado do app: cxzssrlfoqkpfufuirsn.
--
-- Depende de:
-- - public.collaborators
-- - public.brands
-- - public.profiles
-- - public.set_updated_at() (opcional, usado apenas se existir)
--
-- Objetivo:
-- - Permitir que um colaborador Supabase seja atribuido a uma marca operacional.
-- - Preparar a base para permissao por marca em fases futuras.
--
-- Fora desta fase:
-- - Portal do Colaborador.
-- - demand_assignees.
-- - Migracao de demands.ownerId.
-- - Permissoes avancadas por marca.
-- - Financeiro, juridico, onboarding, feedbacks e produtividade.

create extension if not exists pgcrypto;

create table if not exists public.collaborator_brand_assignments (
  id uuid primary key default gen_random_uuid(),
  collaborator_id uuid not null references public.collaborators(id) on delete cascade,
  brand_id uuid not null references public.brands(id) on delete cascade,
  role_on_brand text,
  is_primary boolean not null default false,
  status text not null default 'active' check (status in ('active', 'paused', 'ended')),
  start_date date,
  end_date date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (collaborator_id, brand_id)
);

create index if not exists collaborator_brand_assignments_collaborator_id_idx
on public.collaborator_brand_assignments(collaborator_id);

create index if not exists collaborator_brand_assignments_brand_id_idx
on public.collaborator_brand_assignments(brand_id);

create index if not exists collaborator_brand_assignments_status_idx
on public.collaborator_brand_assignments(status);

create index if not exists collaborator_brand_assignments_is_primary_idx
on public.collaborator_brand_assignments(is_primary);

do $$
begin
  if to_regprocedure('public.set_updated_at()') is not null
    and not exists (
      select 1
      from pg_trigger
      where tgname = 'set_collaborator_brand_assignments_updated_at'
        and tgrelid = 'public.collaborator_brand_assignments'::regclass
    )
  then
    create trigger set_collaborator_brand_assignments_updated_at
    before update on public.collaborator_brand_assignments
    for each row execute function public.set_updated_at();
  end if;
end;
$$;

alter table public.collaborator_brand_assignments enable row level security;

-- Fase 3.2: acesso administrativo somente.
-- Regras por gestor, colaborador, cliente externo e marca atribuida ficam para fases futuras.

drop policy if exists "collaborator_brand_assignments_select_admin_015" on public.collaborator_brand_assignments;
create policy "collaborator_brand_assignments_select_admin_015"
on public.collaborator_brand_assignments
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

drop policy if exists "collaborator_brand_assignments_insert_admin_015" on public.collaborator_brand_assignments;
create policy "collaborator_brand_assignments_insert_admin_015"
on public.collaborator_brand_assignments
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

drop policy if exists "collaborator_brand_assignments_update_admin_015" on public.collaborator_brand_assignments;
create policy "collaborator_brand_assignments_update_admin_015"
on public.collaborator_brand_assignments
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

drop policy if exists "collaborator_brand_assignments_delete_admin_015" on public.collaborator_brand_assignments;
create policy "collaborator_brand_assignments_delete_admin_015"
on public.collaborator_brand_assignments
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
