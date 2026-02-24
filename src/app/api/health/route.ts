import { getDb } from "@/db/client";
import { trips } from "@/db/schema";

export async function GET() {

  const db = getDb({
    TURSO_DATABASE_URL: process.env.TURSO_DATABASE_URL!,
    TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN!,
  });

  const result = await db.select().from(trips);

  return Response.json(result);
}