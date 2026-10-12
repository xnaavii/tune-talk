import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { AppleMusicError } from "#/lib/apple-music";
import { albumIdSchema } from "../utils";
import {
	fetchCatalogAlbum,
	fetchTopAlbums,
	searchCatalogAlbums,
} from "./albums.server";

function toError(error: unknown, fallback: string) {
	return new Error(error instanceof AppleMusicError ? error.message : fallback);
}

export const searchAlbums = createServerFn({ method: "GET" })
	.validator(z.object({ query: z.string().trim().min(1).max(200) }))
	.handler(async ({ data }) => {
		try {
			return await searchCatalogAlbums(data.query);
		} catch (error) {
			throw toError(error, "Failed to get search results");
		}
	});

export const getTopAlbums = createServerFn({ method: "GET" }).handler(
	async () => {
		try {
			return await fetchTopAlbums();
		} catch (error) {
			throw toError(error, "Failed to get the top albums");
		}
	},
);

export const getAlbumDetails = createServerFn({ method: "GET" })
	.validator(albumIdSchema)
	.handler(async ({ data }) => {
		try {
			return await fetchCatalogAlbum(data.albumId);
		} catch (error) {
			if (error instanceof AppleMusicError && error.status === 404) {
				throw notFound();
			}
			throw toError(error, "Failed to get the album details");
		}
	});
