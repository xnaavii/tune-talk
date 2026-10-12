import type { ChartAlbum } from "#/features/albums/types";
import { normalizeChartAlbum } from "#/features/albums/utils";
import { lookupSongs } from "#/features/songs/server/songs.server";
import type { ChartSong } from "#/features/songs/types";
import { chartGet } from "#/lib/apple-music";
import type { ChartCountry } from "../countries";

export const CHART_LIMIT = 50;

type ChartResponse<T> = { feed: { results: T[] } };

export async function fetchTopAlbums(country: ChartCountry) {
	const data = await chartGet<ChartResponse<ChartAlbum>>(
		`/music/most-played/${CHART_LIMIT}/albums.json`,
		country,
	);
	return data.feed.results.map(normalizeChartAlbum);
}

// Chart entries have no preview clip, so the songs are looked up in the
// catalog (one request for the whole chart).
export async function fetchTopSongs(country: ChartCountry) {
	const data = await chartGet<ChartResponse<ChartSong>>(
		`/music/most-played/${CHART_LIMIT}/songs.json`,
		country,
	);
	return lookupSongs(data.feed.results.map((song) => song.id));
}
