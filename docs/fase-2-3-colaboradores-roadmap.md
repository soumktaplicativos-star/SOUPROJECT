# Fase 2.3 - Roadmap Tecnico De Colaboradores E Portal Do Colaborador

## 1. Diagnostico Atual

A SOU Ops ja possui uma base operacional validada para clientes, marcas e contratos no Supabase. A autenticacao real tambem ja esta funcionando com Supabase Auth.

Estado atual da arquitetura:

- `profiles` representa o usuario autenticado do Supabase.
- `people`, dentro do `app.js`, ainda representa equipe/colaboradores em dados locais.
- `clients`, `brands`, `contracts` e `contract_brands` ja estao vivos no Supabase.
- `demands` ainda nao foram migradas e continuam usando `ownerId` local.
- Ainda nao existe Portal do Colaborador.
- Ainda nao existe uma separacao formal entre pessoa da equipe e usuario com login.

Antes de criar um Portal do Colaborador, a plataforma precisa separar corretamente:

- `profiles`: usuario do sistema, autenticacao e acesso.
- `collaborators`: pessoa que trabalha na SOU, com ou sem login.

## 2. Decisao De Arquitetura

### Profiles

`profiles` deve continuar representando usuarios autenticados no Supabase. Essa tabela deve ser usada para controle de acesso, sessao, papel global e relacao com `auth.users`.

Exemplos:

- admin com login;
- gestor com login;
- colaborador com login;
- cliente externo com login futuro.

### Collaborators

`collaborators` deve representar pessoas que trabalham na SOU, independentemente de terem login.

Exemplos:

- social media;
- designer;
- videomaker;
- gestor;
- financeiro;
- juridico;
- freelancer;
- colaborador sem acesso ao sistema.

Um colaborador pode ter login, mas nao deve depender disso para existir na operacao.

### Aba Colaboradores

A aba Colaboradores sera uma area administrativa interna para gestao da equipe pela direcao/administracao.

Deve concentrar:

- dados gerais;
- funcao/cargo;
- tipo de vinculo;
- permissoes;
- marcas atribuidas;
- demandas atribuidas;
- disponibilidade;
- entregas;
- produtividade;
- financeiro individual;
- juridico/documentos;
- onboarding;
- feedbacks;
- arquivos;
- historico.

### Portal Do Colaborador

O Portal do Colaborador sera uma area individual de trabalho para cada pessoa logada.

Deve mostrar apenas:

- meu painel;
- minhas demandas;
- minhas marcas;
- meu calendario;
- arquivos permitidos;
- comentarios;
- minhas entregas;
- meu financeiro, se habilitado;
- meu perfil.

## 3. Tabelas Futuras Sugeridas

As tabelas abaixo representam a arquitetura futura completa. Nem todas devem ser criadas na primeira implementacao.

### `collaborators`

Tabela principal de pessoas que trabalham na SOU.

Campos provaveis:

- `id`
- `profile_id`
- `name`
- `email`
- `phone`
- `status`
- `role_title`
- `contract_type`
- `notes_internal`
- `created_at`
- `updated_at`

### `collaborator_roles`

Catalogo ou historico de funcoes/cargos.

Uso futuro:

- social media;
- designer;
- videomaker;
- gestor;
- trafego pago;
- financeiro;
- juridico.

### `collaborator_brand_assignments`

Tabela de vinculo entre colaboradores e marcas.

Permite que uma marca tenha varios colaboradores e que um colaborador atenda varias marcas.

### `demand_assignees`

Tabela futura para permitir multiplos responsaveis por demanda.

Nao deve substituir `demands.ownerId` de imediato.

### `collaborator_availability`

Agenda, disponibilidade, dias de trabalho, horarios, bloqueios e capacidade.

### `collaborator_documents`

Documentos internos do colaborador.

Exemplos:

- contrato de prestacao;
- documentos pessoais;
- termos;
- anexos juridicos.

### `collaborator_onboarding`

Checklist de entrada do colaborador.

Exemplos:

- acesso criado;
- manual enviado;
- treinamento;
- ferramentas configuradas;
- primeira pauta acompanhada.

### `collaborator_feedbacks`

Feedbacks, avaliacoes, alinhamentos e historico de desenvolvimento.

### `collaborator_payments`

Financeiro individual do colaborador.

Deve ficar para fase futura e exigir permissao rigorosa.

### `user_roles`

Permissoes globais mais robustas que `profiles.role`, caso seja necessario evoluir para multiplos papeis por usuario.

### `user_brand_access`

Controle de acesso de usuarios a marcas especificas.

Pode ser util para colaborador, gestor e cliente externo.

### `activity_logs`

Auditoria de acoes importantes.

Exemplos:

- quem editou demanda;
- quem alterou contrato;
- quem mudou permissao;
- quem anexou documento;
- quem aprovou algo.

## 4. Nucleo Minimo Recomendado Para Primeira Implementacao Futura

A primeira implementacao de Colaboradores deve ser pequena.

Nucleo recomendado:

- `collaborators`
- `collaborator_brand_assignments`
- relacao opcional entre `profiles` e `collaborators`

Decisao tecnica a tomar:

- usar `collaborators.profile_id`;
- ou usar `profiles.collaborator_id`.

Recomendacao inicial:

- preferir `collaborators.profile_id` opcional.

Motivo:

- permite colaborador sem login;
- evita alterar a estrutura principal de autenticacao cedo demais;
- reduz risco de quebrar o login Supabase ja validado.

## 5. Relacionamento Colaborador > Marca

A relacao correta entre colaboradores e marcas e muitos-para-muitos.

Modelo:

```text
collaborators
  -> collaborator_brand_assignments
    -> brands
```

Campos minimos de `collaborator_brand_assignments`:

- `id`
- `collaborator_id`
- `brand_id`
- `role_on_brand`
- `is_primary`
- `status`
- `created_at`

Exemplo operacional:

- uma marca pode ter social media, designer, videomaker e gestor;
- um colaborador pode atender varias marcas;
- uma pessoa pode ser principal em uma marca e auxiliar em outra.

## 6. Relacionamento Colaborador > Demanda

Na V1 atual, `demands.ownerId` pode continuar existindo.

Nao e seguro migrar Demandas cedo demais, porque o Kanban e o fluxo atual ainda dependem da estrutura antiga.

Evolucao futura:

```text
demands
  -> demand_assignees
    -> collaborators
```

Campos minimos de `demand_assignees`:

- `demand_id`
- `collaborator_id`
- `assignment_role`
- `is_primary`
- `status`

Exemplo:

- uma demanda de Reels pode ter roteiro, captacao, edicao e revisao;
- cada etapa pode ter responsaveis diferentes;
- o responsavel principal pode continuar sendo indicado por `is_primary`.

## 7. Permissoes Futuras

As permissoes devem ser protegidas por RLS no Supabase e nao apenas escondidas no frontend.

### Admin

Pode:

- ver todos os colaboradores;
- editar tudo;
- acessar financeiro;
- acessar juridico;
- acessar produtividade;
- alterar permissoes;
- vincular colaboradores a marcas;
- visualizar dados sensiveis.

### Gestor

Pode:

- ver colaboradores sob sua gestao;
- ver marcas sob sua gestao;
- atribuir demandas;
- acompanhar produtividade;
- comentar e orientar entregas.

Nao deve:

- alterar permissoes globais;
- acessar financeiro completo da agencia;
- acessar juridico interno amplo.

### Colaborador

Pode:

- ver suas marcas;
- ver suas demandas;
- atualizar status das proprias demandas;
- enviar arquivos;
- comentar;
- ver seu calendario;
- ver seu perfil.

Nao deve:

- ver financeiro da agencia;
- ver contratos comerciais de clientes;
- ver juridico interno;
- ver dados de outros colaboradores;
- alterar permissoes;
- excluir dados sensiveis.

### Cliente Externo

Futuro portal externo.

Pode:

- ver apenas marcas/projetos liberados;
- aprovar conteudos;
- comentar materiais;
- acompanhar entregas permitidas.

Nao deve:

- ver dados internos da equipe;
- ver financeiro interno;
- ver juridico interno;
- ver produtividade de colaboradores.

## 8. Separacao De Telas

### Aba Colaboradores

Area administrativa interna.

Deve conter futuramente:

- lista de colaboradores;
- filtros por status, cargo e vinculo;
- detalhe do colaborador;
- marcas atribuidas;
- demandas atribuidas;
- disponibilidade;
- arquivos;
- documentos;
- financeiro individual;
- onboarding;
- feedbacks;
- historico.

### Portal Do Colaborador

Area individual do colaborador logado.

Deve conter futuramente:

- meu painel;
- minhas demandas;
- minhas marcas;
- meu calendario;
- arquivos permitidos;
- comentarios;
- minhas entregas;
- meu financeiro, se habilitado;
- meu perfil.

O Portal do Colaborador nao deve reutilizar a visao administrativa inteira. Ele precisa consultar os mesmos dados com filtros e permissoes proprias.

## 9. Ordem Segura De Implementacao

### Fase 3.1 - Cadastro Basico De Colaboradores

Criar estrutura minima de `collaborators`.

Nao migrar Demandas ainda.

### Fase 3.2 - Vinculo Colaborador > Marca

Criar `collaborator_brand_assignments`.

Permitir que admin vincule colaboradores a marcas.

### Fase 3.3 - Preparacao De `demand_assignees`

Criar estrutura futura para multiplos responsaveis por demanda.

Manter `demands.ownerId` funcionando.

### Fase 3.4 - Tela Administrativa De Colaboradores

Criar tela simples para listar, criar, editar e visualizar colaboradores.

Sem financeiro, documentos complexos ou portal ainda.

### Fase 3.5 - Permissoes E RLS

Definir RLS para:

- admin;
- gestor;
- colaborador;
- cliente externo futuro.

Garantir que dados sensiveis nao dependem apenas do frontend para ficarem escondidos.

### Fase 3.6 - Portal Do Colaborador Basico

Criar experiencia individual:

- minhas demandas;
- minhas marcas;
- meu calendario simples;
- meu perfil.

### Fase 3.7 - Financeiro, Documentos, Onboarding E Feedbacks

Adicionar modulos sensiveis apenas depois do nucleo estar validado.

## 10. Riscos

Principais riscos:

- quebrar login ao misturar `profiles` e `collaborators`;
- quebrar Kanban ao migrar Demandas cedo demais;
- expor contratos comerciais para colaborador comum;
- expor financeiro ou juridico interno sem RLS;
- criar tabelas demais antes do nucleo estar validado;
- depender apenas do frontend para seguranca;
- duplicar conceito de pessoa entre `people`, `profiles` e `collaborators`;
- transformar o portal em uma copia da area administrativa.

## Recomendacao

A proxima fase mais segura e criar apenas a migration planejada de `collaborators` e `collaborator_brand_assignments`, sem integrar ao app ainda.

Depois disso, validar manualmente:

- criacao de colaborador;
- colaborador com e sem login;
- vinculo com marca;
- consulta por admin.

Demandas devem permanecer fora dessa primeira etapa.
