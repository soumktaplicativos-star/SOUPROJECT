-- 017 - Compatibilidade de ownerId legado em public.demands.
--
-- Status: migration planejada. Nao executar sem revisar o projeto Supabase correto.
-- Projeto esperado do app: cxzssrlfoqkpfufuirsn.
--
-- Contexto:
-- - public.demands pode existir com owner_id uuid de uma estrutura antiga.
-- - O frontend atual usa demand.ownerId como string apontando para state.people.
-- - Nao devemos alterar owner_id uuid nesta etapa para evitar perda de dados.
--
-- Objetivo:
-- - Adicionar legacy_owner_id text para receber o ownerId legado do frontend.
-- - Manter collaborator_id para uma futura migracao segura para public.collaborators.id.
--
-- Fora desta fase:
-- - Alterar owner_id.
-- - Converter dados.
-- - Integrar o app com Supabase.
-- - Criar CRUD/leitura Supabase para demandas.
-- - Migrar Kanban.
-- - Criar demand_assignees.

alter table public.demands
add column if not exists legacy_owner_id text;

create index if not exists demands_legacy_owner_id_idx
on public.demands(legacy_owner_id);
