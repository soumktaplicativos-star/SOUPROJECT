import { pool } from "../src/db.js";

const AUTH_TABLES = ["public.profiles", "public.app_users", "public.app_sessions"];

async function countTable(client, tableName) {
  const exists = await client.query("select to_regclass($1) as table_name", [tableName]);

  if (!exists.rows[0]?.table_name) {
    throw new Error(`Tabela ausente: ${tableName}`);
  }

  const result = await client.query(`select count(*)::int as rows from ${tableName}`);
  return result.rows[0].rows;
}

async function main() {
  const client = await pool.connect();

  try {
    console.log("SOU Ops Auth check");
    console.log("Modo: somente leitura");

    for (const tableName of AUTH_TABLES) {
      const rows = await countTable(client, tableName);
      console.log(`${tableName}: ${rows}`);
    }

    console.log("Auth check concluido com sucesso.");
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch(async (error) => {
  console.error("Auth check falhou:", error.message);
  await pool.end().catch(() => {});
  process.exit(1);
});
