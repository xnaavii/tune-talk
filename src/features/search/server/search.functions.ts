import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { toAppleMusicError } from "#/lib/apple-music";
import { searchCatalog } from "./search.server";

export const search = createServerFn({ method: "GET" })
	.validator(z.object({ query: z.string().trim().min(1).max(200) }))
	.handler(async ({ data }) => {
		try {
			return await searchCatalog(data.query);
		} catch (error) {
			throw toAppleMusicError(error, "Failed to get search results");
		}
	});
