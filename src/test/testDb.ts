import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import { migrate } from "drizzle-orm/pglite/migrator";
import * as schema from "#/db/schema";

// In-memory Postgres with the real migrations applied, for server tests.
export async function createTestDb() {
	const db = drizzle({ client: new PGlite(), schema });
	await migrate(db, { migrationsFolder: "./drizzle" });
	return db;
}
