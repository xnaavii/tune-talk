import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { AppleMusicError, toAppleMusicError } from "#/lib/apple-music";
import { CATALOG_CDN_SECONDS, cacheOnCdn } from "#/lib/cdn-cache";
import { albumIdSchema } from "../utils";
import { fetchAlbumWithTracks } from "./albums.server";

export const getAlbumDetails = createServerFn({ method: "GET" })
	.validator(albumIdSchema)
	.handler(async ({ data }) => {
		try {
			const album = await fetchAlbumWithTracks(data.albumId);
			cacheOnCdn(CATALOG_CDN_SECONDS);
			return album;
		} catch (error) {
			if (error instanceof AppleMusicError && error.status === 404) {
				throw notFound();
			}
			throw toAppleMusicError(error, "Failed to get the album details");
		}
	});
