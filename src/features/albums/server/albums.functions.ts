import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { SpotifyError } from "#/lib/spotify";
import { albumIdSchema } from "../utils";
import {
	fetchSpotifyAlbum,
	SEARCH_LIMIT,
	searchSpotifyAlbums,
} from "./albums.server";

const NEW_RELEASE_PAGES = 3;

function toError(error: unknown, fallback: string) {
	return new Error(error instanceof SpotifyError ? error.message : fallback);
}

export const searchAlbums = createServerFn({ method: "GET" })
	.validator(z.object({ query: z.string().trim().min(1).max(200) }))
	.handler(async ({ data }) => {
		try {
			return await searchSpotifyAlbums(data.query);
		} catch (error) {
			throw toError(error, "Failed to get search results");
		}
	});

// Spotify removed /browse/new-releases for Development Mode apps, so new
// releases come from the `tag:new` search filter (released in the past two weeks).
export const getNewReleases = createServerFn({ method: "GET" }).handler(
	async () => {
		try {
			const pages = await Promise.all(
				Array.from({ length: NEW_RELEASE_PAGES }, (_, page) =>
					searchSpotifyAlbums("tag:new", page * SEARCH_LIMIT),
				),
			);
			const unique = new Map(pages.flat().map((album) => [album.id, album]));
			return [...unique.values()].sort((a, b) =>
				b.releaseDate.localeCompare(a.releaseDate),
			);
		} catch (error) {
			throw toError(error, "Failed to get new releases");
		}
	},
);

export const getAlbumDetails = createServerFn({ method: "GET" })
	.validator(albumIdSchema)
	.handler(async ({ data }) => {
		try {
			return await fetchSpotifyAlbum(data.albumId);
		} catch (error) {
			throw toError(error, "Failed to get the album details");
		}
	});
