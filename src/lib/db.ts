import { createClient } from "@libsql/client";

// This opens (or creates) a local SQLite file called `local.db`
// in your project root. No server, no native build tools.
export const db = createClient({
  url: "file:local.db",
});

// Runs once on first import — creates the table if it doesn't exist yet.
// Safe to call every time the app starts (CREATE TABLE IF NOT EXISTS is idempotent).
export async function initDb() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS todos (
      id TEXT PRIMARY KEY,
      text TEXT NOT NULL,
      completed INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);
}