-- 014 - Cadastro basico de colaboradores da SOU Ops.
--
-- Status: migration planejada. Nao executar sem revisar o projeto Supabase correto.
-- Depende de:
-- - public.profiles
-- - public.set_updated_at() (opcional, usado apenas se existir)
--
-- Objetivo:
-- - Criar a base minima de colaboradores internos.
-- - Separar pessoa que trabalha na SOU de usuario autenticado no sistema.
-- - Permitir colaborador com ou sem login.
--
-- Fora desta fase:
-- - Portal do Colaborador.
-- - Vinculo colaborador > marca.
-- - demand_assignees.
-- - Financeiro, juridico, onboarding, feedbacks e produtividade.
-- - Migracao de demandas/ownerId.

create extension if not exists pgcrypto;

create table if not exists public.collaborators (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete set null,
  name text not null,
  display_name text,
  email text,
  phone text,
  whatsapp text,
  city text,
  document text,
  role text,
  secondary_role text,
  seniority text,
  department text,
  specialties text[] default '{}'::text[],
  relationship_type text check (
    relationship_type is null
    or relationship_type in ('pj', 'clt', 'freelancer', 'intern', 'temporary', 'partner')
  ),
  status text not null default 'active' check (status in ('active', 'onboarding', 'paused', 'offboarded', 'blocked')),
  start_date date,
  end_date date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists collaborators_profile_id_idx on public.collaborators(profile_id);
create index if not exists collaborators_status_idx on public.collaborators(status);
create index if not exists collaborators_relationship_type_idx on public.collaborators(relationship_type);
create index if not exists collaborators_role_idx on public.collaborators(role);
create index if not exists collaborators_email_idx on public.collaborators(email);

do $$
begin
  if to_regprocedure('public.set_updated_at()') is not null
    and not exists (
      select 1
      from pg_trigger
      where tgname = 'set_collaborators_updated_at'
        and tgrelid = 'public.collaborators'::regclass
    )
  then
    create trigger set_collaborators_updated_at
    before update on public.collaborators
    for each row execute function public.set_updated_at();
  end if;
end;
$$;

alter table public.collaborators enable row level security;

-- Fase 3.1: acesso administrativo somente.
-- Colaborador comum ainda nao acessa collaborators diretamente.
-- Regras por gestor, portal e marcas atribuidas ficam para fases futuras.

drop policy if exists "collaborators_select_admin_014" on public.collaborators;
create policy "collaborators_select_admin_014"
on public.collaborators
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

drop policy if exists "collaborators_insert_admin_014" on public.collaborators;
create policy "collaborators_insert_admin_014"
on public.collaborators
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

drop policy if exists "collaborators_update_admin_014" on public.collaborators;
create policy "collaborators_update_admin_014"
on public.collaborators
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

drop policy if exists "collaborators_delete_admin_014" on public.collaborators;
create policy "collaborators_delete_admin_014"
on public.collaborators
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
