import type { CatalogAlbum } from "#/features/albums/types";
import { isSingleOrEp, normalizeCatalogAlbum } from "#/features/albums/utils";
import type { CatalogSong } from "#/features/songs/types";
import { isCatalogSong, normalizeCatalogSong } from "#/features/songs/utils";
import { AppleMusicError, catalogGet } from "#/lib/apple-music";
import type { ArtistWithMusic, CatalogArtist } from "../types";
import {
	byReleaseDate,
	normalizeCatalogArtist,
	uniqueReleases,
} from "../utils";

export const TOP_SONGS_LIMIT = 10;

type LookupResponse<T> = { results: (CatalogArtist | T)[] };

function isArtist(result: { wrapperType?: string }): result is CatalogArtist {
	return result.wrapperType === "artist";
}

// Two lookups: the artist with their releases, and their top songs.
export async function fetchArtist(id: string): Promise<ArtistWithMusic> {
	const [releases, songs] = await Promise.all([
		catalogGet<LookupResponse<CatalogAlbum>>("/lookup", {
			id,
			entity: "album",
			limit: 100,
		}),
		catalogGet<LookupResponse<CatalogSong>>("/lookup", {
			id,
			entity: "song",
			limit: TOP_SONGS_LIMIT * 2,
		}),
	]);

	const artist = releases.results.find(isArtist);
	if (!artist) throw new AppleMusicError("Artist not found", 404);

	// Lookups list releases roughly by popularity, so the first cover is the
	// most recognisable one to stand in for an artist photo.
	const allReleases = uniqueReleases(
		releases.results
			.filter((result) => result.wrapperType === "collection")
			.map((album) => normalizeCatalogAlbum(album as CatalogAlbum)),
	);

	const seenSongs = new Set<string>();
	const topSongs = (songs.results.filter(isCatalogSong) as CatalogSong[])
		.map(normalizeCatalogSong)
		.filter((song) => {
			const key = song.title.toLowerCase();
			if (seenSongs.has(key)) return false;
			seenSongs.add(key);
			return true;
		})
		.slice(0, TOP_SONGS_LIMIT);

	return {
		...normalizeCatalogArtist(artist, allReleases[0]?.image ?? null),
		albums: allReleases
			.filter((album) => !isSingleOrEp(album))
			.sort(byReleaseDate),
		singles: allReleases.filter(isSingleOrEp).sort(byReleaseDate),
		topSongs,
	};
}
