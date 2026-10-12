import { z } from "zod";
import type { Album, CatalogAlbum, ChartAlbum } from "./types";

// Apple Music album ids are numeric.
export const ALBUM_ID_PATTERN = /^\d{1,15}$/;

export const albumIdSchema = z.object({
	albumId: z.string().regex(ALBUM_ID_PATTERN, "Invalid album id"),
});

// Apple serves artwork at any size; swap the 100px thumbnail for a larger one.
export function artworkUrl(url: string | undefined, size = 600) {
	return url ? url.replace(/\/\d+x\d+bb\./, `/${size}x${size}bb.`) : null;
}

export function normalizeCatalogAlbum(album: CatalogAlbum): Album {
	return {
		id: String(album.collectionId),
		title: album.collectionName,
		artist: album.artistName,
		releaseDate: album.releaseDate?.slice(0, 10) ?? "",
		image: artworkUrl(album.artworkUrl100),
		appleMusicUrl: album.collectionViewUrl ?? null,
		artistId: album.artistId ? String(album.artistId) : undefined,
		genre: album.primaryGenreName,
	};
}

export function normalizeChartAlbum(album: ChartAlbum): Album {
	return {
		id: album.id,
		title: album.name,
		artist: album.artistName,
		releaseDate: album.releaseDate?.slice(0, 10) ?? "",
		image: artworkUrl(album.artworkUrl100),
		appleMusicUrl: album.url ?? null,
		artistId: album.artistId,
		// "Music" is a catch-all genre every chart entry carries.
		genre: album.genres?.find((genre) => genre.name !== "Music")?.name,
	};
}

export function releaseYear(album: Pick<Album, "releaseDate">) {
	return album.releaseDate.slice(0, 4);
}

// iTunes marks singles and EPs only in the title, e.g. "Espresso - Single".
const SINGLE_SUFFIX = / - (Single|EP)$/;

export function isSingleOrEp(album: Pick<Album, "title">) {
	return SINGLE_SUFFIX.test(album.title);
}

export function displayTitle(album: Pick<Album, "title">) {
	return album.title.replace(SINGLE_SUFFIX, "");
}
