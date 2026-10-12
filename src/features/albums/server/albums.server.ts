import { AppleMusicError, catalogGet, chartGet } from "#/lib/apple-music";
import type { CatalogAlbum, ChartAlbum } from "../types";
import { normalizeCatalogAlbum, normalizeChartAlbum } from "../utils";

export const SEARCH_LIMIT = 24;
export const CHART_LIMIT = 50;

type CatalogResponse = { results: CatalogAlbum[] };
type ChartResponse = { feed: { results: ChartAlbum[] } };

export async function searchCatalogAlbums(query: string) {
	const data = await catalogGet<CatalogResponse>("/search", {
		term: query,
		media: "music",
		entity: "album",
		limit: SEARCH_LIMIT,
	});
	return data.results.map(normalizeCatalogAlbum);
}

export async function fetchCatalogAlbum(id: string) {
	const data = await catalogGet<CatalogResponse>("/lookup", {
		id,
		entity: "album",
	});
	const album = data.results.find(
		(result) => result.wrapperType === "collection",
	);
	if (!album) throw new AppleMusicError("Album not found", 404);
	return normalizeCatalogAlbum(album);
}

export async function fetchTopAlbums() {
	const data = await chartGet<ChartResponse>(
		`/music/most-played/${CHART_LIMIT}/albums.json`,
	);
	return data.feed.results.map(normalizeChartAlbum);
}
