# SUPABASE_AUTH_PLAN

Documento de planejamento da Etapa 2: autenticacao real com Supabase Auth.

Este arquivo nao substitui o login local atual, nao altera `app.js` e nao conecta as telas ao Supabase.

## Objetivo da etapa

Preparar uma camada isolada para autenticacao real com Supabase Auth.

Nesta etapa ficam preparados:

- `signup`
- `login`
- `logout`
- `getCurrentUser`
- consulta futura do profile do usuario autenticado
- preparacao de payload para sincronizacao futura entre `auth.users` e `profiles`

Nada disso deve ser conectado automaticamente ao sistema atual ainda.

## Fluxo de autenticacao planejado

1. Usuario informa e-mail e senha.
2. Frontend chama Supabase Auth.
3. Supabase valida credenciais.
4. Supabase retorna sessao e usuario autenticado.
5. Sistema consulta a tabela `profiles` usando `auth_user_id`.
6. O perfil define o nivel de acesso: `admin`, `collaborator` ou `client`.
7. As telas passam a carregar dados conforme as policies do Supabase.

## Diferenca entre auth.users e profiles

### auth.users

Tabela interna gerenciada pelo Supabase Auth.

Responsavel por:

- login
- senha
- sessao
- recuperacao de senha
- e-mail do usuario autenticado
- id tecnico usado por `auth.uid()`

Nao deve ser manipulada diretamente pelo frontend.

### profiles

Tabela publica da aplicacao.

Responsavel por:

- nome exibido
- e-mail operacional
- tipo de usuario
- cargo/funcao
- cor/avatar
- status
- relacionamento com clientes e demandas

Relacionamento principal:

- `profiles.auth_user_id` referencia `auth.users.id`

## Fluxo de admin

Admin representa a direcao da agencia.

Regras planejadas:

- Admin nao deve ser criado automaticamente por signup publico.
- Profile com `role = 'admin'` deve ser criado manualmente no Supabase ou por fluxo administrativo futuro.
- Admin pode ver e gerenciar todos os clientes, colaboradores, demandas e vinculos.
- Admin pode criar colaboradores e clientes.
- Admin pode definir membros de um projeto.

## Fluxo de colaborador

Colaborador representa uma pessoa da equipe.

Regras planejadas:

- Pode ter conta criada por convite ou fluxo administrativo.
- Pode ter `role = 'collaborator'`.
- Pode ver clientes nos quais participa.
- Pode ver demandas atribuidas a ele ou vinculadas a clientes nos quais participa, conforme policy.
- Nao deve ver informacoes sensiveis fora da sua permissao.

## Fluxo de cliente

Cliente representa acesso externo.

Regras planejadas:

- Pode ter `role = 'client'`.
- Pode ver apenas o proprio projeto.
- Pode ver apenas demandas marcadas como visiveis ao cliente.
- Pode ver apenas checklist, comentarios e anexos liberados para cliente em etapas futuras.
- Nao deve ver outros membros do projeto, dados financeiros internos, juridico interno ou processos internos.

## Sincronizacao futura entre auth.users e profiles

A sincronizacao ainda nao sera automatica nesta etapa.

Fluxo futuro recomendado:

1. Criar usuario no Supabase Auth.
2. Criar registro correspondente em `profiles`.
3. Salvar `profiles.auth_user_id = auth.users.id`.
4. Definir `role` no profile.
5. Vincular usuario aos clientes via `client_members`.

Para admin:

- Criar manualmente o profile admin no Supabase.
- Evitar signup publico criando admin.

Para colaborador:

- Criar via convite ou painel administrativo.
- Vincular aos clientes em `client_members`.

Para cliente:

- Criar acesso externo.
- Vincular somente ao cliente dele em `client_members`.

## Arquivo preparado

`supabaseAuth.js` expoe futuramente:

- `window.SOU_SUPABASE_AUTH.signup`
- `window.SOU_SUPABASE_AUTH.login`
- `window.SOU_SUPABASE_AUTH.logout`
- `window.SOU_SUPABASE_AUTH.getCurrentUser`
- `window.SOU_SUPABASE_AUTH.getCurrentSession`
- `window.SOU_SUPABASE_AUTH.getProfileForCurrentUser`
- `window.SOU_SUPABASE_AUTH.prepareProfilePayload`

## Regras de seguranca

- Nao usar `service_role` no frontend.
- Nao commitar `.env`.
- Nao criar admin automaticamente por signup publico.
- Nao substituir o login local ate Supabase Auth estar testado.
- Nao migrar dados sensiveis antes de validar RLS.
- Nao conectar telas ao Supabase sem testar policies com usuarios reais.
