-- 012 - Fase 1.2: estrutura real validada de public.brands.
--
-- Status: migration/documentacao planejada. Nao executar sem revisar o projeto Supabase correto.
-- Projeto validado no app: https://cxzssrlfoqkpfufuirsn.supabase.co
--
-- Objetivo:
-- - Registrar a estrutura real de public.brands validada manualmente na Fase 1.2.
-- - Manter compatibilidade com public.clients e profiles/admin ja existentes.
-- - Documentar indices, trigger de updated_at e policies RLS para admin.
--
-- Nao faz:
-- - Nao cria contratos.
-- - Nao altera demands.
-- - Nao remove colunas antigas planejadas em migrations anteriores.
-- - Nao insere dados reais.

create table if not exists public.brands (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.clients(id) on delete cascade,
  name text not null,
  slug text,
  status text default 'active',
  description text,
  instagram text,
  website text,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.brands
add column if not exists client_id uuid references public.clients(id) on delete cascade,
add column if not exists name text,
add column if not exists slug text,
add column if not exists status text default 'active',
add column if not exists description text,
add column if not exists instagram text,
add column if not exists website text,
add column if not exists notes text,
add column if not exists created_at timestamptz default now(),
add column if not exists updated_at timestamptz default now();

alter table public.brands
alter column name set not null;

create index if not exists brands_client_id_idx on public.brands(client_id);
create index if not exists brands_slug_idx on public.brands(slug);
create index if not exists brands_status_idx on public.brands(status);
create index if not exists brands_name_idx on public.brands(name);

do $$
begin
  if to_regprocedure('public.set_updated_at()') is not null
    and not exists (
      select 1
      from pg_trigger
      where tgname = 'set_brands_updated_at'
        and tgrelid = 'public.brands'::regclass
    )
  then
    create trigger set_brands_updated_at
    before update on public.brands
    for each row execute function public.set_updated_at();
  end if;
end;
$$;

alter table public.brands enable row level security;

-- Fase 1.2: acesso administrativo validado.
-- Policies mais granulares por brand_members/cliente externo ficam para etapas futuras.

drop policy if exists "brands_select_admin_or_collaborator_011" on public.brands;
drop policy if exists "brands_insert_admin_011" on public.brands;
drop policy if exists "brands_update_admin_011" on public.brands;

drop policy if exists "brands_select_admin_012" on public.brands;
create policy "brands_select_admin_012"
on public.brands
for select
to authenticated
using (public.is_admin());

drop policy if exists "brands_insert_admin_012" on public.brands;
create policy "brands_insert_admin_012"
on public.brands
for insert
to authenticated
with check (public.is_admin());

drop policy if exists "brands_update_admin_012" on public.brands;
create policy "brands_update_admin_012"
on public.brands
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "brands_delete_admin_012" on public.brands;
create policy "brands_delete_admin_012"
on public.brands
for delete
to authenticated
using (public.is_admin());
