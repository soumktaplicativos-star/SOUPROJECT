# 005 Plan SOU Ops Screens Wireframe

## 1. Visao Geral Das Telas

Este arquivo define as telas principais da SOU Ops antes de qualquer implementacao visual, frontend, banco ou automacao.

A estrutura segue o fluxo operacional:

```text
Cliente -> Marca -> Contrato -> Projeto/Campanha -> Publicacao -> Demandas -> Aprovacao -> Calendario -> Relatorio futuro
```

O objetivo e transformar a arquitetura operacional em uma experiencia clara, simples e eficiente para a equipe da SOU.

## 2. Menu Principal Sugerido

Menu lateral/principal:

- Dashboard: visao geral da operacao e prioridades.
- Clientes: contratantes comerciais e juridicos.
- Marcas: centro operacional do dia a dia.
- Contratos: relacao comercial, juridica, escopo, recorrencia e permuta.
- Projetos/Campanhas: agrupadores de ciclos, campanhas, onboardings e entregas maiores.
- Publicacoes: conteudos finais que serao publicados, entregues ou medidos.
- Demandas: kanban e lista operacional das tarefas.
- Aprovacoes: fila de aprovacoes internas e de cliente.
- Calendario: prazos, gravacoes, reunioes, aprovacoes e publicacoes.
- Relatorios futuros: resultados por marca, projeto e periodo.
- Configuracoes: usuarios, papeis, permissoes e cadastros auxiliares.

## 3. Dashboard Inicial

O dashboard deve mostrar uma visao objetiva da operacao, sem virar um painel financeiro complexo nesta fase.

Blocos principais:

- Demandas em aberto.
- Demandas atrasadas.
- Publicacoes em producao.
- Publicacoes aguardando aprovacao.
- Proximos eventos de calendario.
- Clientes/marcas com pendencias.
- Visao geral por status.

Visao estrategica da direcao:

- Marcas com mais atrasos.
- Demandas criticas.
- Aprovacoes paradas.
- Prazos proximos.
- Gargalos por responsavel.

Visao operacional do colaborador:

- Minhas demandas.
- Minhas proximas entregas.
- Minhas aprovacoes pendentes.
- Eventos vinculados as minhas marcas.

Acoes rapidas/contextuais:

- Criar demanda rapida.
- Mover etapa rapidamente.
- Abrir publicacao.
- Aprovar rapidamente.
- Trocar responsavel rapidamente.

Objetivo: evitar excesso de cliques e burocracia.

## 4. Tela De Clientes

A tela de clientes deve organizar os contratantes comerciais/juridicos.

Elementos principais:

- Lista de clientes.
- Busca por nome.
- Filtros por status.
- Dados principais do contratante.
- Botao criar cliente.
- Acesso ao detalhe do cliente.

Detalhe do cliente:

- Dados principais.
- Marcas vinculadas.
- Contratos.
- Historico basico.
- Observacoes internas.

Esta tela nao deve ser o centro operacional diario; esse papel pertence a tela de marcas.

## 5. Tela De Marcas

A tela de marcas deve ser o centro operacional do dia a dia.

Elementos principais:

- Lista de marcas.
- Filtro por cliente.
- Filtro por status.
- Filtro por responsavel.
- Detalhe da marca.
- Membros responsaveis.
- Publicacoes recentes.
- Demandas abertas.
- Proximos prazos.
- Calendario da marca.
- Projetos vinculados.

No detalhe da marca, a equipe deve conseguir entender rapidamente:

- O que esta em andamento.
- O que esta atrasado.
- O que precisa de aprovacao.
- O que sera publicado.
- Quem esta responsavel.

## 6. Tela De Contratos

A tela de contratos deve organizar a camada comercial e juridica.

Elementos principais:

- Lista de contratos.
- Filtro por cliente.
- Filtro por status financeiro.
- Filtro por status juridico.
- Filtro por tipo de contrato.
- Detalhe do contrato.
- Vigencia.
- Valor.
- Permuta.
- Observacoes internas.
- Marcas vinculadas.
- Status operacional.

Tipos de contrato podem incluir recorrente pago, permuta, misto, cortesia e projeto pontual.

## 7. Tela De Projetos/Campanhas

Projetos e campanhas agrupam trabalhos maiores.

Elementos principais:

- Lista de projetos.
- Filtros por marca.
- Filtros por status.
- Filtros por periodo.
- Progresso geral.
- Publicacoes do projeto.
- Demandas do projeto.
- Calendario relacionado.
- Responsaveis.

Exemplos:

- Onboarding de uma marca.
- Ciclo mensal.
- Campanha Dia dos Namorados.
- Projeto de branding.
- Campanha de trafego pago.

## 8. Tela De Publicacoes

Publicacao representa o conteudo final, nao a tarefa operacional.

Elementos principais:

- Lista de publicacoes.
- Filtros por marca.
- Filtros por projeto.
- Filtros por tipo.
- Filtros por canal.
- Filtros por status.
- Filtros por data.
- Detalhe da publicacao.
- Assets.
- Legenda.
- Status.
- Aprovacoes.
- Calendario/agendamento.
- Demandas vinculadas.

Exemplos de publicacao:

- Reels.
- Post.
- Carrossel.
- Story.
- Criativo de campanha.
- Video.
- Artigo.
- Email.
- Landing page.

## 9. Tela De Demandas

Demandas representam o trabalho operacional.

Visualizacoes:

- Kanban operacional.
- Lista.

Filtros:

- Marca.
- Responsavel.
- Status.
- Prioridade.
- Publication.
- Prazo.

Detalhe da demanda:

- Vinculo com publication.
- Vinculo com brand.
- Vinculo com project.
- Checklist operacional.
- Historico futuro.
- Comentarios futuros.
- Anexos/links futuros.
- Atualizacao rapida de status e etapa.

Separacao obrigatoria:

- `status`: andamento geral, como backlog, em andamento, aguardando, concluido ou cancelado.
- `stage`: etapa do pipeline, como briefing, roteiro, captacao, edicao, revisao, aprovacao, agendamento, publicado ou relatorio.

## 10. Tela De Aprovacoes

A tela de aprovacoes deve concentrar o que precisa de decisao.

Elementos principais:

- Aprovacoes pendentes.
- Aprovacoes de demand.
- Aprovacoes de publication.
- Historico.

Status:

- Pendente.
- Aprovado.
- Recusado.
- Alteracoes solicitadas.

Regra conceitual:

- Aprovacao operacional e diferente de aprovacao do conteudo final.
- Aprovar uma legenda e diferente de aprovar o post final.
- Aprovar uma tarefa interna e diferente de aprovar uma peca pronta para o cliente.

## 11. Tela De Calendario

Calendar events nao substituem demands.

Visualizacoes:

- Mensal.
- Semanal.
- Lista.

Filtros:

- Marca.
- Projeto.
- Responsavel.
- Tipo.

Tipos de evento:

- Prazo de tarefa.
- Gravacao.
- Reuniao.
- Prazo de aprovacao.
- Agendamento de publicacao.
- Inicio/fim de campanha.
- Entrega de relatorio.

O calendario deve servir para organizacao de datas e compromissos, enquanto demands continuam sendo a base operacional.

## 12. Tela De Relatorios Futuros

Planejamento futuro apenas. Nao implementar agora.

Relatorios futuros devem permitir:

- Relatorios por marca.
- Relatorios por projeto.
- Relatorios por periodo.
- Cruzamento com publications.
- Cruzamento com approvals.
- Cruzamento com demands.
- Futuramente cruzamento com analytics.

O objetivo futuro e medir produtividade, prazos, volume de entregas, aprovacoes e resultados de marketing.

## 13. Tela De Configuracoes

Configuracoes devem reunir cadastros e preferencias auxiliares.

Itens possiveis:

- Usuarios.
- Papeis.
- Permissoes futuras.
- Status personalizados futuros.
- Tipos de publicacao.
- Canais.
- Integracoes futuras.

Evitar configuracoes complexas demais na primeira versao.

## 14. Prioridade De Implementacao

### Fase 1

- Clientes.
- Marcas.
- Contratos.
- Demandas.

### Fase 2

- Projetos/Campanhas.
- Publicacoes.
- Aprovacoes.
- Calendario.

### Fase 3

- Dashboard consolidado.
- Relatorios.
- Analytics.
- Portal do cliente.
- Integracoes.

## 15. O Que Nao Fazer Na Primeira Interface

Nao implementar na primeira interface:

- Dashboard excessivamente complexo.
- Portal do cliente.
- Analytics.
- Financeiro avancado.
- Integracao automatica com Instagram.
- Integracao automatica com Google Calendar.
- Automacoes complexas.
- Permissoes detalhadas demais.
- Excesso de menus.

A primeira interface deve focar em clareza operacional e execucao diaria.

