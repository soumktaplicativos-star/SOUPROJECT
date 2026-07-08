# SOU Ops Backend

Backend local da SOU Ops para substituir gradualmente o acesso direto ao Supabase por uma API própria conectada ao PostgreSQL local.

## Requisitos

- Docker Compose com o PostgreSQL local rodando.
- Arquivo `.env` na raiz do projeto com as variáveis `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD` e `POSTGRES_PORT`.

## Instalação

```bash
cd server
npm install
```

## Rodar em desenvolvimento

```bash
npm run dev
```

Servidor padrão:

```text
http://127.0.0.1:3001
```

## Health checks

```bash
curl http://127.0.0.1:3001/health
curl http://127.0.0.1:3001/health/db
```

## Scripts de validacao do pivot

Todos os scripts abaixo sao somente leitura. Eles nao executam migrations, nao criam usuarios, nao alteram tabelas e nao removem dados.

```bash
npm run check
npm run db:check
npm run auth:check
npm run api:health
npm run pivot:preflight
npm run pivot:validate
```

### `npm run check`

Valida a sintaxe dos arquivos do backend e dos scripts de automacao.

### `npm run db:check`

Conecta ao PostgreSQL local e confirma a existencia das principais tabelas do pivot. Mostra apenas contagens por tabela, sem exibir dados sensiveis.

### `npm run auth:check`

Confirma a estrutura minima de Auth local:

- `public.profiles`
- `public.app_users`
- `public.app_sessions`

Mostra apenas contagens. Nao exibe e-mails, hashes, tokens ou senhas.

### `npm run api:health`

Testa os endpoints:

- `GET /health`
- `GET /health/db`

O backend precisa estar rodando antes deste script.

### `npm run pivot:preflight`

Executa checagens de seguranca antes de uma fase do pivot:

- verifica o estado do Git;
- confirma que `.env` existe sem imprimir seu conteudo;
- confirma que `.env` esta ignorado pelo Git;
- confirma que backups e dumps nao apareceram no Git;
- confirma que o PostgreSQL local responde;
- verifica o backend se ele ja estiver rodando, sem inicia-lo automaticamente.

### `npm run pivot:validate`

Roda as validacoes seguras em sequencia e para no primeiro erro. Ele e um semaforo de seguranca, nao uma migracao automatica.

## Cuidados obrigatorios

- Nunca commitar `.env`.
- Nunca commitar `backups/`, `*.dump`, `*.sql.dump` ou `*.backup`.
- Nunca usar `docker compose down -v` neste projeto sem backup e confirmacao explicita.
- Nunca imprimir senha, hash ou token em logs.
- Scripts de validacao nao substituem revisao manual antes de migrations ou bootstrap.

Esta fase não implementa autenticação, CRUD, migrations nem integração com o frontend.
