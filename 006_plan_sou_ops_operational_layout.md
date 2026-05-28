# 006 Plan SOU Ops Operational Layout

Este documento define a estrutura visual operacional da V1 da SOU Ops em formato de wireframe textual.

Nao representa frontend final, design system, dashboard refinado ou componentes complexos. O objetivo e organizar a experiencia antes de qualquer implementacao visual.

## 1. Estrutura Visual Principal Da Plataforma

### Sidebar

Sidebar fixa com navegacao principal:

- Dashboard.
- Marcas.
- Demandas.
- Publicacoes.
- Aprovacoes.
- Calendario.
- Clientes.
- Contratos.
- Configuracoes.

Prioridade visual da sidebar:

1. Marcas.
2. Demandas.
3. Publicacoes.
4. Aprovacoes.
5. Calendario.

Clientes e contratos devem existir, mas nao devem competir com a rotina operacional diaria.

### Header

Header superior com:

- Nome da tela atual.
- Busca global simples.
- Filtro rapido por marca.
- Filtro rapido por responsavel.
- Botao de acao principal contextual.
- Perfil/sessao do usuario.

Exemplos de acao principal:

- Em Marcas: `+ Marca` ou `+ Demanda`.
- Em Demandas: `+ Demanda`.
- Em Publicacoes: `+ Publicacao`.
- Em Calendario: `+ Evento`.

### Area Principal

Area central deve priorizar contexto e execucao:

- Listas.
- Kanban.
- Cards operacionais.
- Filtros simples.
- Estados vazios objetivos.

Evitar paineis decorativos ou blocos sem acao clara.

### Drawers Laterais

Drawers laterais devem abrir detalhes sem tirar a pessoa do fluxo.

Usos principais:

- Detalhe da marca.
- Detalhe da demanda.
- Detalhe da publicacao.
- Detalhe da aprovacao.
- Detalhe do evento.

O drawer deve permitir edicao rapida do essencial.

### Modais Rapidos

Modais devem ser usados apenas para criacao ou decisao rapida:

- Criar demanda.
- Criar publicacao.
- Criar evento.
- Aprovar.
- Solicitar alteracao.
- Trocar responsavel.

### Acoes Rapidas

Acoes rapidas devem estar sempre perto do contexto:

- Criar demanda para esta marca.
- Criar publicacao para esta marca.
- Mover etapa.
- Mudar responsavel.
- Marcar aprovado.
- Criar evento de calendario.
- Abrir publication vinculada.

## 2. Layout Operacional Da Tela De Marcas

A tela de marcas e o centro operacional da V1.

### Estrutura Visual

```text
[Header: Marcas | Busca | Filtro cliente/status/responsavel | + Marca]

[Cards resumo]
- Marcas ativas
- Demandas atrasadas
- Publicacoes aguardando aprovacao
- Proximos eventos

[Lista/Grid de marcas]
- Card da marca
- Status
- Cliente
- Responsaveis
- Demandas abertas
- Publicacoes em producao
- Proximo prazo
```

### Detalhe Da Marca Em Drawer

Blocos do drawer:

1. Resumo da marca.
2. Responsaveis.
3. Demandas abertas.
4. Publicacoes recentes.
5. Aprovacoes pendentes.
6. Proximos eventos.
7. Projetos/campanhas.
8. Contrato vinculado resumido.

### Informacoes Prioritarias

- Nome da marca.
- Cliente vinculado.
- Status.
- Responsavel principal.
- Equipe da marca.
- Demandas abertas.
- Demandas atrasadas.
- Publicacoes aguardando aprovacao.
- Proximo evento.

### Acoes Rapidas

- `+ Demanda`.
- `+ Publicacao`.
- `+ Evento`.
- `Ver demandas`.
- `Ver calendario`.
- `Trocar responsavel`.

## 3. Layout Operacional Da Tela De Demandas

A tela de demandas deve ser a principal ferramenta de execucao da equipe.

### Estrutura Do Kanban

Colunas por status:

```text
Backlog | Em andamento | Aguardando | Concluido | Cancelado
```

Cada card deve mostrar:

- Titulo.
- Marca.
- Responsavel.
- Stage/pipeline.
- Prioridade.
- Prazo.
- Publication vinculada, se existir.
- Indicador de checklist.
- Indicador de aprovacao.

### Estrutura Da Lista

Lista operacional para produtividade:

Colunas sugeridas:

- Titulo.
- Marca.
- Publication.
- Responsavel.
- Status.
- Stage.
- Prioridade.
- Prazo.
- Tempo estimado.
- Tempo gasto.

### Filtros

Filtros prioritarios:

- Marca.
- Responsavel.
- Status.
- Stage.
- Prioridade.
- Publication.
- Prazo.
- Atrasadas.

### Quick Actions

No card/lista:

- Mudar status.
- Mudar stage.
- Trocar responsavel.
- Alterar prioridade.
- Marcar checklist.
- Abrir publication.
- Criar aprovacao.
- Criar evento.

### Drawer Da Demanda

Blocos:

1. Titulo e descricao.
2. Marca/publication/project.
3. Responsavel.
4. Status e stage.
5. Prioridade e prazo.
6. Checklist.
7. Tempo estimado/gasto.
8. Aprovacoes vinculadas.
9. Eventos vinculados.
10. Links/anexos futuros.

### Edicao Inline

Pode ser editado sem abrir tela nova:

- Status.
- Stage.
- Responsavel.
- Prioridade.
- Prazo.
- Checklist.
- Tempo gasto.

## 4. Layout Operacional Da Tela De Publicacoes

Publicacoes representam conteudos finais.

### Lista/Cards

Filtros:

- Marca.
- Projeto.
- Tipo.
- Canal.
- Status.
- Data.
- Aprovacao.

Card da publication:

- Titulo.
- Marca.
- Tipo.
- Canal.
- Status.
- Data agendada.
- Responsavel.
- Demandas vinculadas.
- Status de aprovacao.

### Detalhe Da Publication Em Drawer

Blocos:

1. Resumo.
2. Legenda/caption.
3. Assets/links.
4. Demandas vinculadas.
5. Aprovacoes.
6. Evento de calendario.
7. Status de producao/publicacao.

### Relacao Com Demandas

No detalhe, permitir:

- Ver demandas vinculadas.
- Criar demanda vinculada.
- Ver progresso das demandas.
- Identificar bloqueios.

### Aprovacao

Publication pode ser enviada para aprovacao.

Acoes:

- Solicitar aprovacao.
- Aprovar.
- Solicitar alteracao.
- Ver historico.

### Calendario

Acoes:

- Criar evento de agendamento.
- Ver data agendada.
- Marcar como publicada.

## 5. Layout Operacional Da Tela De Aprovacoes

A tela de aprovacoes deve funcionar como fila de decisao.

### Estrutura Visual

```text
[Pendentes] [Aprovadas] [Alteracoes solicitadas] [Recusadas]
```

### Card De Aprovacao

Mostrar:

- Tipo: demand ou publication.
- Marca.
- Titulo.
- Solicitante.
- Responsavel por aprovar.
- Data de solicitacao.
- Status.
- Observacao curta.

### Acoes Rapidas

- Aprovar.
- Solicitar alteracao.
- Recusar.
- Abrir item.
- Adicionar comentario.

### Historico

Drawer deve mostrar:

- Quem solicitou.
- Quando solicitou.
- Quem respondeu.
- Comentarios.
- Status anterior e atual.

### Comentarios

Comentario deve ser curto e objetivo na V1.

Evitar thread complexa no inicio.

## 6. Layout Operacional Da Tela De Calendario

Calendario deve priorizar operacao semanal.

### Lista Semanal

Visao principal recomendada:

- Hoje.
- Amanhã.
- Esta semana.
- Proxima semana.

Cada evento mostra:

- Tipo.
- Marca.
- Titulo.
- Horario.
- Responsavel.
- Vinculo com demand/publication.

### Visao Mensal Simples

Mostra distribuicao dos eventos no mes.

Nao precisa ter recurso avancado na V1.

### Filtros

- Marca.
- Projeto.
- Responsavel.
- Tipo de evento.
- Status.

### Relacao Com Demandas/Publicacoes

Eventos podem apontar para:

- Demand.
- Publication.
- Project.
- Brand.

Calendar event nao substitui demand. Ele apenas organiza datas.

## 7. Layout Do Dashboard Operacional Simples

Dashboard deve ser simples e acionavel.

### Visao Da Direcao

Blocos:

- Demandas atrasadas.
- Aprovacoes pendentes.
- Publicacoes em producao.
- Proximos eventos.
- Marcas com pendencias.
- Responsaveis sobrecarregados.

Atalhos:

- Ver atrasadas.
- Ver aprovacoes.
- Criar demanda.
- Criar publicacao.
- Abrir calendario.

### Visao Do Colaborador

Blocos:

- Minhas demandas.
- Meus prazos.
- Minhas publicacoes vinculadas.
- Minhas aprovacoes aguardando retorno.
- Meus eventos da semana.

Atalhos:

- Atualizar demanda.
- Marcar checklist.
- Mover etapa.
- Abrir publication.
- Criar evento.

## 8. O Que Deve Abrir Como

### Pagina

- Dashboard.
- Marcas.
- Demandas.
- Publicacoes.
- Aprovacoes.
- Calendario.
- Clientes.
- Contratos.

### Modal

- Criar demanda rapida.
- Criar publicacao rapida.
- Criar evento rapido.
- Aprovar.
- Solicitar alteracao.
- Trocar responsavel.

### Drawer

- Detalhe da marca.
- Detalhe da demanda.
- Detalhe da publication.
- Detalhe da aprovacao.
- Detalhe do evento.

### Edicao Rapida Inline

- Status.
- Stage.
- Prioridade.
- Responsavel.
- Prazo.
- Checklist.
- Tempo gasto.

## 9. Regras De UX Operacional

Regras principais:

- Menos troca de tela.
- Menos cliques.
- Foco em produtividade.
- Foco em contexto de marca.
- Evitar burocracia.
- Edicao rapida sempre que possivel.
- Drawer para detalhe sem perder o contexto.
- Modal apenas para acao curta.
- Dashboard simples e acionavel.

Toda tela deve responder:

- O que precisa ser feito?
- Para qual marca?
- Quem e responsavel?
- Qual o prazo?
- Qual o proximo passo?

## 10. O Que Nao Implementar Visualmente Ainda

Nao implementar nesta etapa:

- Charts complexos.
- Analytics.
- Dashboard executivo refinado.
- Design system refinado.
- Integracoes.
- Portal cliente.
- Automacoes.
- Mobile app.
- Animacoes.
- Componentes complexos.

## Fluxo Visual Operacional

Fluxo ideal da rotina:

```text
Dashboard simples
  -> Marca
    -> Publication
      -> Demands
        -> Approval
        -> Calendar Event
```

Fluxo alternativo de execucao:

```text
Minhas demandas
  -> Abrir drawer da demanda
  -> Atualizar checklist/status/stage
  -> Abrir publication vinculada
  -> Solicitar aprovacao ou criar evento
```

## Hierarquia Das Telas

Prioridade da V1:

1. Marcas.
2. Demandas.
3. Publicacoes.
4. Aprovacoes.
5. Calendario.
6. Dashboard simples.
7. Clientes.
8. Contratos.

## Prioridades De UX

- Operacao diaria acima de administracao.
- Marca acima de cliente.
- Demandas acima de dashboard.
- Publicacoes separadas de demandas.
- Calendario como apoio, nao como centro.
- Aprovacoes simples e rapidas.

## Riscos De Usabilidade

- Menus demais.
- Formularios longos.
- Obrigatoriedade excessiva de campos.
- Separar demais a operacao em telas diferentes.
- Transformar dashboard em painel decorativo.
- Fazer calendario competir com kanban.
- Fazer contratos dominarem a rotina.
- Esconder acoes importantes dentro de detalhes profundos.

## Recomendacoes De Simplicidade

- Primeira versao deve ser operacional, nao sofisticada.
- Criar demanda deve ser rapido.
- Atualizar demanda deve ser mais rapido ainda.
- Marca deve concentrar o contexto.
- Publication deve mostrar progresso sem exigir gestao pesada.
- Aprovar deve exigir poucos cliques.
- Calendario deve comecar por lista semanal.

