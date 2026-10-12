import { describe, expect, it } from "vitest";
import { legacyEntries, normalizeLegacyChartAlbum } from "./legacy";

const entry = {
	"im:name": { label: "After The Storm - EP" },
	"im:image": [
		{
			label: "https://is1-ssl.mzstatic.com/image/thumb/a/cover.jpg/55x55bb.png",
		},
		{
			label:
				"https://is1-ssl.mzstatic.com/image/thumb/a/cover.jpg/170x170bb.png",
		},
	],
	"im:artist": {
		label: "Skillet",
		attributes: {
			href: "https://music.apple.com/us/artist/skillet/1750802?uo=2",
		},
	},
	"im:releaseDate": { label: "2026-10-09T00:00:00-07:00" },
	id: { attributes: { "im:id": "6781817166" } },
	link: {
		attributes: {
			href: "https://music.apple.com/us/album/after-the-storm-ep/6781817166?uo=2",
		},
	},
	category: { attributes: { label: "Rock" } },
};

describe("legacyEntries", () => {
	it("wraps a single entry in an array", () => {
		expect(legacyEntries({ feed: { entry } })).toEqual([entry]);
	});

	it("handles an empty feed", () => {
		expect(legacyEntries({ feed: {} })).toEqual([]);
	});
});

describe("normalizeLegacyChartAlbum", () => {
	it("maps an iTunes chart entry to an album", () => {
		expect(normalizeLegacyChartAlbum(entry)).toEqual({
			id: "6781817166",
			title: "After The Storm - EP",
			artist: "Skillet",
			releaseDate: "2026-10-09",
			image:
				"https://is1-ssl.mzstatic.com/image/thumb/a/cover.jpg/600x600bb.png",
			appleMusicUrl:
				"https://music.apple.com/us/album/after-the-storm-ep/6781817166?uo=2",
			artistId: "1750802",
			genre: "Rock",
		});
	});
});
