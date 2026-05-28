# 008 Plan SOU Ops Operational Logic

Este documento define a logica operacional real da SOU Ops antes de qualquer implementacao definitiva de frontend, banco ou automacao.

O objetivo e transformar a rotina da agencia em comportamento sistemico claro, leve e confiavel.

## 1. Fluxo Operacional Completo

Pipeline principal:

```text
IDEIA
→ BRIEFING
→ ROTEIRO
→ CAPTACAO
→ EDICAO
→ REVISAO INTERNA
→ APROVACAO CLIENTE
→ AJUSTE
→ AGENDAMENTO
→ PUBLICADO
→ RELATORIO
```

### IDEIA

O que acontece:

- Registro inicial de pauta, oportunidade, insight ou necessidade.
- Pode nascer de planejamento, reuniao, demanda do cliente ou iniciativa interna.

Quem pode mover:

- Admin.
- Estrategista.
- Social media responsavel.

Quem visualiza:

- Equipe vinculada a marca.
- Admin.

Acoes:

- Criar demanda.
- Vincular marca.
- Definir tipo de conteudo.
- Definir prioridade.
- Enviar para briefing.

Notificacoes:

- Nova ideia criada para marca.

Bloqueios:

- Nao avanca sem marca definida.

Status possiveis:

- backlog.
- in_progress.

### BRIEFING

O que acontece:

- Coleta de objetivo, publico, oferta, referencias, contexto e materiais.
- Pode exigir informacoes do cliente.

Quem pode mover:

- Admin.
- Estrategista.
- Responsavel principal da demanda.

Quem visualiza:

- Equipe da marca.
- Cliente externo apenas se a demanda for visivel.

Acoes:

- Preencher briefing.
- Solicitar material.
- Marcar briefing completo.
- Voltar para ideia.
- Avancar para roteiro.

Notificacoes:

- Material pendente.
- Briefing completo.

Bloqueios:

- Nao avanca sem objetivo claro.
- Se depende do cliente, status vira waiting.

Status possiveis:

- in_progress.
- waiting.

### ROTEIRO

O que acontece:

- Criacao de pauta, estrutura, roteiro, copy base ou direcao criativa.

Quem pode mover:

- Estrategista.
- Social media.
- Admin.

Acoes:

- Criar roteiro.
- Revisar roteiro.
- Enviar para captacao ou edicao/design.

Notificacoes:

- Roteiro pronto para revisao.

Bloqueios:

- Nao avanca para captacao se roteiro obrigatorio estiver vazio.

Status possiveis:

- in_progress.
- waiting.
- done.

### CAPTACAO

O que acontece:

- Gravacao, fotos, coleta de materiais ou captacao presencial/remota.

Quem pode mover:

- Videomaker.
- Social media.
- Admin.

Acoes:

- Criar evento de gravacao.
- Confirmar data.
- Registrar captacao realizada.
- Anexar links/arquivos.

Notificacoes:

- Captacao agendada.
- Captacao concluida.
- Material pendente.

Bloqueios:

- Nao avanca para edicao sem material.

Status possiveis:

- waiting.
- in_progress.
- done.

### EDICAO

O que acontece:

- Edicao de video, design, legenda, copy ou montagem do conteudo.

Quem pode mover:

- Designer.
- Videomaker.
- Social media.
- Admin.

Acoes:

- Atualizar versao.
- Anexar link.
- Marcar checklist.
- Enviar para revisao interna.

Notificacoes:

- Conteudo pronto para revisao.

Bloqueios:

- Nao avanca sem arquivo/link ou entrega minima.

Status possiveis:

- in_progress.
- waiting.

### REVISAO INTERNA

O que acontece:

- Conferencia de estrategia, texto, design, informacao, qualidade e coerencia com a marca.

Quem pode mover:

- Admin.
- Estrategista.
- Responsavel de revisao definido.

Acoes:

- Aprovar internamente.
- Solicitar ajuste.
- Comentar.
- Enviar para aprovacao do cliente.

Notificacoes:

- Revisao pendente.
- Ajuste solicitado.

Bloqueios:

- Nao envia para cliente sem revisao interna quando a demanda exigir qualidade final.

Status possiveis:

- waiting.
- in_progress.
- done.

### APROVACAO CLIENTE

O que acontece:

- Cliente valida a publication ou entrega final.

Quem pode mover:

- Admin.
- Social media responsavel.
- Cliente externo autorizado, futuramente.

Acoes:

- Enviar para aprovacao.
- Aprovar.
- Solicitar ajuste.
- Reprovar.
- Registrar comentario.

Notificacoes:

- Aguardando aprovacao do cliente.
- Cliente solicitou ajuste.
- Cliente aprovou.

Bloqueios:

- Nao pode agendar/publicar sem aprovacao quando approval_status for required/pending.

Status possiveis:

- waiting.
- done.

### AJUSTE

O que acontece:

- Correcao apos revisao interna ou retorno do cliente.

Quem pode mover:

- Responsavel pela demanda.
- Admin.

Acoes:

- Criar nova versao.
- Responder comentario.
- Enviar novamente para revisao/aprovacao.

Notificacoes:

- Ajuste solicitado.
- Nova versao pronta.

Bloqueios:

- Nao retorna para aprovacao sem registrar alteracao ou justificativa.

Status possiveis:

- in_progress.
- waiting.

### AGENDAMENTO

O que acontece:

- Definicao de data/hora de publicacao ou entrega.
- Criacao de calendar_event.

Quem pode mover:

- Social media.
- Admin.
- Responsavel pela marca.

Acoes:

- Criar evento de publicacao.
- Confirmar canal.
- Registrar data.
- Marcar como agendado.

Notificacoes:

- Publicacao agendada.
- Publicacao sem data.

Bloqueios:

- Nao agenda publication sem aprovacao quando aprovacao for exigida.

Status possiveis:

- in_progress.
- done.

### PUBLICADO

O que acontece:

- Conteudo, entrega ou campanha foi publicada/entregue.

Quem pode mover:

- Admin.
- Social media.
- Trafego pago, quando campanha.

Acoes:

- Registrar published_at.
- Marcar publication como published.
- Marcar demandas vinculadas como done quando aplicavel.

Notificacoes:

- Publicado.
- Entrega concluida.

Bloqueios:

- Nao marcar publicado sem data ou registro minimo.

Status possiveis:

- done.

### RELATORIO

O que acontece:

- Registro e analise de entregas, resultados, atrasos, aprovacoes e aprendizados.

Quem pode mover:

- Admin.
- Social media.
- Trafego pago.
- Estrategista.

Acoes:

- Criar demanda de relatorio.
- Consolidar dados.
- Registrar aprendizados.
- Apontar proximos passos.

Notificacoes:

- Relatorio pendente.
- Relatorio enviado.

Bloqueios:

- Nao fechar ciclo mensal sem revisar entregas principais.

Status possiveis:

- in_progress.
- done.

## 2. Regras De Responsabilidade

### Responsavel principal

Pessoa diretamente responsavel por fazer a demanda andar.

Pode:

- Editar status.
- Editar etapa.
- Atualizar checklist.
- Registrar tempo.
- Adicionar observacoes.
- Solicitar aprovacao.
- Criar evento relacionado.

Nao deve:

- Excluir demanda critica sem permissao.
- Alterar marca/contrato sem permissao.
- Aprovar como cliente.

### Colaboradores auxiliares

Pessoas que participam da execucao, mas nao sao donas da demanda.

Podem:

- Ver demandas da marca em que participam.
- Atualizar checklist atribuido.
- Adicionar comentarios.
- Subir links/arquivos futuros.

Nao devem:

- Excluir demandas.
- Alterar responsavel principal sem permissao.
- Alterar aprovacao final.

### Cliente externo

Perfil futuro.

Pode:

- Ver apenas marcas liberadas.
- Ver apenas demandas/publications visiveis ao cliente.
- Aprovar ou solicitar ajustes quando autorizado.
- Comentar no fluxo de aprovacao.

Nao pode:

- Ver processos internos.
- Ver tempo interno.
- Ver financeiro/juridico interno.
- Excluir.
- Mover pipeline interno.

### Administrador

Perfil da direcao/gestao.

Pode:

- Ver tudo.
- Criar, editar e excluir.
- Alterar responsaveis.
- Aprovar internamente.
- Reabrir demandas.
- Cancelar.
- Corrigir fluxo.
- Ver historico e logs.

## 3. Estrutura Real Das Demandas

Cada demanda deve prever:

- Titulo.
- Cliente.
- Marca.
- Projeto/campanha.
- Publication vinculada.
- Formato.
- Canal.
- Tipo de demanda.
- Prioridade.
- Responsavel principal.
- Colaboradores auxiliares.
- Checklist.
- Arquivos/links.
- Versao.
- Prazo.
- Data de entrega.
- Observacoes internas.
- Observacoes visiveis ao cliente.
- Status.
- Stage/pipeline.
- Historico.
- Tempo estimado.
- Tempo gasto.
- Approval status.

Campos essenciais para operacao diaria:

- Titulo.
- Marca.
- Responsavel.
- Status.
- Stage.
- Prazo.
- Prioridade.
- Checklist.

Campos que podem ser opcionais na V1:

- Publication.
- Projeto/campanha.
- Arquivos.
- Versao.
- Tempo gasto.
- Observacoes do cliente.

## 4. Sistema De Aprovacoes

### Aprovacao simples

Fluxo:

1. Responsavel envia item para aprovacao.
2. Aprovador recebe item na fila.
3. Aprovador aprova.
4. Item segue para agendamento/publicacao.

### Aprovacao com ajustes

Fluxo:

1. Aprovador solicita alteracao.
2. Item volta para ajuste.
3. Responsavel cria nova versao.
4. Item retorna para revisao/aprovacao.

### Reprovacao

Usar quando o item nao deve seguir.

Deve exigir comentario obrigatorio.

### Historico de alteracoes

Toda aprovacao deve registrar:

- Quem solicitou.
- Quem respondeu.
- Data/hora.
- Status.
- Comentario.
- Versao relacionada, quando houver.

### Multiplas versoes

Cada nova entrega relevante deve gerar nova versao.

Exemplo:

- v1: primeira edicao.
- v2: ajuste de legenda.
- v3: correcao final.

### Comentarios do cliente

Comentarios externos devem ficar separados dos comentarios internos.

Cliente nao deve ver notas internas.

### Trava de publicacao sem aprovacao

Se a publication exigir aprovacao:

- Nao pode ir para agendamento sem approval_status approved.
- Nao pode ser marcada como published sem aprovacao.

Admin pode sobrescrever apenas com justificativa registrada.

## 5. Estrutura De Calendario

### Calendario editorial

Organiza publicacoes e entregas de conteudo.

Inclui:

- Agendamento de publicacao.
- Data de entrega.
- Data de campanha.

### Calendario operacional

Organiza tarefas e compromissos internos.

Inclui:

- Prazo de tarefa.
- Gravacao.
- Reuniao.
- Prazo de aprovacao.

### Calendario da equipe

Mostra eventos por colaborador.

Inclui:

- Minhas demandas com prazo.
- Minhas reunioes.
- Minhas gravacoes.
- Minhas publicacoes vinculadas.

### Visualizacao por cliente/marca

Na V1, priorizar marca.

Visualizacao deve permitir:

- Marca.
- Projeto.
- Responsavel.
- Tipo de evento.
- Semana.
- Mes.

### Filtros

Filtros principais:

- Marca.
- Responsavel.
- Tipo de evento.
- Status.
- Periodo.
- Project/campanha.

## 6. Analytics Internos

Analytics internos sao futuros, mas a operacao deve nascer preparada para medir.

Metricas operacionais:

- Atrasos.
- Tempo medio por etapa.
- Gargalos.
- Produtividade.
- Aprovacao media.
- Retrabalho.
- Velocidade por colaborador.
- Performance por cliente/marca.

Como medir futuramente:

- Atrasos: comparar due_date com done/delivered/published.
- Tempo por etapa: historico de mudanca de stage.
- Gargalos: etapas com mais tempo parado.
- Produtividade: demandas concluidas por periodo e horas.
- Aprovacao media: tempo entre pedido e resposta.
- Retrabalho: quantidade de ajustes por item.
- Velocidade por colaborador: tempo medio por tipo de demanda.
- Performance por marca: cruzar demands, publications e analytics futuros.

Nao implementar analytics na V1, apenas preservar dados para permitir isso depois.

## 7. Regras Importantes

### O que nao pode acontecer

- Publicar sem aprovacao quando aprovacao for obrigatoria.
- Demanda sem marca.
- Demanda sem responsavel por muito tempo.
- Publication sem marca.
- Evento de calendario sem marca.
- Cliente externo vendo notas internas.
- Excluir item com historico sem permissao.
- Misturar status com stage.
- Usar calendario como substituto do kanban.

### Regras para evitar bagunca

- Toda demanda deve ter marca.
- Toda demanda deve ter responsavel.
- Toda publication deve ter marca.
- Toda aprovacao deve ter alvo claro.
- Todo evento deve ter tipo.
- Toda mudanca critica deve gerar historico.

### Regras de nomenclatura

Demandas:

```text
[Tipo] - [Entrega] - [Marca]
```

Exemplo:

```text
Reels - Dia dos Namorados - Moderny
```

Publications:

```text
[Formato] - [Tema/Campanha] - [Data ou ciclo]
```

Exemplo:

```text
Carrossel - Oferta Junho - Semana 2
```

Projetos:

```text
[Marca] - [Campanha/Ciclo] - [Periodo]
```

Exemplo:

```text
Moderny - Campanha Dia dos Namorados - 2026
```

### Limites de exclusao

Excluir deve ser restrito.

Itens com historico devem preferir cancelamento/arquivamento.

Admin pode excluir, mas a V1 deve tratar exclusao como acao sensivel.

### Logs obrigatorios

Devem gerar log/historico futuro:

- Criacao.
- Alteracao de responsavel.
- Alteracao de prazo.
- Mudanca de status.
- Mudanca de stage.
- Envio para aprovacao.
- Aprovacao.
- Reprovacao.
- Solicitação de ajuste.
- Cancelamento.
- Exclusao.

### Historico obrigatorio

Todo item operacional importante deve manter historico.

Historico minimo:

- Quem alterou.
- O que mudou.
- Quando mudou.
- Valor anterior e novo, quando aplicavel.

## 8. Filosofia Operacional

A SOU Ops deve refletir:

```text
Organizacao com leveza.
Clareza sem burocracia.
Responsabilidade com autonomia.
```

Organizacao com leveza:

- Processo existe para liberar energia criativa, nao para prender a equipe.

Clareza sem burocracia:

- A pessoa deve entender o que fazer sem preencher campos desnecessarios.

Responsabilidade com autonomia:

- Cada colaborador deve conseguir agir, atualizar e resolver dentro do seu escopo.

Principio final:

```text
Se o sistema aumenta ruido, ele esta errado.
Se o sistema reduz ruido e melhora entrega, ele esta certo.
```

