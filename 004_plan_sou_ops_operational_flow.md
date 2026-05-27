# 004 Plan SOU Ops Operational Flow

Este documento consolida o fluxo operacional real da SOU Ops antes de qualquer implementacao de interface, banco ou automacao.

## 1. Visao Geral Da SOU Ops

A SOU Ops e um sistema operacional interno para organizar a rotina da agencia.

O objetivo e dar clareza sobre clientes, marcas, contratos, projetos, campanhas, publicacoes, demandas, aprovacoes, calendario e relatorios futuros.

A plataforma deve ser pensada primeiro como uma ferramenta interna da SOU, com foco em operacao, produtividade, prazos, responsabilidades e visibilidade da direcao.

Fluxo estrutural:

```text
Cliente -> Marca -> Contrato -> Projeto/Campanha -> Publicacao -> Demandas -> Aprovacao -> Calendario -> Relatorio futuro
```

## 2. Entidades Principais

### clients

Representam a pessoa, empresa, grupo ou responsavel contratante.

O client e a base comercial/juridica. Ele nao deve ser confundido com a marca operacional trabalhada no marketing.

### brands

Representam as marcas operacionais trabalhadas pela agencia.

Uma brand recebe demandas, publicacoes, calendario, equipe, aprovacoes e relatorios proprios.

### contracts

Representam a relacao comercial e juridica entre a SOU e o contratante.

Incluem tipo de contrato, vigencia, valor, permuta, status financeiro, status juridico e observacoes internas.

### contract_brands

Relacionam contratos e marcas.

Permitem que um contrato atenda uma ou mais marcas.

### brand_members

Relacionam colaboradores a marcas.

Servem para definir quem participa da operacao de cada marca.

### projects

Agrupam ciclos, campanhas, onboardings ou entregas maiores.

Projects sao opcionais inicialmente, mas ajudam a organizar campanhas e ciclos mensais.

### publications

Representam o conteudo final que sera publicado, entregue ou medido.

Exemplos: reels, post, carrossel, story, criativo de campanha, artigo, video, email ou landing page.

### demands

Representam as tarefas operacionais necessarias para produzir, revisar, aprovar, agendar ou entregar algo.

A demand e o nucleo operacional da produtividade.

### approvals

Representam aprovacoes formais de demandas ou publicacoes.

Guardam historico de aprovacao, rejeicao ou pedido de alteracao.

### calendar_events

Representam eventos de calendario ligados a marca, demanda, publicacao ou projeto.

Nao substituem demands. Apenas organizam datas, prazos, reunioes, gravacoes e publicacoes.

### reports futuros

Representarao relatorios por marca, periodo, campanha ou projeto.

Devem consolidar demandas concluidas, publicacoes feitas, aprovacoes, prazos e resultados.

### analytics futuros

Representarao metricas de publicacoes e campanhas.

Devem depender principalmente de publications, nao de demands.

## 3. Diferenca Entre Cliente, Marca E Contrato

`client` representa a pessoa ou empresa contratante.

`brand` representa a marca operacional trabalhada no marketing.

`contract` representa a relacao comercial e juridica.

Um cliente pode ter varias marcas. Um contrato pode atender uma ou mais marcas.

Exemplos praticos:

- Um empresario com duas empresas deve ser um `client` com duas `brands`.
- Uma clinica com varias unidades ou marcas pode ter um `client` e varias `brands`.
- Um contrato recorrente pode atender Instagram e trafego pago para uma ou mais marcas.

Essa separacao evita misturar financeiro, juridico e operacao em uma unica entidade.

## 4. Diferenca Entre Project, Publication E Demand

`project` agrupa um ciclo, campanha, onboarding ou entrega maior.

`publication` e o conteudo final que sera publicado, entregue ou medido.

`demand` e a tarefa operacional necessaria para produzir algo.

Exemplo:

Projeto: Campanha Dia dos Namorados

Publications:

- Reels teaser
- Carrossel de oferta
- Sequencia de stories
- Criativo de trafego

Demands:

- Criar roteiro
- Fazer design
- Editar video
- Escrever legenda
- Revisar
- Agendar

Uma publication pode ter varias demands. Uma demand pode existir sem publication quando for reuniao, relatorio, financeiro, onboarding ou tarefa interna.

## 5. Fluxo Operacional Principal

Fluxo ideal:

1. Criar cliente.
2. Criar marca vinculada ao cliente.
3. Criar contrato vinculado ao cliente.
4. Vincular contrato a marca.
5. Definir membros responsaveis pela marca.
6. Criar projeto/campanha.
7. Criar publicacoes dentro do projeto.
8. Criar demandas vinculadas as publicacoes.
9. Enviar demandas ou publicacoes para aprovacao.
10. Criar eventos de calendario para prazos, reunioes, gravacoes e publicacao.
11. Publicar.
12. Futuramente medir analytics.
13. Futuramente gerar relatorio.

## 6. Tipos De Fluxo

### A. Cliente recorrente de social media

Fluxo recomendado:

1. Client contratante.
2. Brand operacional.
3. Contract recorrente.
4. Project mensal.
5. Publications do mes.
6. Demands de roteiro, design, copy, revisao, aprovacao e agendamento.
7. Calendar events de prazo e publicacao.
8. Report mensal futuro.

### B. Cliente recorrente com social media + trafego pago

Fluxo recomendado:

1. Contract recorrente com escopos de social media e trafego.
2. Brand operacional.
3. Project mensal.
4. Publications organicas.
5. Publications ou assets de campanha paga.
6. Demands de criativo, copy, configuracao, revisao, monitoramento e relatorio.
7. Calendar events de inicio/fim de campanha.
8. Analytics futuros de publicacao e campanha.

### C. Campanha pontual

Fluxo recomendado:

1. Project do tipo campanha.
2. Publications da campanha.
3. Demands de planejamento, criacao, producao, revisao, aprovacao e agendamento.
4. Calendar events de inicio, prazos e encerramento.
5. Report futuro da campanha.

### D. Projeto de branding ou identidade visual

Fluxo recomendado:

1. Contract pontual.
2. Project de branding.
3. Demands de briefing, pesquisa, conceito, design, revisao interna, apresentacao e ajustes.
4. Approvals internas e do cliente.
5. Calendar events de reunioes e entregas.

### E. Captacao de conteudo presencial

Fluxo recomendado:

1. Calendar event de gravacao.
2. Demand de preparacao de roteiro/pauta.
3. Demand de captacao.
4. Publications geradas a partir do material.
5. Demands de edicao, legenda, revisao, aprovacao e agendamento.

### F. Relatorio mensal

Fluxo recomendado:

1. Demand de coleta de dados.
2. Demand de analise.
3. Demand de montagem do relatorio.
4. Approval interna.
5. Calendar event de entrega.
6. Report futuro vinculado a brand e periodo.

## 7. Papeis De Usuario

### owner/admin

Ve tudo, gerencia clientes, marcas, contratos, projetos, demandas, aprovacoes, calendario e permissoes.

### estrategista

Ve marcas e projetos em que atua. Define direcao estrategica, prioridades, briefing, pautas, campanhas e aprovacoes internas.

### social media

Ve demandas e publicacoes das marcas em que participa. Atua em planejamento, legenda, agendamento, relacionamento e acompanhamento.

### designer

Ve demandas de design e publicacoes vinculadas. Atualiza status, entrega artes e participa de revisoes.

### videomaker

Ve demandas de gravacao e edicao. Atua em captacao, organizacao de arquivos e edicao de video.

### trafego pago

Ve demandas e publicacoes/assets de campanha paga. Atua em criativos, copy, configuracao, monitoramento e relatorios.

### financeiro

Ve dados financeiros e contratos autorizados. Atua em status financeiro, vencimentos, pendencias e permutas.

### juridico

Ve contratos e status juridicos autorizados. Atua em revisao, formalizacao e pendencias documentais.

### cliente externo futuro

Ve apenas marcas liberadas, publicacoes e demandas visiveis ao cliente, aprovacoes solicitadas, prazos e entregas permitidas.

## 8. Aprovacoes

Existem dois tipos conceituais importantes:

- Aprovacao de demand.
- Aprovacao de publication.

Aprovar uma legenda e diferente de aprovar o post final.

Aprovar uma tarefa interna e diferente de aprovar uma peca pronta para o cliente.

Exemplos:

- Demand: "Escrever legenda do reels" pode receber aprovacao interna.
- Publication: "Reels teaser Dia dos Namorados" pode receber aprovacao final do cliente.

Approvals devem registrar status, responsavel, data, resposta e observacoes.

## 9. Calendario

`calendar_events` nao substitui `demands`.

Calendar events servem para:

- Prazo de tarefa.
- Gravacao.
- Reuniao.
- Prazo de aprovacao.
- Agendamento de publicacao.
- Inicio/fim de campanha.
- Entrega de relatorio.

Demand guarda a tarefa operacional. Calendar event guarda o compromisso de data/hora.

## 10. O Que Nao Implementar Ainda

Nao implementar agora:

- Analytics.
- Relatorios avancados.
- Dashboard financeiro completo.
- Portal do cliente.
- Integracao automatica com Instagram.
- Integracao automatica com Google Calendar.
- Automacoes complexas.
- Permissoes avancadas demais.

Esses pontos devem vir depois da consolidacao de clients, brands, contracts, projects, publications, demands, approvals e calendar_events.

## 11. Proximas Etapas Recomendadas

Ordem futura recomendada:

1. Revisar arquitetura 001, 002 e 003.
2. Definir fluxo operacional.
3. Definir telas principais.
4. Criar wireframe textual.
5. So depois implementar frontend.
6. Depois conectar com banco.
7. Depois pensar em analytics e relatorios.

