# DATABASE_PLAN

Documento de planejamento para migracao futura da plataforma SOU Ops para banco de dados com Supabase.

Este arquivo nao cria banco, tabelas ou integracoes. Ele apenas documenta a arquitetura pretendida.

## Entidades atuais no app.js

Hoje o sistema roda localmente no navegador e salva dados em `localStorage` e `sessionStorage`.

Entidades logicas atuais:

- `people`: colaboradores da agencia.
- `clients`: clientes/projetos da agencia.
- `demands`: demandas/tarefas do Kanban.
- `processes`: processos internos da agencia.
- `roles`: funcoes e responsabilidades por pessoa.
- `calendarSettings`: URL e preferencia de sincronizacao com Google Agenda.
- `accessSettings`: ultimo perfil visual selecionado.
- `sessionSettings`: sessao local do login atual.

## Tabelas futuras no Supabase

### profiles

Usuarios da plataforma.

Campos principais:

- `id`
- `auth_user_id`
- `name`
- `email`
- `role`
- `position`
- `color`
- `status`
- `created_at`
- `updated_at`

Roles esperadas:

- `admin`
- `collaborator`
- `client`

### clients

Clientes/projetos da agencia.

Campos principais:

- `id`
- `name`
- `status`
- `owner_id`
- `finance_status`
- `notes_internal`
- `notes_client`
- `contract_status`
- `created_at`
- `updated_at`

### client_members

Relacionamento entre clientes e colaboradores.

Campos principais:

- `id`
- `client_id`
- `profile_id`
- `member_role`
- `created_at`

### client_contacts

Usuarios externos ligados a um cliente.

Campos principais:

- `id`
- `client_id`
- `profile_id`
- `contact_role`
- `created_at`

### services

Catalogo dos servicos vendidos pela agencia.

Campos principais:

- `id`
- `name`
- `description`
- `default_monthly_quantity`
- `requires_capture`
- `requires_paid_traffic`
- `requires_report`
- `created_at`
- `updated_at`

### client_services

Servicos contratados por cliente.

Campos principais:

- `id`
- `client_id`
- `service_id`
- `quantity`
- `start_month`
- `notes`
- `created_at`
- `updated_at`

### demands

Demandas/tarefas do sistema.

Campos principais:

- `id`
- `client_id`
- `owner_id`
- `title`
- `description`
- `status`
- `priority`
- `project_priority`
- `flow_type`
- `stage`
- `due_date`
- `delivered_date`
- `calendar_date`
- `start_time`
- `estimated_hours`
- `actual_hours`
- `is_client_visible`
- `created_by`
- `created_at`
- `updated_at`

### demand_checklist_items

Checklist de cada demanda.

Campos principais:

- `id`
- `demand_id`
- `text`
- `done`
- `position`
- `created_at`
- `updated_at`

### processes

Processos internos da agencia.

Campos principais:

- `id`
- `title`
- `area`
- `owner_id`
- `cadence`
- `objective`
- `is_internal`
- `created_at`
- `updated_at`

### process_checklist_items

Checklist dos processos internos.

Campos principais:

- `id`
- `process_id`
- `text`
- `position`

### roles

Funcoes e responsabilidades da equipe.

Campos principais:

- `id`
- `profile_id`
- `title`
- `objective`
- `created_at`
- `updated_at`

### role_responsibilities

Responsabilidades por funcao.

Campos principais:

- `id`
- `role_id`
- `text`
- `position`

### comments

Comentarios internos ou visiveis ao cliente.

Campos principais:

- `id`
- `demand_id`
- `author_id`
- `body`
- `visibility`
- `created_at`

Valores de `visibility`:

- `internal`
- `client`

### attachments

Anexos e links de referencia.

Campos principais:

- `id`
- `client_id`
- `demand_id`
- `uploaded_by`
- `name`
- `url`
- `visibility`
- `created_at`

Valores de `visibility`:

- `internal`
- `client`

### calendar_events

Controle de eventos sincronizados com Google Agenda.

Campos principais:

- `id`
- `demand_id`
- `external_event_id`
- `provider`
- `last_synced_at`

### audit_logs

Historico de acoes sensiveis.

Campos principais:

- `id`
- `actor_id`
- `action`
- `entity_type`
- `entity_id`
- `metadata`
- `created_at`

## Relacionamentos principais

- `profiles.auth_user_id` referencia o usuario autenticado pelo Supabase Auth.
- `clients.owner_id` referencia `profiles.id`.
- `client_members.client_id` referencia `clients.id`.
- `client_members.profile_id` referencia `profiles.id`.
- `client_contacts.client_id` referencia `clients.id`.
- `client_contacts.profile_id` referencia `profiles.id`.
- `client_services.client_id` referencia `clients.id`.
- `client_services.service_id` referencia `services.id`.
- `demands.client_id` referencia `clients.id`.
- `demands.owner_id` referencia `profiles.id`.
- `demands.created_by` referencia `profiles.id`.
- `demand_checklist_items.demand_id` referencia `demands.id`.
- `processes.owner_id` referencia `profiles.id`.
- `process_checklist_items.process_id` referencia `processes.id`.
- `roles.profile_id` referencia `profiles.id`.
- `role_responsibilities.role_id` referencia `roles.id`.
- `comments.demand_id` referencia `demands.id`.
- `comments.author_id` referencia `profiles.id`.
- `attachments.client_id` referencia `clients.id`.
- `attachments.demand_id` referencia `demands.id`.
- `attachments.uploaded_by` referencia `profiles.id`.
- `calendar_events.demand_id` referencia `demands.id`.
- `audit_logs.actor_id` referencia `profiles.id`.

## Dados internos da agencia

Devem ser visiveis apenas para admin e, quando adequado, colaboradores autorizados:

- Status financeiro.
- Status juridico/contratual.
- Observacoes internas do cliente.
- Custos, valores, inadimplencia e negociacoes.
- Processos internos.
- Funcoes e responsabilidades internas.
- Comentarios internos.
- Anexos internos.
- Logs de auditoria.
- Configuracao de Google Agenda.
- Relatorios internos de produtividade.
- Tempo previsto e tempo gasto, se a agencia decidir nao expor ao cliente.

## Dados que poderao aparecer para cliente

Devem aparecer apenas quando marcados como visiveis ao cliente:

- Nome do projeto/cliente.
- Demandas do proprio cliente.
- Status geral da demanda.
- Etapa atual.
- Prazo.
- Entrega real.
- Checklist simplificado.
- Arquivos aprovados.
- Comentarios com visibilidade `client`.
- Anexos com visibilidade `client`.
- Calendario de entregas do proprio cliente.
- Observacoes externas em `notes_client`.

## Observacao de seguranca

O modelo futuro deve usar Supabase Auth e Row Level Security.

Permissoes nao devem depender apenas do frontend. As regras de acesso precisam ser aplicadas no banco por policies.
