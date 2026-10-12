import { z } from "zod";
import type { Album } from "#/features/albums/types";
import { ALBUM_ID_PATTERN, displayTitle } from "#/features/albums/utils";
import type { Artist, CatalogArtist } from "./types";

// Apple Music artist ids are numeric, like album ids.
export const artistIdSchema = z.object({
	artistId: z.string().regex(ALBUM_ID_PATTERN, "Invalid artist id"),
});

export function normalizeCatalogArtist(
	artist: CatalogArtist,
	image: string | null = null,
): Artist {
	return {
		id: String(artist.artistId),
		name: artist.artistName,
		genre: artist.primaryGenreName ?? null,
		image,
		appleMusicUrl: artist.artistLinkUrl ?? null,
	};
}

// The catalog lists clean and explicit versions of a release separately;
// keep the first of each title.
export function uniqueReleases(albums: Album[]) {
	const seen = new Set<string>();
	return albums.filter((album) => {
		const key = displayTitle(album).toLowerCase();
		if (seen.has(key)) return false;
		seen.add(key);
		return true;
	});
}

// Newest release first.
export function byReleaseDate(a: Album, b: Album) {
	return b.releaseDate.localeCompare(a.releaseDate);
}
