-- Etapa planejada: separacao entre demands, publications e calendar_events.
-- Este arquivo e apenas planejamento e nao deve ser executado sem revisao.
-- Objetivo: separar tarefa operacional (demands) de conteudo final publicado, entregue ou medido (publications).
-- Analytics e reports devem vir depois, usando publications como base de performance.
-- Nao apaga tabelas, nao altera dados existentes e nao integra o frontend.

create extension if not exists pgcrypto;

create table if not exists public.publications (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid not null references public.brands(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  contract_id uuid references public.contracts(id) on delete set null,
  title text not null,
  description text,
  publication_type text not null check (
    publication_type in (
      'reels',
      'post',
      'carousel',
      'story',
      'ad_creative',
      'video',
      'article',
      'email',
      'landing_page',
      'campaign_asset'
    )
  ),
  channel text check (
    channel in (
      'instagram',
      'facebook',
      'tiktok',
      'linkedin',
      'youtube',
      'google_ads',
      'meta_ads',
      'site',
      'email',
      'whatsapp',
      'offline'
    )
  ),
  format text,
  status text not null default 'idea' check (
    status in (
      'idea',
      'in_production',
      'in_review',
      'waiting_approval',
      'approved',
      'scheduled',
      'published',
      'cancelled',
      'archived'
    )
  ),
  content_date date,
  scheduled_at timestamptz,
  published_at timestamptz,
  owner_id uuid references public.profiles(id) on delete set null,
  created_by uuid references public.profiles(id) on delete set null,
  approval_status text not null default 'not_requested' check (
    approval_status in ('not_requested', 'pending', 'approved', 'rejected', 'changes_requested')
  ),
  is_client_visible boolean not null default false,
  caption text,
  creative_url text,
  asset_url text,
  external_url text,
  platform_post_id text,
  notes_internal text,
  notes_client text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.calendar_events (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid references public.brands(id) on delete cascade,
  demand_id uuid references public.demands(id) on delete cascade,
  publication_id uuid references public.publications(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  event_type text not null check (
    event_type in (
      'task_deadline',
      'recording',
      'meeting',
      'approval_deadline',
      'publication_schedule',
      'report_delivery',
      'campaign_start',
      'campaign_end'
    )
  ),
  title text not null,
  description text,
  start_at timestamptz not null,
  end_at timestamptz,
  timezone text default 'America/Sao_Paulo',
  status text not null default 'planned' check (
    status in ('planned', 'synced', 'rescheduled', 'cancelled', 'done', 'sync_error')
  ),
  provider text,
  external_event_id text,
  sync_status text,
  last_synced_at timestamptz,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.demands
add column if not exists publication_id uuid references public.publications(id) on delete set null;

alter table if exists public.approvals
add column if not exists publication_id uuid references public.publications(id) on delete cascade;

alter table if exists public.approvals
add column if not exists approval_target text default 'demand';

do $$
begin
  if to_regclass('public.approvals') is not null
    and not exists (
      select 1
      from pg_constraint
      where conname = 'approvals_approval_target_check'
        and conrelid = 'public.approvals'::regclass
    )
  then
    alter table public.approvals
    add constraint approvals_approval_target_check
    check (approval_target in ('demand', 'publication'));
  end if;
end;
$$;

create index if not exists publications_brand_id_idx on public.publications(brand_id);
create index if not exists publications_project_id_idx on public.publications(project_id);
create index if not exists publications_contract_id_idx on public.publications(contract_id);
create index if not exists publications_status_idx on public.publications(status);
create index if not exists publications_scheduled_at_idx on public.publications(scheduled_at);
create index if not exists publications_published_at_idx on public.publications(published_at);
create index if not exists publications_owner_id_idx on public.publications(owner_id);
create index if not exists calendar_events_brand_id_idx on public.calendar_events(brand_id);
create index if not exists calendar_events_demand_id_idx on public.calendar_events(demand_id);
create index if not exists calendar_events_publication_id_idx on public.calendar_events(publication_id);
create index if not exists calendar_events_project_id_idx on public.calendar_events(project_id);
create index if not exists calendar_events_start_at_idx on public.calendar_events(start_at);
create index if not exists calendar_events_event_type_idx on public.calendar_events(event_type);
create index if not exists demands_publication_id_idx on public.demands(publication_id);

do $$
begin
  if to_regclass('public.approvals') is not null then
    create index if not exists approvals_publication_id_idx
    on public.approvals(publication_id);
  end if;
end;
$$;

do $$
begin
  if not exists (select 1 from pg_trigger where tgname = 'set_publications_updated_at') then
    create trigger set_publications_updated_at
    before update on public.publications
    for each row execute function public.set_updated_at();
  end if;

  if not exists (select 1 from pg_trigger where tgname = 'set_calendar_events_updated_at') then
    create trigger set_calendar_events_updated_at
    before update on public.calendar_events
    for each row execute function public.set_updated_at();
  end if;
end;
$$;

alter table public.publications enable row level security;
alter table public.calendar_events enable row level security;

-- Policies de RLS ficam propositalmente para uma etapa futura.
-- Antes de executar, revisar:
-- 1. Como publications sera exposta para colaboradores e clientes por brand.
-- 2. Como approvals deve aprovar demands ou publications sem duplicar historico.
-- 3. Se calendar_events aceitara eventos sem demand_id e sem publication_id.
-- 4. Como analytics e reports serao conectados a publications.
-- 5. Como publicacoes em sequencia, como stories, serao agrupadas.
