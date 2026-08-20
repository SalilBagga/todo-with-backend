import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { db, initDb } from "@/lib/db";
// import { db, initDb } from "@/lib/db";

// GET /api/todos — return all todos
export async function GET() {
  await initDb();

  const result = await db.execute("SELECT * FROM todos ORDER BY created_at DESC");

  // SQLite stores booleans as 0/1, so we convert `completed` back to a real boolean
  const todos = result.rows.map((row) => ({
    id: row.id,
    text: row.text,
    completed: Boolean(row.completed),
  }));

  return NextResponse.json(todos);
}

// POST /api/todos — create a new todo
// Expects JSON body: { text: string }
export async function POST(request: NextRequest) {
  await initDb();

  const body = await request.json();
  const text = typeof body.text === "string" ? body.text.trim() : "";

  if (!text) {
    return NextResponse.json(
      { error: "Todo text is required" },
      { status: 400 }
    );
  }

  const id = randomUUID();

  await db.execute({
    sql: "INSERT INTO todos (id, text, completed) VALUES (?, ?, 0)",
    args: [id, text],
  });

  return NextResponse.json({ id, text, completed: false }, { status: 201 });
}
