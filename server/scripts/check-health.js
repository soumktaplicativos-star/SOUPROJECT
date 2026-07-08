const API_BASE_URL = process.env.API_BASE_URL || "http://127.0.0.1:3001";

async function fetchJson(path) {
  const response = await fetch(`${API_BASE_URL}${path}`);
  const body = await response.json().catch(() => ({}));

  if (!response.ok || body.ok !== true) {
    throw new Error(`${path} falhou com status ${response.status}`);
  }

  return body;
}

async function main() {
  console.log("SOU Ops API health check");

  const health = await fetchJson("/health");
  console.log(`/health: ok (${health.service || "service"})`);

  const dbHealth = await fetchJson("/health/db");
  console.log(`/health/db: ok (${dbHealth.database} em ${dbHealth.host}:${dbHealth.port})`);

  console.log("API health check concluido com sucesso.");
}

main().catch((error) => {
  console.error("API health check falhou:", error.message);
  process.exit(1);
});
