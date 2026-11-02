import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { toAppleMusicError } from "#/lib/apple-music";
import { CATALOG_CDN_SECONDS, cacheOnCdn } from "#/lib/cdn-cache";
import { searchCatalog } from "./search.server";

export const search = createServerFn({ method: "GET" })
	.validator(z.object({ query: z.string().trim().min(1).max(200) }))
	.handler(async ({ data }) => {
		try {
			const results = await searchCatalog(data.query);
			cacheOnCdn(CATALOG_CDN_SECONDS);
			return results;
		} catch (error) {
			throw toAppleMusicError(error, "Failed to get search results");
		}
	});
