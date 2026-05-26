# SOU Demandas

Plataforma simples para organizar demandas de uma agencia de marketing por colaborador.

## Como abrir

Abra o arquivo `index.html` no navegador.

## O que da para fazer

- Entrar com acesso por senha para direcao, colaborador ou cliente.
- Cadastrar, editar e excluir colaboradores.
- Registrar e-mail dos colaboradores para agenda.
- Acompanhar um dashboard executivo da operacao.
- Cadastrar clientes ativos/inativos, servicos contratados e situacao juridico/financeira.
- Gerar demandas automaticamente por ciclo/processo selecionando as pessoas envolvidas.
- Criar, editar e excluir demandas.
- Ver demandas por cliente, colaborador ou pela equipe toda.
- Registrar etapa, prazo, entrega real, tempo previsto e tempo gasto por demanda.
- Registrar data e hora de agenda para cada demanda.
- Medir saldo de horas para acompanhar produtividade por pessoa e etapa.
- Arrastar demandas entre colunas no estilo Trello/Kanban.
- Classificar demandas por prioridade de projeto e prioridade da tarefa.
- Adicionar checklist por demanda com modelos rapidos de onboarding, demandas iniciais, ciclo mensal e equipe.
- Ver e editar processos internos da agencia.
- Consultar e editar a definicao de funcoes e responsabilidades por pessoa.
- Filtrar por status e buscar por cliente, tarefa ou responsavel.
- Acompanhar quantidade total, em andamento, aguardando e atrasadas.
- Exportar os dados em JSON.
- Exportar tarefas para Google Agenda em arquivo `.ics`, com duracao e participante por e-mail.
- Sincronizar automaticamente com Google Agenda usando a ponte em `scripts/google-calendar-webhook.gs`.
- Importar um JSON exportado anteriormente.

## Como ativar sincronizacao automatica com Google Agenda

1. Abra [script.google.com](https://script.google.com).
2. Crie um novo projeto.
3. Cole o conteudo de `scripts/google-calendar-webhook.gs`.
4. Clique em **Implantar** > **Nova implantacao**.
5. Escolha **App da Web**.
6. Em **Executar como**, escolha **Eu**.
7. Em **Quem pode acessar**, escolha **Qualquer pessoa com o link**.
8. Copie a URL do App da Web.
9. Na plataforma, clique em **Conectar agenda** e cole a URL.
10. Ative **Sincronizar automaticamente quando salvar uma demanda**.

## Onde os dados ficam salvos

Os dados ficam salvos no navegador, usando `localStorage`. Para compartilhar ou fazer backup, use o botao **Exportar**.

## Senhas locais

Enquanto a plataforma roda como arquivo local, o login serve para separar visualizacoes e reduzir acesso acidental. Ele nao substitui autenticacao real para materiais sensiveis, porque o codigo do arquivo pode ser aberto por quem tiver acesso ao computador.

- Direcao: `sou-admin`
- Colaborador: `sou-` + id do colaborador. Exemplo: `sou-laura`.
- Cliente: `cliente-` + id do cliente. Exemplo: `cliente-starnet`.

Para seguranca real por senha, o proximo passo e migrar para uma versao hospedada com banco de dados e autenticacao, como Supabase ou Firebase.

## Proximos passos possiveis

- Autenticacao real com banco de dados e permissoes por usuario.
- Banco de dados compartilhado.
- Comentarios dentro de cada demanda.
- Anexos e links de referencia.
- Visao em calendario.
- Criacao automatica de tarefas a partir dos processos mensais.
