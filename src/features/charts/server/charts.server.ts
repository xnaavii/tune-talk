import type { ChartAlbum } from "#/features/albums/types";
import { normalizeChartAlbum } from "#/features/albums/utils";
import { lookupSongs } from "#/features/songs/server/songs.server";
import type { ChartSong } from "#/features/songs/types";
import { chartGet, legacyChartGet } from "#/lib/apple-music";
import type { ChartCountry } from "../countries";
import {
	type LegacyChartResponse,
	legacyEntries,
	normalizeLegacyChartAlbum,
} from "../legacy";

export const CHART_LIMIT = 50;

type ChartResponse<T> = { feed: { results: T[] } };

// The Apple Music feeds sometimes time out from the server, so the older
// iTunes Store charts stand in for them.
async function withLegacyFallback<T>(
	primary: () => Promise<T[]>,
	fallback: () => Promise<T[]>,
) {
	try {
		const results = await primary();
		if (results.length > 0) return results;
	} catch (error) {
		console.warn("Apple Music chart failed, using the iTunes chart", error);
	}
	return fallback();
}

export function fetchTopAlbums(country: ChartCountry) {
	return withLegacyFallback(
		async () => {
			const data = await chartGet<ChartResponse<ChartAlbum>>(
				`/music/most-played/${CHART_LIMIT}/albums.json`,
				country,
			);
			return data.feed.results.map(normalizeChartAlbum);
		},
		async () => {
			const data = await legacyChartGet<LegacyChartResponse>(
				`/rss/topalbums/limit=${CHART_LIMIT}/json`,
				country,
			);
			return legacyEntries(data).map(normalizeLegacyChartAlbum);
		},
	);
}

// Chart entries have no preview clip, so the songs are looked up in the
// catalog (one request for the whole chart).
export async function fetchTopSongs(country: ChartCountry) {
	const ids = await withLegacyFallback(
		async () => {
			const data = await chartGet<ChartResponse<ChartSong>>(
				`/music/most-played/${CHART_LIMIT}/songs.json`,
				country,
			);
			return data.feed.results.map((song) => song.id);
		},
		async () => {
			const data = await legacyChartGet<LegacyChartResponse>(
				`/rss/topsongs/limit=${CHART_LIMIT}/json`,
				country,
			);
			return legacyEntries(data).map((entry) => entry.id.attributes["im:id"]);
		},
	);
	return lookupSongs(ids);
}
