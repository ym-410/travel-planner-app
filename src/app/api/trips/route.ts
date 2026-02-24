import { getDb } from "@/db/client";
import { trips } from "@/db/schema";
import { randomUUID } from "crypto";

function getEnv() {
  const url = process.env.TURSO_DATABASE_URL;
  const token = process.env.TURSO_AUTH_TOKEN;
  if (!url || !token) throw new Error("Missing TURSO env vars");
  return { TURSO_DATABASE_URL: url, TURSO_AUTH_TOKEN: token };
}

export async function GET() {
  const db = getDb(getEnv());
  const result = await db.select().from(trips);
  return Response.json(result);
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { title, startDate, endDate } = body as {
    title?: string;
    startDate?: string;
    endDate?: string;
  };

  if (!title || !startDate || !endDate) {
    return Response.json(
      { message: "title, startDate, endDate are required" },
      { status: 400 }
    );
  }

  // 認証は後で入れる。今は固定で疑似ユーザー。
  const userId = "dev-user";

  const now = Date.now();
  const id = randomUUID();

  const db = getDb(getEnv());

  await db.insert(trips).values({
    id,
    userId,
    title,
    startDate,
    endDate,
    status: "planned",
    createdAt: now,
    updatedAt: now,
  });

  return Response.json({ id }, { status: 201 });
}