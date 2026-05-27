# PROJECT_RULES

Regras do projeto SOU Ops.

Este documento orienta futuras mudancas na plataforma. Ele nao altera codigo, banco ou visual.

## Objetivo do sistema

O SOU Ops tem como objetivo organizar a operacao de uma agencia de marketing.

O sistema deve permitir:

- Cadastrar contratantes comerciais/juridicos como `clients`.
- Cadastrar marcas operacionais como `brands`.
- Controlar marcas ativas, inativas, em onboarding, pausadas ou encerradas.
- Organizar demandas por marca, colaborador, status, etapa e prioridade.
- Separar contratos da operacao diaria.
- Gerar demandas com base nos ciclos da agencia.
- Controlar checklists de onboarding, demandas iniciais e ciclos mensais.
- Acompanhar tempo previsto, tempo gasto, prazo e entrega real.
- Separar informacoes internas da agencia de informacoes visiveis ao cliente.
- Dar visao geral para direcao.
- Dar visao de trabalho para colaboradores.
- Dar portal limitado para clientes.

## Arquitetura estrutural aprovada

A plataforma sera primeiro um sistema interno da SOU, nao um SaaS externo.

Hierarquia definitiva:

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
- `demands` deve girar em torno de `brand_id`.
- O centro operacional da plataforma sera `demands` + `brands`.
- `contracts` sera separado da operacao.
- `approvals` sera separado das demandas.
- `projects` sera opcional inicialmente.
- Cliente externo futuramente acessara por `brand`.
- Permuta/troca de servico sera tipo de contrato.

## Diferencas obrigatorias

### Client e brand

`client` e o contratante/comercial/juridico. Pode agrupar uma ou mais marcas.

`brand` e a operacao real. Deve ter demandas, calendario, equipe, aprovacoes e relatorios proprios.

Exemplos:

- Hora Certa e Moderny podem estar no mesmo contrato, mas devem operar como marcas separadas.
- Conceittus e Ativa BPO podem estar no mesmo contrato ou contratante, mas devem ter demandas, calendario e relatorios separados.

### Contrato e operacao

Contrato define acordo, escopo, financeiro, juridico, vigencia e tipo de pagamento.

Operacao define o trabalho diario executado pela equipe dentro de cada marca.

Um contrato pode cobrir varias marcas. Uma marca pode ter demandas em ciclos, campanhas ou projetos opcionais.

### Servico contratado e demanda operacional

Servico contratado e o item vendido no contrato.

Demanda operacional e a tarefa executavel que aparece no quadro, tem responsavel, prazo, etapa, tempo previsto e aprovacao.

Servicos devem orientar a criacao de demandas, mas nao devem substituir demandas.

## Pipeline operacional recomendado

Pipeline base das demandas:

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

Regras do pipeline:

- A demanda e o centro operacional.
- A marca e o centro de organizacao da operacao.
- Nem toda demanda precisa passar por todas as etapas.
- `stage` deve representar a etapa operacional.
- `status` deve representar o estado de andamento, como backlog, em andamento, aguardando ou concluido.
- Aprovacoes formais devem ser registradas em `approvals`.

## Tipos de usuario

### Admin

Perfil da direcao da agencia.

Pode:

- Ver todos os contratantes, marcas, contratos, projetos, demandas e aprovacoes.
- Ver todas as demandas.
- Criar, editar e excluir contratantes e marcas.
- Criar, editar e excluir contratos.
- Criar, editar e excluir demandas.
- Criar, editar e excluir colaboradores.
- Gerenciar pessoas por marca/projeto.
- Ver status financeiro e juridico.
- Ver contratos de permuta.
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
- Ver marcas em que participa da operacao.
- Atualizar demandas permitidas.
- Consultar etapas, prazos, checklists e responsabilidades.

Nao deve poder:

- Ver dados financeiros sensiveis, salvo autorizacao futura.
- Ver dados juridicos sensiveis, salvo autorizacao futura.
- Ver contratos de permuta, salvo autorizacao futura.
- Excluir contratantes, marcas ou contratos.
- Excluir colaboradores.
- Alterar permissoes de acesso.
- Ver marcas fora da sua participacao.

### Cliente

Perfil externo do cliente.

Pode:

- Ver somente as marcas liberadas para o seu acesso.
- Ver demandas marcadas como visiveis ao cliente.
- Ver status, etapa, prazo e entregas da propria marca/projeto.
- Ver anexos e comentarios liberados para cliente.

Nao deve poder:

- Ver outros clientes.
- Ver outras marcas do mesmo contratante sem permissao explicita.
- Ver equipe completa se isso nao for liberado.
- Ver financeiro interno.
- Ver juridico interno.
- Ver contrato completo ou dados de permuta.
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
- Permissoes por `brand`, nao apenas por `client`.
- Auditoria para acoes sensiveis.

## Riscos da estrutura antiga baseada apenas em clients

Nao continuar modelando a operacao apenas em `clients`.

Riscos:

- Misturar contratante, marca, contrato e operacao.
- Duplicar clientes para simular marcas diferentes.
- Misturar demandas, calendario e relatorios de marcas distintas.
- Expor marcas indevidas para cliente externo no futuro.
- Dificultar contratos com mais de uma marca.
- Dificultar contratos de permuta/troca de servico.
- Enfraquecer relatorios por marca.
- Gerar retrabalho ao migrar demandas para Supabase.

## Primeira fase do Supabase

A primeira implementacao do Supabase deve comecar somente pelas tabelas essenciais:

- `profiles`
- `clients`
- `brands`
- `brand_members`
- `contracts`
- `demands`
- `demand_checklist_items`

As demais tabelas devem ficar para etapas futuras, incluindo:

- `projects`
- `approvals`
- `comments`
- `attachments`
- `audit_logs`
- `calendar_events`
- `services`
- `processes`
- `roles`

Observacao: a migration antiga que usa apenas `clients` e `client_members` deve ser revisada antes de novas execucoes estruturais. O modelo definitivo deve usar `brands` como eixo operacional.

## Ordem segura de implementacao

1. Manter a versao atual estavel.
2. Documentar arquitetura, regras e dados antes de refatorar.
3. Consolidar `clients` como contratante e `brands` como operacao.
4. Criar projeto Supabase apenas apos aprovacao.
5. Criar migrations apenas apos aprovacao explicita.
6. Criar primeiro `clients`, `brands`, `contracts`, `brand_members`, `demands` e `demand_checklist_items`.
7. Configurar Supabase Auth.
8. Configurar RLS e policies por `brand`.
9. Migrar primeiro contratantes e marcas.
10. Migrar demandas para `brand_id`.
11. Validar permissoes de admin, colaborador e cliente externo.
12. Migrar aprovacoes, projetos, servicos contratados, comentarios e anexos.
13. Substituir `localStorage` somente quando banco e autenticacao estiverem validados.
14. Revisar integracao com Google Agenda por marca/demanda.
15. Remover login local apenas depois que Supabase Auth estiver funcionando.

## O que o Codex nao deve fazer sem autorizacao

O Codex nao deve:

- Alterar codigo quando o pedido for apenas diagnostico ou documentacao.
- Refatorar `app.js` sem autorizacao explicita.
- Criar projeto Supabase sem autorizacao.
- Criar tabelas no Supabase sem autorizacao.
- Criar migration estrutural sem considerar `brands`, `contracts` e `demands.brand_id`.
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
