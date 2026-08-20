import { db, initDb } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  await initDb();
  const { id } = params;

  const existing = await db.execute({
    sql: "SELECT id, text, completed FROM todos WHERE id = ?",
    args: [id],
  });

  if (existing.rows.length === 0) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  const existingRow = existing.rows[0];
  const body = await request.json();

  // Support partial updates (only text, or only completed): fall back to the
  // existing value for whichever field wasn't sent in the request body
  const text =
    typeof body.text === "string"
      ? body.text.trim()
      : (existingRow?.text as string);

  const completed =
    typeof body.completed === "boolean"
      ? body.completed
      : Boolean(existingRow?.completed);

  if (!text) {
    return NextResponse.json(
      { error: "Todo text is required" },
      { status: 400 }
    );
  }

  await db.execute({
    sql: "UPDATE todos SET text = ?, completed = ? WHERE id = ?",
    args: [text, completed ? 1 : 0, id],
  });

  return NextResponse.json({ id, text, completed });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  await initDb();
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { error: "Todo id is required" },
      { status: 400 }
    );
  }

  const existing = await db.execute({
    sql: "SELECT id FROM todos WHERE id = ?",
    args: [id],
  });

  if (existing.rows.length === 0) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  await db.execute({
    sql: "DELETE FROM todos WHERE id = ?",
    args: [id],
  });

  return NextResponse.json({ success: true });
}