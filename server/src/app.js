import express from "express";
import { checkDatabase, dbConfig } from "./db.js";

export function createApp() {
  const app = express();

  app.disable("x-powered-by");
  app.use(express.json());

  app.get("/health", (_request, response) => {
    response.json({
      ok: true,
      service: "sou-ops-server",
      timestamp: new Date().toISOString(),
    });
  });

  app.get("/health/db", async (_request, response) => {
    try {
      const database = await checkDatabase();
      response.json({
        ok: true,
        database: database.database,
        host: dbConfig.host,
        port: dbConfig.port,
        timestamp: database.timestamp,
      });
    } catch (error) {
      response.status(503).json({
        ok: false,
        error: "database_unavailable",
        message: error.message,
        timestamp: new Date().toISOString(),
      });
    }
  });

  return app;
}
