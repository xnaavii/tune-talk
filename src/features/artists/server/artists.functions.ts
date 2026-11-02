import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { AppleMusicError, toAppleMusicError } from "#/lib/apple-music";
import { CATALOG_CDN_SECONDS, cacheOnCdn } from "#/lib/cdn-cache";
import { artistIdSchema } from "../utils";
import { fetchArtist } from "./artists.server";

export const getArtist = createServerFn({ method: "GET" })
	.validator(artistIdSchema)
	.handler(async ({ data }) => {
		try {
			const artist = await fetchArtist(data.artistId);
			cacheOnCdn(CATALOG_CDN_SECONDS);
			return artist;
		} catch (error) {
			if (error instanceof AppleMusicError && error.status === 404) {
				throw notFound();
			}
			throw toAppleMusicError(error, "Failed to get the artist");
		}
	});
