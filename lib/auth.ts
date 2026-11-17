import "server-only";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { pool } from "@/lib/db";

export const auth = betterAuth({
  database: pool,
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: ["https://*.vercel.app"],
  emailAndPassword: { enabled: true, minPasswordLength: 8 },
  user: { changeEmail: { enabled: true } },
  plugins: [nextCookies()],
});
