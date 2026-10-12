import { describe, expect, it } from "vitest";
import type { Song } from "./types";
import {
	formatDuration,
	formatTotalDuration,
	groupByDisc,
	isCatalogSong,
	normalizeCatalogSong,
} from "./utils";

function song(id: number, discNumber = 1): Song {
	return normalizeCatalogSong({
		trackId: id,
		trackName: `Track ${id}`,
		artistName: "Artist",
		discNumber,
		trackTimeMillis: 180000,
	});
}

describe("normalizeCatalogSong", () => {
	it("maps an iTunes Search song to the app's song shape", () => {
		expect(
			normalizeCatalogSong({
				wrapperType: "track",
				kind: "song",
				trackId: 1657869393,
				trackName: "Kill Bill",
				artistId: 605800394,
				artistName: "SZA",
				collectionId: 1657869377,
				collectionName: "SOS",
				artworkUrl100:
					"https://is1-ssl.mzstatic.com/image/thumb/Music/v4/ab/cd/source/100x100bb.jpg",
				previewUrl: "https://audio-ssl.itunes.apple.com/preview.m4a",
				trackTimeMillis: 153947,
				trackNumber: 3,
				discNumber: 1,
				trackExplicitness: "explicit",
			}),
		).toMatchObject({
			id: "1657869393",
			title: "Kill Bill",
			artistId: "605800394",
			albumId: "1657869377",
			image: expect.stringContaining("/300x300bb.jpg"),
			previewUrl: "https://audio-ssl.itunes.apple.com/preview.m4a",
			explicit: true,
		});
	});
});

describe("isCatalogSong", () => {
	it("keeps songs and drops albums, artists and videos", () => {
		expect(isCatalogSong({ wrapperType: "track", kind: "song" })).toBe(true);
		expect(isCatalogSong({ wrapperType: "track", kind: "music-video" })).toBe(
			false,
		);
		expect(isCatalogSong({ wrapperType: "collection" })).toBe(false);
	});
});

describe("formatDuration", () => {
	it("formats milliseconds as minutes and seconds", () => {
		expect(formatDuration(215000)).toBe("3:35");
		expect(formatDuration(59000)).toBe("0:59");
		expect(formatDuration(null)).toBe("");
	});

	it("sums a tracklist", () => {
		expect(formatTotalDuration([{ durationMs: 4080000 }])).toBe("1 hr 8 min");
		expect(formatTotalDuration([{ durationMs: 2700000 }])).toBe("45 min");
	});
});

describe("groupByDisc", () => {
	it("keeps a single disc as one tracklist", () => {
		expect(groupByDisc([song(1), song(2)])).toEqual([
			{ label: "Tracklist", songs: [song(1), song(2)] },
		]);
	});

	it("uses one section per disc", () => {
		const discs = groupByDisc([song(1, 1), song(2, 2), song(3, 1)]);
		expect(discs.map((disc) => disc.label)).toEqual(["Disc 1", "Disc 2"]);
	});
});
