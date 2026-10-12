import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { AppleMusicError, toAppleMusicError } from "#/lib/apple-music";
import { artistIdSchema } from "../utils";
import { fetchArtist } from "./artists.server";

export const getArtist = createServerFn({ method: "GET" })
	.validator(artistIdSchema)
	.handler(async ({ data }) => {
		try {
			return await fetchArtist(data.artistId);
		} catch (error) {
			if (error instanceof AppleMusicError && error.status === 404) {
				throw notFound();
			}
			throw toAppleMusicError(error, "Failed to get the artist");
		}
	});
