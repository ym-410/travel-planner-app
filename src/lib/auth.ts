import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/db";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "sqlite" }),

  // Email/Password を有効化
  emailAndPassword: {
    enabled: true,
  },

  // Next.js でCookieを扱う
  plugins: [nextCookies()],
});