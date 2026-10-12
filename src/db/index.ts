import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { requireEnv } from "#/lib/env";
import * as schema from "./schema.ts";

function createDb() {
	return drizzle({ client: neon(requireEnv("DATABASE_URL")), schema });
}

let instance: ReturnType<typeof createDb> | undefined;

// Connect on first use, so a missing DATABASE_URL only breaks the features
// that need the database instead of crashing the whole server at startup.
export const db = new Proxy({} as ReturnType<typeof createDb>, {
	get(_, property) {
		instance ??= createDb();
		return Reflect.get(instance, property, instance);
	},
});
