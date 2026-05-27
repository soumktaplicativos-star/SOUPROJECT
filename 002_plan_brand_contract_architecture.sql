-- Etapa planejada: arquitetura clients/contracts/brands/projects/demands/approvals.
-- Este arquivo nao deve ser executado sem revisao e aprovacao.
-- Nao apaga tabelas, nao altera dados existentes e nao remove compatibilidade com o modelo atual.

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

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid not null references public.brands(id) on delete cascade,
  contract_id uuid references public.contracts(id) on delete set null,
  owner_id uuid references public.profiles(id) on delete set null,
  name text not null,
  type text not null default 'monthly_cycle' check (type in ('onboarding', 'monthly_cycle', 'campaign', 'one_time')),
  status text not null default 'active' check (status in ('draft', 'active', 'paused', 'completed', 'cancelled')),
  priority text not null default 'Media',
  start_date date,
  end_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.approvals (
  id uuid primary key default gen_random_uuid(),
  demand_id uuid not null references public.demands(id) on delete cascade,
  requested_by uuid references public.profiles(id) on delete set null,
  approved_by uuid references public.profiles(id) on delete set null,
  approval_type text not null default 'internal' check (approval_type in ('internal', 'client', 'final')),
  approval_target_type text,
  approval_target_id uuid,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected', 'changes_requested')),
  requested_at timestamptz not null default now(),
  responded_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

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
create index if not exists projects_brand_id_idx on public.projects(brand_id);
create index if not exists projects_contract_id_idx on public.projects(contract_id);
create index if not exists projects_owner_id_idx on public.projects(owner_id);
create index if not exists projects_status_idx on public.projects(status);
create index if not exists approvals_demand_id_idx on public.approvals(demand_id);
create index if not exists approvals_target_idx on public.approvals(approval_target_type, approval_target_id);
create index if not exists approvals_status_idx on public.approvals(status);
create index if not exists approvals_requested_by_idx on public.approvals(requested_by);
create index if not exists approvals_approved_by_idx on public.approvals(approved_by);

do $$
begin
  if not exists (select 1 from pg_trigger where tgname = 'set_brands_updated_at') then
    create trigger set_brands_updated_at
    before update on public.brands
    for each row execute function public.set_updated_at();
  end if;

  if not exists (select 1 from pg_trigger where tgname = 'set_contracts_updated_at') then
    create trigger set_contracts_updated_at
    before update on public.contracts
    for each row execute function public.set_updated_at();
  end if;

  if not exists (select 1 from pg_trigger where tgname = 'set_contract_brands_updated_at') then
    create trigger set_contract_brands_updated_at
    before update on public.contract_brands
    for each row execute function public.set_updated_at();
  end if;

  if not exists (select 1 from pg_trigger where tgname = 'set_brand_members_updated_at') then
    create trigger set_brand_members_updated_at
    before update on public.brand_members
    for each row execute function public.set_updated_at();
  end if;

  if not exists (select 1 from pg_trigger where tgname = 'set_projects_updated_at') then
    create trigger set_projects_updated_at
    before update on public.projects
    for each row execute function public.set_updated_at();
  end if;

  if not exists (select 1 from pg_trigger where tgname = 'set_approvals_updated_at') then
    create trigger set_approvals_updated_at
    before update on public.approvals
    for each row execute function public.set_updated_at();
  end if;
end;
$$;

alter table public.brands enable row level security;
alter table public.contracts enable row level security;
alter table public.contract_brands enable row level security;
alter table public.brand_members enable row level security;
alter table public.projects enable row level security;
alter table public.approvals enable row level security;

-- Policies de RLS ficam propositalmente para uma etapa futura.
-- Antes de executar em producao, revisar:
-- 1. Como migrar demands.client_id para demands.brand_id sem quebrar demandas existentes.
-- 2. Se projects sera obrigatorio ou opcional nas demandas.
-- 3. Quais campos de contracts podem ser vistos por colaboradores.
-- 4. Como clientes externos serao vinculados a brands.
-- 5. Se approvals precisa registrar anexos, versoes ou links de entrega.
