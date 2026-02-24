import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

export function getDb(env: { TURSO_DATABASE_URL: string; TURSO_AUTH_TOKEN: string }) {
  const client = createClient({
    url: env.TURSO_DATABASE_URL,
    authToken: env.TURSO_AUTH_TOKEN,
  });
  return drizzle(client);
}