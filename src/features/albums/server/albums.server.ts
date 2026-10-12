import type { CatalogSong } from "#/features/songs/types";
import { isCatalogSong, normalizeCatalogSong } from "#/features/songs/utils";
import { AppleMusicError, catalogGet } from "#/lib/apple-music";
import type { AlbumWithTracks, CatalogAlbum } from "../types";
import { normalizeCatalogAlbum } from "../utils";

type CatalogResponse = { results: CatalogAlbum[] };
type CatalogAlbumWithTracks = {
	results: (CatalogAlbum | CatalogSong)[];
};

function isCatalogAlbum(result: { wrapperType?: string }) {
	return result.wrapperType === "collection";
}

export async function fetchCatalogAlbum(id: string) {
	const data = await catalogGet<CatalogResponse>("/lookup", {
		id,
		entity: "album",
	});
	const album = data.results.find(isCatalogAlbum);
	if (!album) throw new AppleMusicError("Album not found", 404);
	return normalizeCatalogAlbum(album);
}

// One lookup returns the album followed by its songs.
export async function fetchAlbumWithTracks(
	id: string,
): Promise<AlbumWithTracks> {
	const data = await catalogGet<CatalogAlbumWithTracks>("/lookup", {
		id,
		entity: "song",
		limit: 200,
	});
	const album = data.results.find(isCatalogAlbum) as CatalogAlbum | undefined;
	if (!album) throw new AppleMusicError("Album not found", 404);

	const tracks = (data.results.filter(isCatalogSong) as CatalogSong[])
		.map(normalizeCatalogSong)
		.sort(
			(a, b) =>
				(a.discNumber ?? 1) - (b.discNumber ?? 1) ||
				(a.trackNumber ?? 0) - (b.trackNumber ?? 0),
		);

	return {
		...normalizeCatalogAlbum(album),
		trackCount: album.trackCount ?? tracks.length,
		copyright: album.copyright ?? null,
		tracks,
	};
}
