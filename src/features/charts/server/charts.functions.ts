import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { toAppleMusicError } from "#/lib/apple-music";
import { chartCountrySchema } from "../countries";
import { fetchTopAlbums, fetchTopSongs } from "./charts.server";

const chartSchema = z.object({ country: chartCountrySchema });

export const getTopAlbums = createServerFn({ method: "GET" })
	.validator(chartSchema)
	.handler(async ({ data }) => {
		try {
			return await fetchTopAlbums(data.country);
		} catch (error) {
			throw toAppleMusicError(error, "Failed to get the top albums");
		}
	});

export const getTopSongs = createServerFn({ method: "GET" })
	.validator(chartSchema)
	.handler(async ({ data }) => {
		try {
			return await fetchTopSongs(data.country);
		} catch (error) {
			throw toAppleMusicError(error, "Failed to get the top songs");
		}
	});
