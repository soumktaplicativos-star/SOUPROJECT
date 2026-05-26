# PROJECT_RULES

Regras do projeto SOU Ops.

Este documento orienta futuras mudancas na plataforma. Ele nao altera codigo, banco ou visual.

## Objetivo do sistema

O SOU Ops tem como objetivo organizar a operacao de uma agencia de marketing.

O sistema deve permitir:

- Cadastrar clientes.
- Controlar clientes ativos, inativos, em onboarding, pausados ou encerrados.
- Organizar demandas por cliente, colaborador, status, etapa e prioridade.
- Gerar demandas com base nos ciclos da agencia.
- Controlar checklists de onboarding, demandas iniciais e ciclos mensais.
- Acompanhar tempo previsto, tempo gasto, prazo e entrega real.
- Separar informacoes internas da agencia de informacoes visiveis ao cliente.
- Dar visao geral para direcao.
- Dar visao de trabalho para colaboradores.
- Dar portal limitado para clientes.

## Tipos de usuario

### Admin

Perfil da direcao da agencia.

Pode:

- Ver todos os clientes.
- Ver todas as demandas.
- Criar, editar e excluir clientes.
- Criar, editar e excluir demandas.
- Criar, editar e excluir colaboradores.
- Gerenciar pessoas no projeto.
- Ver status financeiro e juridico.
- Ver observacoes internas.
- Gerar ciclos de demandas.
- Exportar e importar dados enquanto a versao local existir.
- Configurar integracoes.
- Ver processos internos.
- Ver funcoes e responsabilidades.

### Colaborador

Perfil de uma pessoa da equipe.

Pode:

- Ver demandas atribuidas a ela.
- Ver clientes em que participa do projeto.
- Atualizar demandas permitidas.
- Consultar etapas, prazos, checklists e responsabilidades.

Nao deve poder:

- Ver dados financeiros sensiveis, salvo autorizacao futura.
- Ver dados juridicos sensiveis, salvo autorizacao futura.
- Excluir clientes.
- Excluir colaboradores.
- Alterar permissoes de acesso.
- Ver dados de clientes fora da sua participacao.

### Cliente

Perfil externo do cliente.

Pode:

- Ver somente o proprio projeto.
- Ver demandas marcadas como visiveis ao cliente.
- Ver status, etapa, prazo e entregas do proprio projeto.
- Ver anexos e comentarios liberados para cliente.

Nao deve poder:

- Ver outros clientes.
- Ver equipe completa se isso nao for liberado.
- Ver financeiro interno.
- Ver juridico interno.
- Ver observacoes internas.
- Ver processos internos da agencia.
- Ver tempo interno de producao, salvo decisao futura.
- Editar demandas internas.
- Excluir demandas.
- Exportar a base completa.

## Permissoes esperadas no futuro

As permissoes devem ser aplicadas no backend e no banco.

O frontend pode esconder botoes, mas isso nao deve ser considerado seguranca.

Quando Supabase for implementado, usar:

- Supabase Auth para login real.
- Row Level Security para proteger dados.
- Policies por tipo de usuario.
- Separacao entre campos internos e campos visiveis ao cliente.
- Auditoria para acoes sensiveis.

## Primeira fase do Supabase

A primeira implementacao do Supabase deve comecar somente pelas tabelas essenciais:

- `profiles`
- `clients`
- `client_members`
- `demands`
- `demand_checklist_items`

As demais tabelas devem ficar para etapas futuras, incluindo:

- `comments`
- `attachments`
- `audit_logs`
- `calendar_events`
- `services`
- `processes`
- `roles`

## Ordem segura de implementacao

1. Manter a versao atual estavel.
2. Documentar arquitetura, regras e dados antes de refatorar.
3. Definir quais dados sao internos e quais podem aparecer para cliente.
4. Criar projeto Supabase apenas apos aprovacao.
5. Criar tabelas principais apenas apos aprovacao.
6. Configurar Supabase Auth.
7. Configurar RLS e policies antes de migrar dados sensiveis.
8. Migrar `people`, `clients` e `demands`.
9. Validar permissoes de admin, colaborador e cliente.
10. Migrar processos, funcoes, checklists, comentarios e anexos.
11. Substituir `localStorage` somente quando banco e autenticacao estiverem validados.
12. Revisar integracao com Google Agenda.
13. Remover login local apenas depois que Supabase Auth estiver funcionando.

## O que o Codex nao deve fazer sem autorizacao

O Codex nao deve:

- Alterar codigo quando o pedido for apenas diagnostico ou documentacao.
- Refatorar `app.js` sem autorizacao explicita.
- Criar projeto Supabase sem autorizacao.
- Criar tabelas no Supabase sem autorizacao.
- Substituir `localStorage` sem autorizacao.
- Alterar login sem autorizacao.
- Remover funcionalidades existentes sem autorizacao.
- Apagar dados, arquivos ou historico sem autorizacao.
- Alterar visual/estilo quando o pedido for apenas arquitetura.
- Criar dependencias novas sem autorizacao.
- Expor dados sensiveis em documentacao publica.
- Colocar senhas reais ou chaves de API no codigo.
- Commitar arquivo `.env`.
- Expor chave `service_role`.
- Usar chave `service_role` no frontend.
- Usar no frontend apenas chave publica/publishable, como `anon`/`publishable`.
- Fazer push para GitHub sem confirmacao ou orientacao da usuaria.

## Principio geral

Toda mudanca estrutural deve seguir esta ordem:

1. Diagnosticar.
2. Documentar.
3. Aprovar.
4. Implementar em partes pequenas.
5. Validar.
6. Commitar.
