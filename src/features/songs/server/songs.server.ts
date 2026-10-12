import { catalogGet } from "#/lib/apple-music";
import type { CatalogSong } from "../types";
import { isCatalogSong, normalizeCatalogSong } from "../utils";

type CatalogResponse = { results: CatalogSong[] };

// Looks up many songs in one request, keeping the order of `ids`.
export async function lookupSongs(ids: string[]) {
	if (ids.length === 0) return [];
	const data = await catalogGet<CatalogResponse>("/lookup", {
		id: ids.join(","),
	});
	const songs = new Map(
		data.results
			.filter(isCatalogSong)
			.map((song) => [String(song.trackId), normalizeCatalogSong(song)]),
	);
	return ids.flatMap((id) => songs.get(id) ?? []);
}

export async function searchCatalogSongs(
	term: string,
	{ limit, attribute }: { limit: number; attribute?: string },
) {
	const data = await catalogGet<CatalogResponse>("/search", {
		term,
		media: "music",
		entity: "song",
		limit,
		...(attribute && { attribute }),
	});
	return data.results.filter(isCatalogSong).map(normalizeCatalogSong);
}
