import type { Album, CatalogAlbum } from "#/features/albums/types";
import { normalizeCatalogAlbum } from "#/features/albums/utils";
import type { Artist, CatalogArtist } from "#/features/artists/types";
import { normalizeCatalogArtist } from "#/features/artists/utils";
import { searchCatalogSongs } from "#/features/songs/server/songs.server";
import type { Song } from "#/features/songs/types";
import { catalogGet } from "#/lib/apple-music";

export const SEARCH_LIMITS = { albums: 24, songs: 25, artists: 8 };

export interface SearchResults {
	artists: Artist[];
	albums: Album[];
	songs: Song[];
}

// Artists have no artwork in the catalog, so borrow a cover from one of
// their albums or songs in the same results.
export function withArtistImages(
	artists: CatalogArtist[],
	albums: Album[],
	songs: Song[],
): Artist[] {
	const images = new Map<string, string>();
	for (const item of [...albums, ...songs]) {
		if (item.artistId && item.image && !images.has(item.artistId)) {
			images.set(item.artistId, item.image);
		}
	}
	return artists.map((artist) =>
		normalizeCatalogArtist(artist, images.get(String(artist.artistId)) ?? null),
	);
}

// One search fans out to albums, songs and artists in parallel, so every
// tab on the search page reads from the same cached result.
export async function searchCatalog(query: string): Promise<SearchResults> {
	const [albumData, songs, artistData] = await Promise.all([
		catalogGet<{ results: CatalogAlbum[] }>("/search", {
			term: query,
			media: "music",
			entity: "album",
			limit: SEARCH_LIMITS.albums,
		}),
		searchCatalogSongs(query, { limit: SEARCH_LIMITS.songs }),
		catalogGet<{ results: CatalogArtist[] }>("/search", {
			term: query,
			media: "music",
			entity: "musicArtist",
			limit: SEARCH_LIMITS.artists,
		}),
	]);

	const albums = albumData.results.map(normalizeCatalogAlbum);
	return {
		artists: withArtistImages(artistData.results, albums, songs),
		albums,
		songs,
	};
}
