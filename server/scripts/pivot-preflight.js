import fs from "node:fs";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { checkDatabase, pool } from "../src/db.js";

const execFileAsync = promisify(execFile);
const API_BASE_URL = process.env.API_BASE_URL || "http://127.0.0.1:3001";
const SENSITIVE_STATUS_PATTERNS = [
  /^(\?\?|A|AM|M|MM|D|R|C|U|\s*M|\s*D|\s*A)\s+\.env$/,
  /backups\//,
  /\.dump$/,
  /\.sql\.dump$/,
  /\.backup$/,
];

async function git(args) {
  return execFileAsync("git", args, { cwd: new URL("../..", import.meta.url) });
}

async function checkGitStatus() {
  const { stdout } = await git(["status", "--short"]);
  const status = stdout.trim();

  if (status) {
    console.log(`Git tem alteracoes pendentes:\n${status}`);
    return;
  }

  console.log("Git limpo.");
}

async function requireIgnored(path) {
  try {
    await git(["check-ignore", "-q", path]);
    console.log(`${path} esta ignorado pelo Git.`);
  } catch {
    throw new Error(`${path} nao esta ignorado pelo Git.`);
  }
}

async function requireNoSensitiveFilesInStatus() {
  const { stdout } = await git(["status", "--short"]);
  const lines = stdout.split("\n").filter(Boolean);
  const sensitiveLine = lines.find((line) =>
    SENSITIVE_STATUS_PATTERNS.some((pattern) => pattern.test(line.trim()))
  );

  if (sensitiveLine) {
    throw new Error(`Arquivo sensivel apareceu no Git status: ${sensitiveLine}`);
  }

  console.log("Nenhum .env, backup ou dump apareceu no Git status.");
}

async function checkOptionalApi() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    const body = await response.json().catch(() => ({}));

    if (response.ok && body.ok === true) {
      console.log(`Backend respondeu em ${API_BASE_URL}.`);
      return;
    }

    console.log(`Backend respondeu, mas /health nao retornou ok em ${API_BASE_URL}.`);
  } catch {
    console.log(`Backend nao parece estar rodando em ${API_BASE_URL}; preflight segue sem iniciar servidor.`);
  }
}

async function main() {
  console.log("SOU Ops pivot preflight");
  console.log("Modo: somente leitura");

  await checkGitStatus();

  if (!fs.existsSync(new URL("../../.env", import.meta.url))) {
    throw new Error(".env nao encontrado na raiz do projeto.");
  }

  console.log(".env existe; conteudo nao foi exibido.");
  await requireIgnored(".env");
  await requireIgnored("backups/");
  await requireNoSensitiveFilesInStatus();

  const database = await checkDatabase();
  console.log(`PostgreSQL local respondeu: ${database.database}.`);

  await checkOptionalApi();

  console.log("Pivot preflight concluido com sucesso.");
}

main().catch(async (error) => {
  console.error("Pivot preflight falhou:", error.message);
  await pool.end().catch(() => {});
  process.exit(1);
}).finally(async () => {
  await pool.end().catch(() => {});
});
