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

Esta fase não implementa autenticação, CRUD, migrations nem integração com o frontend.
