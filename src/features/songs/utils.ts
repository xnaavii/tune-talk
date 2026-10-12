import { artworkUrl } from "#/features/albums/utils";
import type { CatalogSong, Song } from "./types";

export function normalizeCatalogSong(song: CatalogSong): Song {
	return {
		id: String(song.trackId),
		title: song.trackName,
		artist: song.artistName,
		artistId: song.artistId ? String(song.artistId) : null,
		albumId: song.collectionId ? String(song.collectionId) : null,
		albumTitle: song.collectionName ?? "",
		image: artworkUrl(song.artworkUrl100, 300),
		previewUrl: song.previewUrl ?? null,
		durationMs: song.trackTimeMillis ?? null,
		trackNumber: song.trackNumber ?? null,
		discNumber: song.discNumber ?? null,
		explicit: song.trackExplicitness === "explicit",
		appleMusicUrl: song.trackViewUrl ?? null,
	};
}

// Search and lookup results mix songs with music videos and the parent
// album or artist; keep only songs.
export function isCatalogSong(result: { wrapperType?: string; kind?: string }) {
	return result.wrapperType === "track" && result.kind === "song";
}

// 215000 -> "3:35"
export function formatDuration(ms: number | null) {
	if (ms === null) return "";
	const totalSeconds = Math.round(ms / 1000);
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;
	return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

// 4080000 -> "1 hr 8 min", 2700000 -> "45 min"
export function formatTotalDuration(songs: Pick<Song, "durationMs">[]) {
	const totalMinutes = Math.round(
		songs.reduce((sum, song) => sum + (song.durationMs ?? 0), 0) / 60000,
	);
	const hours = Math.floor(totalMinutes / 60);
	const minutes = totalMinutes % 60;
	return hours > 0 ? `${hours} hr ${minutes} min` : `${minutes} min`;
}

export interface TrackSide {
	label: string;
	songs: Song[];
}

// Splits a tracklist the way a record would: one section per disc for
// multi-disc releases, otherwise Side A and Side B.
export function splitIntoSides(songs: Song[]): TrackSide[] {
	const discs = Map.groupBy(songs, (song) => song.discNumber ?? 1);
	if (discs.size > 1) {
		return [...discs.entries()]
			.sort(([a], [b]) => a - b)
			.map(([disc, discSongs]) => ({
				label: `Disc ${disc}`,
				songs: discSongs,
			}));
	}
	if (songs.length < 6) return [{ label: "Side A", songs }];

	const half = Math.ceil(songs.length / 2);
	return [
		{ label: "Side A", songs: songs.slice(0, half) },
		{ label: "Side B", songs: songs.slice(half) },
	];
}
