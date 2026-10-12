import type { CatalogAlbum } from "#/features/albums/types";
import { normalizeCatalogAlbum } from "#/features/albums/utils";
import { searchCatalogSongs } from "#/features/songs/server/songs.server";
import { catalogGet } from "#/lib/apple-music";
import type { Genre } from "../genres";

export const GENRE_LIMITS = { albums: 24, songs: 20 };

async function searchGenreAlbums(term: string, attribute?: string) {
	const data = await catalogGet<{ results: CatalogAlbum[] }>("/search", {
		term,
		media: "music",
		entity: "album",
		limit: GENRE_LIMITS.albums,
		...(attribute && { attribute }),
	});
	return data.results.map(normalizeCatalogAlbum);
}

// Searches Apple's genre index, falling back to a plain keyword search when
// the index has nothing for the term.
export async function fetchGenre(genre: Genre) {
	let [albums, songs] = await Promise.all([
		searchGenreAlbums(genre.term, "genreIndex"),
		searchCatalogSongs(genre.term, {
			limit: GENRE_LIMITS.songs,
			attribute: "genreIndex",
		}),
	]);
	if (albums.length === 0) albums = await searchGenreAlbums(genre.term);
	if (songs.length === 0) {
		songs = await searchCatalogSongs(genre.term, { limit: GENRE_LIMITS.songs });
	}
	return { albums, songs };
}
