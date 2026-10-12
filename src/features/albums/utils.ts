import { z } from "zod";
import type { Album, SpotifyAlbum } from "./types";

export const SPOTIFY_ID_PATTERN = /^[A-Za-z0-9]{22}$/;

export const albumIdSchema = z.object({
	albumId: z.string().regex(SPOTIFY_ID_PATTERN, "Invalid album id"),
});

export function normalizeSpotifyAlbum(album: SpotifyAlbum): Album {
	return {
		id: album.id,
		title: album.name,
		artist: album.artists.map((artist) => artist.name).join(", "),
		releaseDate: album.release_date ?? "",
		image: album.images?.[0]?.url ?? null,
		spotifyUrl: album.external_urls?.spotify ?? null,
	};
}

export function releaseYear(album: Pick<Album, "releaseDate">) {
	return album.releaseDate.slice(0, 4);
}
