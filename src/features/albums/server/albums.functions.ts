import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { AppleMusicError, toAppleMusicError } from "#/lib/apple-music";
import { albumIdSchema } from "../utils";
import { fetchAlbumWithTracks } from "./albums.server";

export const getAlbumDetails = createServerFn({ method: "GET" })
	.validator(albumIdSchema)
	.handler(async ({ data }) => {
		try {
			return await fetchAlbumWithTracks(data.albumId);
		} catch (error) {
			if (error instanceof AppleMusicError && error.status === 404) {
				throw notFound();
			}
			throw toAppleMusicError(error, "Failed to get the album details");
		}
	});
