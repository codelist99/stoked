import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { pool } from "@/lib/db";
import { stages } from "@/lib/stages";

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  if (!Array.isArray(body.selections) || body.selections.length !== stages.length) return NextResponse.json({ error: "Invalid assessment" }, { status: 400 });
  const selections = body.selections.map((items: unknown, stageIndex: number) => Array.isArray(items) ? [...new Set(items.filter((n): n is number => Number.isInteger(n) && n >= 0 && n < stages[stageIndex].feelings.length))] : []);
  const counts = selections.map((items: number[]) => items.length);
  const total = counts.reduce((sum: number, count: number) => sum + count, 0);
  if (!total) return NextResponse.json({ error: "Select at least one signal" }, { status: 400 });
  let stageIndex = 0; counts.forEach((count: number, i: number) => { if (count) stageIndex = i; });
  const { rows } = await pool.query("INSERT INTO assessments (user_id, stage_index, stage_letter, counts, selections, total_signals) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id", [session.user.id, stageIndex, stages[stageIndex].letter, JSON.stringify(counts), JSON.stringify(selections), total]);
  return NextResponse.json({ id: rows[0].id, stageIndex, counts, total });
}
