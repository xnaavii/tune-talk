import { describe, expect, it } from "vitest";
import type { Song } from "./types";
import {
	formatDuration,
	formatTotalDuration,
	isCatalogSong,
	normalizeCatalogSong,
	splitIntoSides,
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

describe("splitIntoSides", () => {
	it("splits a single disc into two sides", () => {
		const sides = splitIntoSides([1, 2, 3, 4, 5, 6, 7].map((id) => song(id)));
		expect(sides.map((side) => [side.label, side.songs.length])).toEqual([
			["Side A", 4],
			["Side B", 3],
		]);
	});

	it("keeps short releases on one side", () => {
		expect(splitIntoSides([song(1), song(2)])).toHaveLength(1);
	});

	it("uses one section per disc", () => {
		const sides = splitIntoSides([song(1, 1), song(2, 2), song(3, 1)]);
		expect(sides.map((side) => side.label)).toEqual(["Disc 1", "Disc 2"]);
	});
});
