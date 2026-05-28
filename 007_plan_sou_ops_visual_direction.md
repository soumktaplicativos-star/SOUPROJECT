# 007 Plan SOU Ops Visual Direction

Este documento define a direcao visual estrategica da SOU Ops antes de qualquer implementacao de frontend.

Nao e um design system completo. E uma referencia para manter a plataforma alinhada a identidade visual e cultural da SOU Marketing Digital sem comprometer a produtividade diaria.

A direcao considera a identidade visual da SOU e os principios culturais do Manual de Cultura: estrategia, criatividade, foco, organizacao, clareza, responsabilidade com liberdade, comunicacao sem ruido, leveza com responsabilidade, qualidade de entrega e processos eficientes sem burocracia.

## 1. Direcao Visual Geral

A SOU Ops deve parecer uma ferramenta operacional premium, limpa, estrategica, humana, organizada e rapida de usar.

A sensacao desejada:

- Controle.
- Clareza.
- Organizacao.
- Sofisticacao.
- Agilidade.
- Confianca.
- Leveza.
- Responsabilidade.
- Presenca.
- Criatividade com metodo.

A plataforma deve carregar a identidade da SOU, mas nao deve parecer uma landing page institucional. O uso diario exige menos decoracao e mais foco.

Visual institucional pode ser mais expressivo, colorido e promocional.

Visual de produto operacional deve ser mais contido, escaneavel, consistente e funcional.

A marca entra como acento e personalidade. A operacao entra como prioridade.

A ideia central da interface deve ser:

```text
Organizacao e base da leveza.
```

Isso significa que a plataforma deve reduzir ansiedade operacional, deixar claro o que precisa ser feito e sustentar liberdade criativa com processos simples.

## 1.1 Cultura SOU Traduzida Em Interface

### Estrategia

Cada tela deve deixar claro o motivo da acao.

A interface deve responder rapidamente:

- Qual marca?
- Qual prioridade?
- Qual etapa?
- Qual proximo passo?
- Qual impacto?

### Criatividade

A criatividade deve aparecer na personalidade da interface, nos detalhes de marca e na forma de organizar conteudos, mas nunca como excesso visual.

Criatividade na SOU Ops significa clareza para criar melhor.

### Foco

Cada tela deve ter uma acao principal evidente.

Evitar multiplos botoes competindo pela atencao.

### Organizacao

Organizacao deve ser visualmente sentida:

- Hierarquia clara.
- Filtros simples.
- Cards escaneaveis.
- Separacao entre marca, demanda, publicacao, aprovacao e calendario.

### Responsabilidade com liberdade

A interface deve dar autonomia para a equipe atualizar, mover e resolver demandas sem pedir permissao para tudo, mas com clareza de prazo, responsavel e impacto.

### Comunicacao sem ruido

Textos curtos, labels diretas e estados claros.

Evitar frases vagas como "em analise" sem contexto. Preferir mensagens objetivas como "Aguardando aprovacao do cliente" ou "Pendente de material".

### Leveza com responsabilidade

A interface pode ser humana e leve, mas nao infantil, solta ou sem rigor.

Leveza deve vir de menos friccao, menos ruido e menos burocracia.

### Qualidade na entrega

Estados de revisao, aprovacao, pendencias e publicacao precisam ser visualmente confiaveis.

A UI deve transmitir que nada e entregue "por entregar".

### Processos eficientes sem burocracia

O visual deve favorecer acao rapida:

- Edicao inline.
- Drawers em vez de paginas longas.
- Modais curtos.
- Acoes contextuais.
- Checklist objetivo.

## 2. Paleta Recomendada

Paleta base da SOU:

- Roxo/azul: `#6961EC`
- Roxo profundo: `#8C1BC7`
- Off-white/bege claro: `#FFF2E6`
- Branco: `#FFFFFF`
- Preto/escuro: base operacional

Adaptacao para UI operacional:

| Uso | Cor recomendada | Observacao |
| --- | --- | --- |
| Background principal | `#0E0D14` | Base dark premium, calma e operacional. |
| Sidebar | `#14121D` | Um pouco mais clara que o fundo. |
| Cards/surfaces | `#1B1826` | Superficie neutra para conteudo. |
| Surface elevada | `#242033` | Drawers, modais e paineis ativos. |
| Borders | `#322D45` | Divisao sutil sem pesar. |
| Texto principal | `#FFFFFF` | Alto contraste. |
| Texto secundario | `#B8B2CC` | Apoio visual. |
| Texto muted | `#7F7897` | Metadados e informacoes menos importantes. |
| Primary | `#6961EC` | Acoes principais e selecao ativa. |
| Secondary | `#8C1BC7` | Destaques secundarios e marca. |
| Warm surface | `#FFF2E6` | Uso pontual para estados especiais, acolhimento ou contraste. |
| Success | `#2FBF71` | Concluido, aprovado, publicado. |
| Warning | `#F2A93B` | Aguardando, atencao, prazo proximo. |
| Danger | `#F05D5E` | Atrasado, recusado, critico. |
| Muted | `#6D6685` | Neutro, arquivado, pausado. |

A paleta deve evitar aparencia fria, generica ou corporativa demais. O dark premium da SOU Ops precisa ser acolhedor, com contraste bom, textos humanos e acentos de marca bem posicionados.

## 3. Uso Correto Das Cores Da SOU

### `#6961EC`

Usar como cor principal de acao:

- Botao principal.
- Item ativo na sidebar.
- Foco de input.
- Links operacionais importantes.
- Indicador de aba ativa.
- Destaque de selecao.

### `#8C1BC7`

Usar como acento secundario:

- Badges especiais.
- Realces de marca.
- Estados estrategicos.
- Pequenos detalhes visuais.

Evitar usar como fundo dominante de telas inteiras.

### `#FFF2E6`

Usar com cuidado:

- Destaques pontuais.
- Empty states especiais.
- Indicadores leves em telas escuras.
- Pequenos blocos de contexto, se necessario.
- Momentos em que a interface precisa trazer acolhimento e leveza.

Nao usar como fundo principal da plataforma V1, para nao perder o carater operacional premium.

### Onde evitar excesso de roxo

Evitar:

- Fundo inteiro roxo.
- Cards roxos em massa.
- Gradientes roxos em todos os blocos.
- Glow permanente.
- Kanban inteiro colorido.

Roxo deve guiar acao e identidade, nao competir com informacao.

O roxo nao deve tentar resolver hierarquia sozinho. Hierarquia deve vir de layout, espaco, tipografia, agrupamento e estados claros.

### Cores Para Status E Prioridade

Status:

- Backlog: muted.
- Em andamento: primary.
- Aguardando: warning.
- Concluido/aprovado/publicado: success.
- Cancelado/recusado/atrasado: danger.

Prioridade:

- Baixa: muted.
- Media: primary suave.
- Alta: warning.
- Critica: danger.

## 4. Tipografia

### Sora

Usar como tipografia principal da interface.

Aplicacoes:

- Textos.
- Labels.
- Menus.
- Cards.
- Tabelas.
- Formularios.

### Montserrat

Usar em subtitulos, elementos secundarios e possiveis titulos de secao.

Aplicacoes:

- Titulos compactos.
- Numeros ou metricas.
- Pequenos destaques editoriais.

### Fun City

Usar apenas como referencia de marca/logo.

Nao usar em UI operacional, campos, tabelas, kanban, filtros ou textos de leitura.

### Hierarquia Recomendada

- Titulo de pagina: 24-28px, peso 700.
- Titulo de secao: 16-18px, peso 600.
- Texto principal: 14-15px, peso 400/500.
- Texto de apoio: 12-13px, peso 400.
- Badge/tag: 11-12px, peso 600.
- Botao: 13-14px, peso 600.

## 5. Componentes Visuais Principais

### Sidebar

- Fundo dark neutro.
- Item ativo com detalhe em `#6961EC`.
- Icone + texto.
- Separadores discretos.
- Sem excesso de cor.

### Header

- Fixo ou semi-fixo.
- Busca global simples.
- Filtros contextuais.
- Botao principal a direita.
- Fundo proximo ao background, com borda inferior sutil.

### Cards

- Fundo `#1B1826`.
- Borda `#322D45`.
- Raio de 8px ou menos.
- Sem sombras pesadas.
- Informacao escaneavel.
- Tags pequenas e objetivas.

### Botoes

- Primario: `#6961EC`, texto branco.
- Secundario: fundo transparente ou surface elevada.
- Destrutivo: danger contido.
- Ghost: sem fundo, com hover sutil.

### Inputs

- Fundo escuro.
- Borda discreta.
- Foco com `#6961EC`.
- Labels claras e pequenas.
- Placeholder muted.

### Tags

- Pequenas.
- Alto contraste.
- Cores funcionais, nao decorativas.
- Usar para status, tipo, prioridade e canal.

### Badges

- Usar para contadores e alertas.
- Evitar badges grandes demais.
- Critico/atrasado deve ter destaque claro.

### Kanban Cards

- Compactos.
- Mostrar marca, responsavel, prazo, prioridade e stage.
- Borda/acento lateral para prioridade.
- Pouca cor interna.
- Acoes rapidas visiveis no hover ou no canto.

### Lista

- Densa o suficiente para produtividade.
- Linhas com boa leitura.
- Status e prioridade visiveis.
- Edicao inline futura.

### Drawer Lateral

- Surface elevada.
- Largura confortavel.
- Header com titulo e acoes.
- Conteudo em secoes.
- Deve permitir edicao sem perder contexto.

### Modal

- Usar para criacao e decisoes rapidas.
- Poucos campos.
- Acoes claras.
- Evitar modal longo.

### Estados Vazios

- Texto curto, humano e objetivo.
- Acao principal clara.
- Sem ilustracoes grandes.
- Pode usar acento SOU pontual.
- Devem orientar sem parecer erro.

Exemplos de tom:

- "Ainda nao ha demandas para esta marca."
- "Crie a primeira publicacao para organizar a producao."
- "Nada pendente por aqui. A operacao esta em dia."

### Microcopy

O texto da interface deve refletir a cultura SOU:

- Claro.
- Humano.
- Respeitoso.
- Direto.
- Sem tom frio ou robotico.
- Sem informalidade excessiva.

Preferir:

- "Aguardando aprovacao"
- "Pendente de material"
- "Prazo proximo"
- "Responsavel definido"

Evitar:

- "Erro generico"
- "Status indefinido"
- "Processando..."
- "Acao invalida" sem explicacao.

## 6. Estilo Da V1

A V1 deve usar dark premium operacional como base, com calor humano nos detalhes.

Diretrizes:

- Roxo SOU como acento.
- Cards neutros.
- Pouca cor simultanea.
- Interface densa o suficiente para produtividade.
- Espacamento confortavel.
- Contraste bom.
- Sem ornamentacao desnecessaria.
- Comunicacao objetiva.
- Sensacao de ordem sem rigidez.
- Leveza visual sem perder firmeza.

A V1 deve parecer uma ferramenta que a equipe quer deixar aberta durante o dia.

Ela deve ser premium sem ser distante, humana sem ser baguncada e criativa sem comprometer a leitura.

## 7. O Que Aproveitar Das Referencias

### Linear

- Clareza.
- Rapidez.
- Baixa friccao.
- Interface escaneavel.

### Notion

- Organizacao simples.
- Hierarquia clara.
- Conteudo facil de editar.

### ClickUp

- Operacao e tarefas.
- Flexibilidade de visualizacao.
- Acoes rapidas.

### Stripe Dashboard

- Sofisticacao.
- Confianca.
- Uso preciso de espaco, bordas e tipografia.

### Kiiru

- Comunicacao simples.
- Modulos claros.
- Visual amigavel.

Usar como inspiracao de clareza, mas sem copiar excesso de cor.

A referencia SOU deve prevalecer sobre qualquer referencia externa: estrategia, presenca, criatividade, foco, organizacao e humanidade.

## 8. O Que Evitar

Evitar:

- Dashboard roxo demais.
- Gradiente em excesso.
- Glow exagerado.
- Cards coloridos demais.
- Animacoes desnecessarias.
- Visual de landing page.
- Excesso de sombra.
- Excesso de informacao.
- Hero section.
- Elementos decorativos sem funcao.
- Tipografia de marca aplicada em interface operacional.
- Interface fria, generica ou corporativa demais.
- Linguagem dura demais para uma cultura humana.
- Leveza visual confundida com falta de processo.
- Organizacao confundida com burocracia.

## 9. Filosofia Visual Da SOU Ops

Principios:

- Produtividade acima de decoracao.
- Clareza acima de efeito visual.
- Marca como acento.
- Operacao como prioridade.
- Contexto de marca como centro.
- Informacao certa no lugar certo.
- Acoes rapidas acima de navegacao profunda.
- Estrategia visivel em cada decisao.
- Criatividade sustentada por processo.
- Liberdade com responsabilidade.
- Comunicacao sem ruido.
- Leveza com firmeza.

A plataforma deve ajudar a equipe a decidir e executar, nao apenas parecer bonita.

A SOU Ops deve materializar a cultura da SOU no uso diario: processos que deixam o time mais livre, nao mais preso.

## 10. Diretrizes Para O Primeiro Frontend

Comecar simples.

Ordem recomendada:

1. Criar layout base.
2. Definir sidebar/header/area principal.
3. Criar cards simples.
4. Criar kanban simples.
5. Criar drawers simples.
6. Aplicar identidade SOU sem exagero.
7. Validar uso operacional.
8. Refinar visual depois.

Nao criar design system complexo na primeira implementacao.

Nao criar dashboard sofisticado antes das telas operacionais funcionarem.

Nao transformar a V1 em landing page.

Antes de refinar a estetica, validar se a interface realmente reduz ruido, organiza a rotina e ajuda a equipe a entregar com qualidade.

## 11. Criterios De Qualidade Visual E Cultural

Antes de aprovar qualquer tela, ela deve passar por estas perguntas:

- A tela deixa claro o que precisa ser feito?
- A tela reduz ruido ou cria mais ruido?
- A marca SOU aparece como acento, sem excesso?
- A interface parece humana sem perder firmeza?
- A organizacao facilita a liberdade criativa?
- O colaborador consegue agir sem burocracia?
- A direcao consegue enxergar prioridade e risco?
- O visual comunica qualidade de entrega?
- O tom e leve, mas responsavel?

Se a resposta for nao, a tela deve ser simplificada antes de ser embelezada.

