import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { toAppleMusicError } from "#/lib/apple-music";
import { CHART_CDN_SECONDS, cacheOnCdn } from "#/lib/cdn-cache";
import { chartCountrySchema } from "../countries";
import { fetchTopAlbums, fetchTopSongs } from "./charts.server";

const chartSchema = z.object({ country: chartCountrySchema });

export const getTopAlbums = createServerFn({ method: "GET" })
	.validator(chartSchema)
	.handler(async ({ data }) => {
		try {
			const albums = await fetchTopAlbums(data.country);
			cacheOnCdn(CHART_CDN_SECONDS);
			return albums;
		} catch (error) {
			throw toAppleMusicError(error, "Failed to get the top albums");
		}
	});

export const getTopSongs = createServerFn({ method: "GET" })
	.validator(chartSchema)
	.handler(async ({ data }) => {
		try {
			const songs = await fetchTopSongs(data.country);
			cacheOnCdn(CHART_CDN_SECONDS);
			return songs;
		} catch (error) {
			throw toAppleMusicError(error, "Failed to get the top songs");
		}
	});
