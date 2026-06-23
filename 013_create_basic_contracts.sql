-- 013 - Contratos basicos da SOU Ops.
--
-- Status: migration planejada. Nao executar sem revisar o projeto Supabase correto.
-- Depende de:
-- - public.clients
-- - public.brands
-- - public.profiles
-- - public.set_updated_at()
--
-- Objetivo:
-- - Criar a base minima de contratos.
-- - Vincular contrato ao cliente contratante.
-- - Permitir vincular um contrato a uma ou mais marcas operacionais.
--
-- Fora desta fase:
-- - Assinatura digital.
-- - PDF/geracao de contrato.
-- - Financeiro complexo.
-- - Demandas, publicacoes, aprovacoes e calendario.

create extension if not exists pgcrypto;

create table if not exists public.contracts (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  name text not null,
  status text not null default 'draft' check (status in ('draft', 'active', 'paused', 'ended', 'cancelled')),
  start_date date,
  end_date date,
  monthly_value numeric(12, 2),
  payment_terms text,
  services jsonb default '[]'::jsonb,
  scope text,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.contracts
add column if not exists client_id uuid references public.clients(id) on delete cascade,
add column if not exists name text,
add column if not exists status text default 'draft',
add column if not exists start_date date,
add column if not exists end_date date,
add column if not exists monthly_value numeric(12, 2),
add column if not exists payment_terms text,
add column if not exists services jsonb default '[]'::jsonb,
add column if not exists scope text,
add column if not exists notes text,
add column if not exists created_at timestamptz default now(),
add column if not exists updated_at timestamptz default now();

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'contracts'
      and column_name = 'title'
  ) then
    execute 'update public.contracts set name = coalesce(name, title, ''Contrato sem nome'') where name is null';
  else
    update public.contracts set name = coalesce(name, 'Contrato sem nome') where name is null;
  end if;
end;
$$;

alter table public.contracts
alter column client_id set not null,
alter column name set not null,
alter column status set not null;

create table if not exists public.contract_brands (
  id uuid primary key default gen_random_uuid(),
  contract_id uuid not null references public.contracts(id) on delete cascade,
  brand_id uuid not null references public.brands(id) on delete cascade,
  created_at timestamptz default now(),
  unique (contract_id, brand_id)
);

create index if not exists contracts_client_id_idx on public.contracts(client_id);
create index if not exists contracts_status_idx on public.contracts(status);
create index if not exists contracts_start_date_idx on public.contracts(start_date);
create index if not exists contracts_end_date_idx on public.contracts(end_date);
create index if not exists contract_brands_contract_id_idx on public.contract_brands(contract_id);
create index if not exists contract_brands_brand_id_idx on public.contract_brands(brand_id);

do $$
begin
  if to_regprocedure('public.set_updated_at()') is not null
    and not exists (
      select 1
      from pg_trigger
      where tgname = 'set_contracts_updated_at'
        and tgrelid = 'public.contracts'::regclass
    )
  then
    create trigger set_contracts_updated_at
    before update on public.contracts
    for each row execute function public.set_updated_at();
  end if;
end;
$$;

alter table public.contracts enable row level security;
alter table public.contract_brands enable row level security;

-- Fase Contratos Basicos: acesso administrativo somente.
-- Policies por colaborador, cliente externo e brand_members ficam para etapa futura.

drop policy if exists "contracts_select_admin_013" on public.contracts;
create policy "contracts_select_admin_013"
on public.contracts
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

drop policy if exists "contracts_insert_admin_013" on public.contracts;
create policy "contracts_insert_admin_013"
on public.contracts
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

drop policy if exists "contracts_update_admin_013" on public.contracts;
create policy "contracts_update_admin_013"
on public.contracts
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

drop policy if exists "contracts_delete_admin_013" on public.contracts;
create policy "contracts_delete_admin_013"
on public.contracts
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

drop policy if exists "contract_brands_select_admin_013" on public.contract_brands;
create policy "contract_brands_select_admin_013"
on public.contract_brands
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

drop policy if exists "contract_brands_insert_admin_013" on public.contract_brands;
create policy "contract_brands_insert_admin_013"
on public.contract_brands
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

drop policy if exists "contract_brands_delete_admin_013" on public.contract_brands;
create policy "contract_brands_delete_admin_013"
on public.contract_brands
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
