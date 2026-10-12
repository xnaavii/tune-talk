import { spotifyGet } from "#/lib/spotify";
import type { SpotifyAlbum } from "../types";
import { normalizeSpotifyAlbum } from "../utils";

// Spotify caps search `limit` at 10 for Development Mode apps.
export const SEARCH_LIMIT = 10;

type SearchResponse = { albums: { items: (SpotifyAlbum | null)[] } };

export async function searchSpotifyAlbums(query: string, offset = 0) {
	const data = await spotifyGet<SearchResponse>("/search", {
		q: query,
		type: "album",
		limit: SEARCH_LIMIT,
		offset,
	});
	return data.albums.items
		.filter((item): item is SpotifyAlbum => item !== null)
		.map(normalizeSpotifyAlbum);
}

export async function fetchSpotifyAlbum(id: string) {
	return normalizeSpotifyAlbum(await spotifyGet<SpotifyAlbum>(`/albums/${id}`));
}
