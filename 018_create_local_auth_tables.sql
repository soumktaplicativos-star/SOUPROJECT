-- 018 - Auth local da SOU Ops.
--
-- Status: migration planejada. Nao executar sem revisar o banco local correto.
--
-- Objetivo:
-- - Preparar a base minima para substituir Supabase Auth por autenticacao local via backend proprio.
-- - Manter public.profiles como base de perfil, role e interface.
-- - Criar public.app_users como base futura de login local.
-- - Criar public.app_sessions para sessoes locais com cookie httpOnly.
--
-- Importante:
-- - auth.users sera mantido temporariamente apenas para compatibilidade durante a transicao.
-- - Nao armazenar senha em texto puro. Armazenar apenas password_hash seguro.
-- - Esta migration nao cria usuarios, nao gera senhas e nao altera public.profiles.
--
-- Fora desta fase:
-- - Endpoints de Auth.
-- - Seed de usuarios locais.
-- - Migracao do frontend.
-- - Alteracao de public.profiles.auth_user_id.
-- - Remocao de Supabase Auth.

create extension if not exists pgcrypto;

create table if not exists public.app_users (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null unique references public.profiles(id) on delete cascade,
  email text not null,
  password_hash text not null,
  status text not null default 'active' check (status in ('active', 'inactive', 'blocked')),
  last_login_at timestamptz,
  password_changed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.app_users is
  'Base futura de autenticacao local da SOU Ops. Credenciais ficam aqui; public.profiles continua sendo perfil, role e interface.';

comment on column public.app_users.password_hash is
  'Hash seguro da senha. Nunca armazenar senha em texto puro.';

create unique index if not exists app_users_email_lower_unique_idx
on public.app_users (lower(email));

create table if not exists public.app_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.app_users(id) on delete cascade,
  session_token_hash text not null unique,
  expires_at timestamptz not null,
  created_at timestamptz not null default now(),
  revoked_at timestamptz,
  user_agent text,
  ip_address inet
);

comment on table public.app_sessions is
  'Sessoes locais da SOU Ops. O token bruto deve ficar apenas em cookie httpOnly; o banco armazena somente hash.';

comment on column public.app_sessions.session_token_hash is
  'Hash do token de sessao. Nunca armazenar token bruto no banco.';

create index if not exists app_sessions_user_id_idx
on public.app_sessions(user_id);

create index if not exists app_sessions_expires_at_idx
on public.app_sessions(expires_at);

do $$
begin
  if to_regprocedure('public.set_updated_at()') is not null
    and not exists (
      select 1
      from pg_trigger
      where tgname = 'set_app_users_updated_at'
        and tgrelid = 'public.app_users'::regclass
    )
  then
    create trigger set_app_users_updated_at
    before update on public.app_users
    for each row execute function public.set_updated_at();
  end if;
end;
$$;

alter table public.app_users enable row level security;
alter table public.app_sessions enable row level security;

-- Pivot 2D: policies temporarias admin-only.
-- O frontend ainda usa Supabase Auth durante a transicao, por isso estas policies
-- continuam verificando public.profiles.auth_user_id = auth.uid().
-- Permissoes finais da API propria ficam para fases futuras.

drop policy if exists "app_users_select_admin_018" on public.app_users;
create policy "app_users_select_admin_018"
on public.app_users
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

drop policy if exists "app_users_insert_admin_018" on public.app_users;
create policy "app_users_insert_admin_018"
on public.app_users
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

drop policy if exists "app_users_update_admin_018" on public.app_users;
create policy "app_users_update_admin_018"
on public.app_users
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

drop policy if exists "app_users_delete_admin_018" on public.app_users;
create policy "app_users_delete_admin_018"
on public.app_users
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

drop policy if exists "app_sessions_select_admin_018" on public.app_sessions;
create policy "app_sessions_select_admin_018"
on public.app_sessions
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

drop policy if exists "app_sessions_insert_admin_018" on public.app_sessions;
create policy "app_sessions_insert_admin_018"
on public.app_sessions
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

drop policy if exists "app_sessions_update_admin_018" on public.app_sessions;
create policy "app_sessions_update_admin_018"
on public.app_sessions
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

drop policy if exists "app_sessions_delete_admin_018" on public.app_sessions;
create policy "app_sessions_delete_admin_018"
on public.app_sessions
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
