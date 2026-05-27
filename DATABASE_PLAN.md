# DATABASE_PLAN

Documento de planejamento para migracao futura da plataforma SOU Ops para banco de dados com Supabase.

Este arquivo nao cria banco, tabelas ou integracoes. Ele apenas documenta a arquitetura pretendida.

## Entidades atuais no app.js

Hoje o sistema roda localmente no navegador e salva dados em `localStorage` e `sessionStorage`.

Entidades logicas atuais:

- `people`: colaboradores da agencia.
- `clients`: hoje mistura contratante, marca e projeto operacional; no modelo definitivo passara a representar apenas o contratante/comercial/juridico.
- `demands`: demandas/tarefas do Kanban.
- `processes`: processos internos da agencia.
- `roles`: funcoes e responsabilidades por pessoa.
- `calendarSettings`: URL e preferencia de sincronizacao com Google Agenda.
- `accessSettings`: ultimo perfil visual selecionado.
- `sessionSettings`: sessao local do login atual.

## Arquitetura definitiva aprovada

A plataforma SOU Ops sera primeiro um sistema interno da SOU. O centro operacional sera a combinacao entre `brands` e `demands`.

Hierarquia estrutural:

```text
CLIENT
  ├── CONTRACTS
  └── BRANDS
       └── PROJECTS
            └── DEMANDS
                 └── APPROVALS
```

Decisoes aprovadas:

- `clients` representa o contratante, comercial e juridico.
- `brands` representa a operacao real da marca.
- `contracts` representa o acordo comercial/juridico separado da operacao.
- `demands` deve girar em torno de `brand_id`.
- `projects` sera opcional inicialmente.
- `approvals` sera separado das demandas.
- Cliente externo futuramente acessara por `brand`.
- Permuta/troca de servico sera `contract_type`, nao apenas observacao.

## Diferencas conceituais obrigatorias

### Client vs Brand

`client` e a entidade contratante/comercial/juridica. Pode ser uma empresa, grupo, pessoa responsavel pelo contrato ou pagador.

`brand` e a operacao separada que recebe demandas, calendario, entregas, aprovacoes e relatorios.

Exemplos:

- Um mesmo `client` pode ter as marcas Hora Certa e Moderny.
- Um mesmo `client` pode ter Conceittus e Ativa BPO como marcas operacionais separadas.
- Cada `brand` deve ter demandas, calendario e relatorios proprios, mesmo quando compartilha contrato.

### Contrato vs Operacao

`contract` define acordo, escopo, valores, permuta, datas, status financeiro e status juridico.

`brand` e `demand` definem a execucao diaria do trabalho.

Um contrato pode cobrir uma ou mais marcas, mas a operacao nao deve ficar presa diretamente ao contrato.

### Servico contratado vs Demanda operacional

Servico contratado e o que foi vendido no escopo: social media, trafego pago, captacao, relatorio, landing page, consultoria, etc.

Demanda operacional e uma tarefa executavel: criar roteiro, captar conteudo, editar reels, revisar arte, agendar post, subir campanha, montar relatorio.

Servicos contratados devem orientar a geracao de demandas, mas nao devem substituir o quadro operacional.

## Pipeline operacional recomendado

Pipeline base para demandas:

```text
IDEIA
→ BRIEFING
→ ROTEIRO
→ CAPTACAO
→ EDICAO
→ REVISAO
→ APROVACAO
→ AGENDAMENTO
→ PUBLICADO
→ RELATORIO
```

Observacoes:

- Nem toda demanda precisa passar por todas as etapas.
- A etapa atual da demanda deve ser registrada em `stage`.
- O status operacional da demanda pode continuar separado de etapa, por exemplo: `Backlog`, `Em andamento`, `Aguardando`, `Concluido`.
- Aprovacoes formais devem ficar em `approvals`, nao apenas em texto dentro da demanda.

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

Contratantes comerciais/juridicos da agencia. Nao representam necessariamente a marca operacional.

Campos principais:

- `id`
- `name`
- `document`
- `email`
- `phone`
- `status`
- `notes_internal`
- `created_at`
- `updated_at`

### brands

Marcas operacionais ligadas a um contratante.

Campos principais:

- `id`
- `client_id`
- `name`
- `status`
- `segment`
- `notes_internal`
- `notes_client`
- `created_at`
- `updated_at`

### contracts

Contratos, acordos comerciais e juridicos.

Campos principais:

- `id`
- `client_id`
- `title`
- `contract_type`
- `status`
- `start_date`
- `end_date`
- `billing_day`
- `monthly_value`
- `barter_description`
- `finance_status`
- `legal_status`
- `notes_internal`
- `created_at`
- `updated_at`

Valores esperados para `contract_type`:

- `paid`
- `barter`
- `mixed`
- `courtesy`

### contract_brands

Relacionamento entre contratos e marcas. Permite que um contrato cubra mais de uma marca.

Campos principais:

- `id`
- `contract_id`
- `brand_id`
- `scope_notes`
- `created_at`

### brand_members

Relacionamento entre marcas operacionais e colaboradores.

Campos principais:

- `id`
- `brand_id`
- `profile_id`
- `member_role`
- `created_at`

### brand_contacts

Usuarios externos ligados a uma marca.

Campos principais:

- `id`
- `brand_id`
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

### contract_services

Servicos contratados no acordo comercial.

Campos principais:

- `id`
- `contract_id`
- `service_id`
- `quantity`
- `start_month`
- `end_month`
- `notes`
- `created_at`
- `updated_at`

### projects

Agrupadores opcionais de demandas por campanha, ciclo, onboarding ou acao pontual.

Campos principais:

- `id`
- `brand_id`
- `contract_id`
- `name`
- `type`
- `status`
- `priority`
- `start_date`
- `end_date`
- `created_at`
- `updated_at`

Valores esperados para `type`:

- `onboarding`
- `monthly_cycle`
- `campaign`
- `one_time`

### demands

Demandas/tarefas do sistema. Esta e a entidade central da operacao.

Campos principais:

- `id`
- `brand_id`
- `project_id`
- `contract_id`
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
- `approval_status`
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

### approvals

Aprovacoes formais internas ou externas ligadas a uma demanda.

Campos principais:

- `id`
- `demand_id`
- `requested_by`
- `approved_by`
- `approval_type`
- `status`
- `requested_at`
- `responded_at`
- `notes`
- `created_at`
- `updated_at`

Valores esperados para `approval_type`:

- `internal`
- `client`
- `final`

Valores esperados para `status`:

- `pending`
- `approved`
- `rejected`
- `changes_requested`

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
- `brands.client_id` referencia `clients.id`.
- `contracts.client_id` referencia `clients.id`.
- `contract_brands.contract_id` referencia `contracts.id`.
- `contract_brands.brand_id` referencia `brands.id`.
- `brand_members.brand_id` referencia `brands.id`.
- `brand_members.profile_id` referencia `profiles.id`.
- `brand_contacts.brand_id` referencia `brands.id`.
- `brand_contacts.profile_id` referencia `profiles.id`.
- `contract_services.contract_id` referencia `contracts.id`.
- `contract_services.service_id` referencia `services.id`.
- `projects.brand_id` referencia `brands.id`.
- `projects.contract_id` referencia `contracts.id`.
- `demands.brand_id` referencia `brands.id`.
- `demands.project_id` referencia `projects.id`.
- `demands.contract_id` referencia `contracts.id`.
- `demands.owner_id` referencia `profiles.id`.
- `demands.created_by` referencia `profiles.id`.
- `demand_checklist_items.demand_id` referencia `demands.id`.
- `approvals.demand_id` referencia `demands.id`.
- `approvals.requested_by` referencia `profiles.id`.
- `approvals.approved_by` referencia `profiles.id`.
- `processes.owner_id` referencia `profiles.id`.
- `process_checklist_items.process_id` referencia `processes.id`.
- `roles.profile_id` referencia `profiles.id`.
- `role_responsibilities.role_id` referencia `roles.id`.
- `comments.demand_id` referencia `demands.id`.
- `comments.author_id` referencia `profiles.id`.
- `attachments.brand_id` referencia `brands.id`.
- `attachments.demand_id` referencia `demands.id`.
- `attachments.uploaded_by` referencia `profiles.id`.
- `calendar_events.demand_id` referencia `demands.id`.
- `audit_logs.actor_id` referencia `profiles.id`.

## Permissoes por nivel

### Admin

- Pode ver e gerenciar todos os clientes, marcas, contratos, projetos, demandas e aprovacoes.
- Pode ver financeiro, juridico, permutas e observacoes internas.
- Pode vincular colaboradores a marcas.

### Colaborador

- Deve ver marcas em que participa via `brand_members`.
- Deve ver demandas atribuidas ou demandas de marcas em que participa.
- Nao deve ver contratos, valores, permutas ou status juridico salvo liberacao futura.
- Pode atualizar demandas permitidas.

### Cliente externo

- Futuramente deve acessar por `brand`, nao por `client`.
- Pode ver apenas marcas vinculadas ao seu perfil.
- Pode ver apenas demandas, comentarios, anexos e aprovacoes marcados como visiveis ao cliente.
- Nao deve ver contrato completo, financeiro interno, juridico interno ou outras marcas do mesmo contratante sem permissao explicita.

## Riscos da estrutura antiga baseada apenas em clients

- Mistura contratante, marca, contrato e operacao em uma mesma entidade.
- Impede separar Hora Certa e Moderny quando estiverem no mesmo contrato.
- Impede separar Conceittus e Ativa BPO quando compartilharem contratante ou contrato.
- Mistura calendario e relatorios de marcas diferentes.
- Dificulta permissoes do cliente externo, porque o acesso por `client` pode expor mais marcas do que deveria.
- Faz contratos de permuta virarem observacoes soltas, sem controle operacional e financeiro.
- Obriga duplicar contratantes para simular marcas diferentes.
- Torna a migracao de demandas mais arriscada quando o banco ja estiver populado.

## Dados internos da agencia

Devem ser visiveis apenas para admin e, quando adequado, colaboradores autorizados:

- Status financeiro.
- Status juridico/contratual.
- Observacoes internas do contratante, contrato e marca.
- Custos, valores, inadimplencia e negociacoes.
- Permutas e condicoes comerciais.
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
- Nome da marca liberada.
- Demandas da propria marca.
- Status geral da demanda.
- Etapa atual.
- Prazo.
- Entrega real.
- Checklist simplificado.
- Arquivos aprovados.
- Comentarios com visibilidade `client`.
- Anexos com visibilidade `client`.
- Calendario de entregas da propria marca.
- Observacoes externas em `brands.notes_client`.

## Observacao de seguranca

O modelo futuro deve usar Supabase Auth e Row Level Security.

Permissoes nao devem depender apenas do frontend. As regras de acesso precisam ser aplicadas no banco por policies.
