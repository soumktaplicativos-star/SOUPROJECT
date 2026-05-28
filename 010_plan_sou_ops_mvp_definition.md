# 010 Plan SOU Ops MVP Definition

Este documento define a menor versao possivel da SOU Ops que ja resolve a operacao real da agencia sem complexidade desnecessaria.

O MVP deve ser operacional, leve e sustentavel. Nao deve tentar construir o SaaS inteiro agora.

## 1. Objetivo Do MVP

O MVP da SOU Ops deve resolver imediatamente a bagunca operacional interna da agencia.

Problemas que o MVP precisa atacar:

- Demandas espalhadas.
- Responsaveis pouco claros.
- Etapas sem controle.
- Prazos perdidos.
- Informacoes soltas em conversas.
- Aprovacoes sem historico.
- Falta de visao do que esta parado.
- Falta de clareza sobre quem faz o que.

O MVP precisa:

- Reduzir bagunca operacional.
- Centralizar demandas.
- Organizar responsaveis.
- Controlar etapas.
- Reduzir perda de informacao.
- Melhorar aprovacao.
- Gerar clareza da operacao.

Resultado esperado:

```text
A equipe entra na plataforma e sabe o que precisa fazer, para qual marca, ate quando e em qual etapa esta.
```

## 2. O Que O MVP Obrigatoriamente Precisa Ter

Funcionalidades essenciais:

- Login.
- Perfis.
- Clientes.
- Marcas.
- Demandas.
- Pipeline kanban.
- Responsaveis.
- Prioridade.
- Prazo.
- Checklist.
- Calendario basico.
- Aprovacoes simples.
- Historico basico.
- Anexos/links simples.
- Notificacoes internas basicas.

### Login

Autenticacao real com perfis basicos:

- Admin/direcao.
- Colaborador.

Cliente externo pode ficar preparado, mas nao precisa ser portal completo no MVP.

### Perfis

Cada pessoa precisa ter:

- Nome.
- Email.
- Papel.
- Status.

### Clientes

Cadastro simples de contratantes.

Campos minimos:

- Nome.
- Status.
- Observacoes internas.

### Marcas

Centro operacional do MVP.

Campos minimos:

- Nome.
- Cliente vinculado.
- Status.
- Responsaveis.
- Observacoes.

### Demandas

Nucleo operacional.

Campos minimos:

- Titulo.
- Marca.
- Responsavel.
- Status.
- Stage.
- Prioridade.
- Prazo.
- Checklist.
- Descricao.
- Historico basico.

### Pipeline Kanban

Colunas minimas:

- Backlog.
- Em andamento.
- Aguardando.
- Concluido.
- Cancelado.

Stage deve continuar separado do status.

### Calendario Basico

Eventos simples:

- Prazo de tarefa.
- Reuniao.
- Gravacao.
- Agendamento de publicacao.

### Aprovacoes Simples

Fluxos minimos:

- Pendente.
- Aprovado.
- Alteracoes solicitadas.
- Reprovado.

### Historico Basico

Registrar:

- Criacao.
- Mudanca de status.
- Mudanca de stage.
- Mudanca de responsavel.
- Mudanca de prazo.
- Aprovacao.
- Alteracao solicitada.

### Anexos/Links Simples

No MVP, anexos podem comecar como links.

Exemplos:

- Link do Drive.
- Link do Canva.
- Link de video.
- Link de pasta.

### Notificacoes Internas Basicas

No MVP, notificacao pode ser visual dentro do sistema:

- Atrasado.
- Aguardando aprovacao.
- Sem responsavel.
- Prazo proximo.

Nao precisa ter email, WhatsApp ou push no MVP.

## 3. O Que Nao Entra No MVP

Nao entra no MVP:

- IA.
- Analytics avancado.
- Automacoes complexas.
- Portal completo do cliente.
- Publicacao automatica.
- Financeiro completo.
- Multiempresa SaaS.
- Integracoes externas complexas.
- Google Calendar automatico.
- Instagram automatico.
- Chat interno completo.
- Relatorios avancados.
- Dashboard executivo sofisticado.
- Permissoes granulares demais.
- Mobile app.
- Controle juridico completo.
- Controle de contratos complexo.
- Templates automaticos avancados.

Esses itens ficam para depois porque aumentam complexidade antes de validar o uso diario.

## 4. Fluxo Minimo Funcional

Fluxo minimo necessario para a operacao diaria funcionar:

```text
Criar cliente
→ criar marca
→ criar demanda
→ definir responsavel
→ definir prazo
→ mover etapas
→ solicitar aprovacao
→ aprovar ou pedir ajuste
→ concluir
→ registrar historico
```

Fluxo de demanda:

1. Admin ou colaborador cria demanda.
2. Demanda recebe marca.
3. Demanda recebe responsavel.
4. Demanda entra em Backlog.
5. Responsavel move para Em andamento.
6. Responsavel atualiza checklist e stage.
7. Se precisar, envia para aprovacao.
8. Aprovador aprova ou pede ajuste.
9. Responsavel conclui.
10. Historico registra mudancas principais.

Fluxo de calendario:

1. Demanda recebe prazo.
2. Se houver evento especifico, cria calendar_event.
3. Equipe acompanha semana por marca/responsavel.

## 5. Estrutura Minima De Telas

Telas essenciais do MVP:

1. Login.
2. Dashboard operacional simples.
3. Marcas.
4. Demandas.
5. Aprovacoes.
6. Calendario.
7. Clientes.
8. Pessoas/perfis.

Telas que podem ser simplificadas:

- Contratos: pode ser campo/area simples dentro de cliente ou marca.
- Publicacoes: pode ficar como vinculo simples ou campo dentro de demanda inicialmente, se necessario.
- Relatorios: nao entram no MVP.

## 6. Estrutura Minima Do Banco

Tabelas indispensaveis para o MVP:

- `profiles`
- `clients`
- `brands`
- `brand_members`
- `demands`
- `demand_checklist_items`
- `approvals`
- `calendar_events`
- `activity_logs`
- `attachments`

### profiles

Usuarios e papeis.

### clients

Contratantes.

### brands

Centro operacional.

### brand_members

Equipe vinculada a cada marca.

### demands

Demandas operacionais.

### demand_checklist_items

Checklist por demanda.

### approvals

Aprovacoes simples.

### calendar_events

Eventos operacionais.

### activity_logs

Historico minimo.

### attachments

Links e anexos simples.

Observacao:

`publications`, `contracts` e `projects` podem estar planejados, mas nao precisam ser profundos no MVP se isso atrasar a operacao.

## 7. Criterio De Sucesso Do MVP

O MVP esta operacional quando:

- A direcao consegue ver demandas abertas, atrasadas e aguardando aprovacao.
- Cada demanda tem marca, responsavel, status, stage e prazo.
- A equipe consegue atualizar demandas sem depender de conversas soltas.
- Aprovacoes ficam registradas.
- Prazos aparecem no calendario basico.
- Historico minimo registra mudancas importantes.
- A equipe usa a plataforma por alguns dias sem precisar voltar para planilha/WhatsApp para saber o que fazer.
- Admin e colaborador conseguem operar com permissoes basicas.
- A plataforma reduz duvidas sobre quem faz o que.

Indicadores praticos:

- Menos demandas perdidas.
- Menos pergunta repetida sobre status.
- Menos aprovacao perdida em conversa.
- Mais clareza de prazo.
- Mais previsibilidade na entrega.

## 8. Criterio Para Comecar V2

Comecar V2 apenas quando o MVP estiver sendo usado de verdade.

Sinais de que pode avancar:

- A equipe atualiza demandas diariamente.
- A direcao confia no painel.
- Marcas e responsaveis estao organizados.
- Aprovacoes simples funcionam.
- Calendario basico esta ajudando.
- Historico minimo ja mostra valor.
- O time sente falta real de publicacoes mais completas.
- O time sente falta real de relatorios.
- O time sente falta real de integracoes.

V2 pode incluir:

- Publications completas.
- Projects/campaigns mais robustos.
- Contratos mais detalhados.
- Relatorios simples.
- Melhorias de dashboard.
- Integracao com Google Calendar.
- Portal cliente inicial.

Regra final:

```text
So expandir depois que o essencial virar rotina.
```

