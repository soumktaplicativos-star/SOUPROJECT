# 009 Plan SOU Ops Implementation Roadmap

Este documento transforma a arquitetura da SOU Ops em uma ordem pratica de desenvolvimento.

Nao cria codigo, frontend, migration, SQL ou alteracao no Supabase.

## 1. Ordem Correta De Implementacao

### 1. Auth e perfis

Base inicial:

- Supabase Auth.
- `profiles`.
- Roles basicas: admin, collaborator, client.
- Sessao persistente.
- Vinculo entre usuario autenticado e perfil operacional.

Por que vem primeiro:

- Todas as permissoes dependem de saber quem esta usando.
- RLS depende de `profiles`.
- A experiencia de direcao, colaborador e cliente externo depende de role.

### 2. Estrutura clients/brands/contracts

Base estrutural:

- `clients` como contratante.
- `brands` como operacao.
- `contracts` como comercial/juridico.
- `contract_brands` para vincular contrato e marcas.
- `brand_members` para equipe por marca.

Por que vem antes de demandas:

- Demandas devem girar em torno de `brand_id`.
- Permissoes futuras devem ser por marca.
- Calendario, publicacoes e aprovacoes dependem do contexto de marca.

### 3. Demandas

Base operacional:

- Criar demandas.
- Editar demandas.
- Mover status.
- Mover stage.
- Definir responsavel.
- Definir prioridade.
- Definir prazo.
- Checklist.

Por que vem depois de marcas:

- Demandas sem marca recriam o problema antigo baseado apenas em cliente.
- O nucleo operacional depende de `brand_id`.

### 4. Pipeline operacional

Base de processo:

- Etapas oficiais.
- Status oficiais.
- Regras de transicao.
- Bloqueios basicos.
- Historico de mudanca.

Por que vem depois de demandas:

- Pipeline so faz sentido com demandas reais.
- Evita criar fluxo teorico sem uso operacional.

### 5. Aprovações

Base de decisao:

- Aprovar demanda.
- Aprovar publication.
- Solicitar ajustes.
- Reprovar.
- Historico.
- Comentarios simples.

Por que vem depois de pipeline:

- Aprovacao depende de saber em qual etapa o item esta.
- Publicacao e demanda precisam existir antes da aprovacao.

### 6. Calendario

Base temporal:

- Prazos.
- Gravacoes.
- Reunioes.
- Prazo de aprovacao.
- Agendamento de publicacao.
- Inicio/fim de campanha.

Por que vem depois de demandas/aprovacoes:

- Calendario referencia demandas, publicacoes, marcas e projetos.
- Sem entidades operacionais, calendario vira agenda solta.

### 7. Relatorios

Base futura:

- Relatorios por marca.
- Relatorios por periodo.
- Relatorios por projeto/campanha.
- Cruzamento com demandas, publications, approvals e calendario.

Por que vem depois:

- Relatorio precisa de dados operacionais consistentes.
- Antes disso, vira preenchimento manual.

### 8. Analytics

Base de performance:

- Metricas de publication.
- Metricas de campanha.
- Performance por marca.
- Produtividade por colaborador.

Por que vem depois de reports/publications:

- Analytics sem publication estruturada gera dado solto.

### 9. Portal do cliente

Base externa:

- Acesso por marca.
- Demands/publications visiveis ao cliente.
- Aprovacoes externas.
- Calendario/entregas liberadas.

Por que vem depois:

- A operacao interna precisa estar madura antes de expor ao cliente.
- RLS precisa estar validada.

### 10. Automacoes

Base avancada:

- Lembretes.
- Criacao automatica de ciclos.
- Integracoes externas.
- Automacoes de aprovacao/calendario.

Por que vem por ultimo:

- Automacao sobre processo imaturo automatiza bagunca.

## 2. Separacao Por Fases

### MVP real

Essencial:

- Auth funcional.
- Profiles.
- Clients simples.
- Brands.
- Brand members.
- Demands com brand_id.
- Kanban/lista de demandas.
- Status e stage padronizados.

Importante:

- Checklist.
- Responsavel.
- Prazo.
- Prioridade.
- Busca/filtros basicos.

Futuro:

- Portal cliente.
- Analytics.
- Automacoes.

### Versao operacional interna

Essencial:

- Publications.
- Approvals.
- Calendar events.
- Drawers/modais operacionais.
- Historico basico.
- Dashboard operacional simples.

Importante:

- Projetos/campanhas opcionais.
- Contratos simples.
- Aprovacao de demand e publication.
- Eventos por marca/responsavel.

Futuro:

- Relatorios avancados.
- Integracoes automaticas.

### Versao para clientes externos

Essencial:

- Login cliente.
- Acesso por brand.
- RLS validada.
- Publications visiveis.
- Approvals externas.

Importante:

- Comentarios do cliente.
- Historico de aprovacoes.
- Arquivos liberados.

Futuro:

- Area de relatorios do cliente.
- Notificacoes externas.

### Versao escalavel SaaS

Essencial:

- Multi-tenant real.
- Billing.
- Permissoes avancadas.
- Auditoria robusta.
- Onboarding self-service.

Importante:

- Templates configuraveis.
- Automacoes configuraveis.
- Dashboards por conta.

Futuro:

- Marketplace de integracoes.
- IA.
- Apps externos.

## 3. O Que Nao Desenvolver Agora

Nao desenvolver agora:

- IA interna.
- Automacoes avancadas.
- Integracoes complexas.
- Multiplos calendarios externos.
- Chat interno completo.
- Sistema financeiro complexo.
- Dashboard executivo avancado.
- Portal do cliente.
- Analytics completos.
- Relatorios sofisticados.
- Controle de contratos juridicos completo.
- Permissoes granulares demais.
- Mobile app.
- Sistema de notificacoes complexo.

Esses itens podem parecer interessantes, mas geram complexidade prematura.

## 4. Riscos Tecnicos

### Gargalos

- Carregar tudo em uma unica tela.
- Kanban com muitas demandas sem paginacao/filtro.
- Consultas sem indice por brand, status, owner e prazo.
- Historico pesado no mesmo payload da demanda.

### Riscos de performance

- Buscar demands, publications, approvals e calendar_events sem filtros.
- Re-renderizar kanban inteiro a cada pequena alteracao.
- Misturar anexos pesados com dados operacionais.

### Risco de bagunca estrutural

- Continuar usando `client_id` como centro operacional.
- Criar publication sem brand.
- Criar calendar_event sem brand.
- Usar project como obrigatorio cedo demais.

### Risco de duplicidade

- Demand virar publication.
- Calendar event virar demand.
- Approval virar comentario solto.
- Contract virar tela operacional.

### Risco de permissao incorreta

- Cliente externo acessar por client em vez de brand.
- Colaborador ver marcas fora do time.
- Frontend esconder botao, mas banco permitir acao.
- Policies de RLS permissivas demais.

### Risco de acoplamento errado

- Regra de negocio dentro de componente visual.
- Mapeamento Supabase espalhado pelo frontend.
- Status hardcoded em varias partes.
- Formulario sabendo demais sobre banco.

## 5. Regras Tecnicas Obrigatorias

- Nao duplicar logica.
- Evitar `localStorage` como fonte principal.
- Supabase deve ser a fonte oficial quando a integracao estiver validada.
- Logs/historico obrigatorios para acoes sensiveis.
- Componentes reutilizaveis.
- Status padronizados.
- Stage padronizados.
- IDs padronizados com UUID no banco.
- Separacao clara entre visual e regra de negocio.
- RLS como seguranca real.
- Frontend apenas complementa seguranca.
- Nenhuma `service_role` no frontend.
- Nenhuma regra critica baseada apenas em local state.
- Operacoes destrutivas devem ser confirmadas e auditadas.

## 6. Estrutura Ideal Frontend

Organizacao macro futura:

```text
src/
  pages/
    Dashboard
    Brands
    Demands
    Publications
    Approvals
    Calendar
    Clients
    Contracts
    Settings

  components/
    layout/
      Sidebar
      Header
      MainShell

    cards/
      BrandCard
      DemandCard
      PublicationCard
      ApprovalCard
      CalendarEventCard

    kanban/
      KanbanBoard
      KanbanColumn
      KanbanCard

    drawers/
      BrandDrawer
      DemandDrawer
      PublicationDrawer
      ApprovalDrawer
      EventDrawer

    modals/
      QuickDemandModal
      QuickPublicationModal
      QuickApprovalModal
      QuickEventModal

    forms/
      DemandForm
      PublicationForm
      BrandForm
      ContractForm

  services/
    authService
    brandService
    demandService
    publicationService
    approvalService
    calendarService

  state/
    session
    filters
    ui

  constants/
    statuses
    stages
    priorities
    publicationTypes
    eventTypes
```

Regras:

- Paginas orquestram.
- Componentes exibem.
- Services conversam com Supabase.
- Constants centralizam status/stages.
- Estado global guarda sessao, filtros e UI, nao regra critica.

## 7. Estrutura Ideal Backend

### Tabelas principais

- `profiles`
- `clients`
- `brands`
- `contracts`
- `contract_brands`
- `brand_members`
- `projects`
- `demands`
- `demand_checklist_items`
- `publications`
- `approvals`
- `calendar_events`

### Relacoes

- Client possui brands.
- Client possui contracts.
- Contract atende brands.
- Brand possui demands.
- Brand possui publications.
- Brand possui calendar_events.
- Project agrupa publications e demands.
- Demand pode pertencer a publication.
- Approval pode aprovar demand ou publication.

### Permissoes

- Admin ve tudo.
- Colaborador ve marcas em que participa.
- Cliente externo ve apenas brands liberadas e itens visiveis.

### RLS

- RLS por brand como eixo principal.
- Policies por role.
- Policies separadas para leitura, criacao, edicao e exclusao.
- Cliente externo nunca deve depender apenas de filtro no frontend.

### Services

Criar services por dominio:

- auth.
- profiles.
- brands.
- demands.
- publications.
- approvals.
- calendar.

### Triggers

Triggers recomendados:

- `updated_at`.
- historico/audit logs em acoes sensiveis.
- possivel sync de status agregado no futuro.

### Storage

Storage futuro para:

- Assets.
- Briefings.
- Arquivos de clientes.
- Entregas.
- Comprovantes.

### Uploads

Uploads devem ter:

- Brand.
- Demand ou publication relacionada.
- Uploaded_by.
- Visibility.
- Metadata.

### Logs

Logs obrigatorios para:

- Criacao.
- Alteracao de responsavel.
- Alteracao de prazo.
- Mudanca de status/stage.
- Aprovacao.
- Reprovacao.
- Solicitacao de ajuste.
- Exclusao/cancelamento.

## 8. Criterio De Conclusao

Uma funcionalidade so esta pronta quando:

- Funciona no fluxo principal.
- Tem fallback/estado vazio.
- Respeita permissao.
- Persiste no Supabase, quando aplicavel.
- Atualiza a UI sem quebrar contexto.
- Tem validacao minima.
- Tem loading/erro basico.
- Nao duplica logica.
- Usa constantes padronizadas.
- Nao depende de dado mockado para fluxo real.
- Foi testada como admin.
- Foi testada como colaborador, quando aplicavel.
- Foi revisada contra a regra operacional.
- Nao aumenta burocracia sem necessidade.

Uma tela so esta pronta quando:

- A acao principal e clara.
- Filtros basicos funcionam.
- Edicao essencial funciona.
- O usuario entende o proximo passo.
- Nao ha informacao critica escondida.

Uma etapa tecnica so deve avancar quando a anterior estiver estavel.

