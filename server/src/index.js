import { createApp } from "./app.js";
import { pool } from "./db.js";

const port = Number(process.env.PORT || 3001);
const app = createApp();

const server = app.listen(port, () => {
  console.log(`SOU Ops backend listening on http://127.0.0.1:${port}`);
});

function shutdown(signal) {
  console.log(`Received ${signal}. Closing SOU Ops backend.`);
  server.close(async () => {
    await pool.end();
    process.exit(0);
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
