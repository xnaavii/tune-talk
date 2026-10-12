import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { db } from "#/db";
import { requireEnv } from "./env";

function createAuth() {
	return betterAuth({
		secret: requireEnv("BETTER_AUTH_SECRET"),
		emailAndPassword: {
			enabled: true,
		},
		// Keep a signed copy of the session in a cookie for a few minutes, so
		// most page loads skip the database round trip to check who's signed in.
		session: {
			cookieCache: { enabled: true, maxAge: 60 * 5 },
		},
		database: drizzleAdapter(db, {
			provider: "pg",
		}),
		plugins: [tanstackStartCookies()],
	});
}

let instance: ReturnType<typeof createAuth> | undefined;

// Created on first use so missing auth env vars surface as a clear error on
// auth requests rather than crashing the server at startup.
export function getAuth() {
	instance ??= createAuth();
	return instance;
}
