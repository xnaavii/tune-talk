import { describe, expect, it } from "vitest";
import {
	albumIdSchema,
	artworkUrl,
	normalizeCatalogAlbum,
	normalizeChartAlbum,
	releaseYear,
} from "./utils";

const thumbnail =
	"https://is1-ssl.mzstatic.com/image/thumb/Music/v4/ab/cd/source/100x100bb.jpg";
const large =
	"https://is1-ssl.mzstatic.com/image/thumb/Music/v4/ab/cd/source/600x600bb.jpg";

describe("normalizeCatalogAlbum", () => {
	it("maps an iTunes Search album to the app's album shape", () => {
		expect(
			normalizeCatalogAlbum({
				wrapperType: "collection",
				collectionId: 1657869377,
				collectionName: "SOS",
				artistName: "SZA",
				releaseDate: "2022-12-09T08:00:00Z",
				artworkUrl100: thumbnail,
				collectionViewUrl: "https://music.apple.com/us/album/sos/1657869377",
			}),
		).toEqual({
			id: "1657869377",
			title: "SOS",
			artist: "SZA",
			releaseDate: "2022-12-09",
			image: large,
			appleMusicUrl: "https://music.apple.com/us/album/sos/1657869377",
		});
	});

	it("handles albums without artwork or a release date", () => {
		const album = normalizeCatalogAlbum({
			collectionId: 1,
			collectionName: "Untitled",
			artistName: "Someone",
		});
		expect(album.image).toBeNull();
		expect(album.appleMusicUrl).toBeNull();
		expect(releaseYear(album)).toBe("");
	});
});

describe("normalizeChartAlbum", () => {
	it("maps an Apple Music chart entry to the app's album shape", () => {
		expect(
			normalizeChartAlbum({
				id: "1657869377",
				name: "SOS",
				artistName: "SZA",
				releaseDate: "2022-12-09",
				artworkUrl100: thumbnail,
				url: "https://music.apple.com/us/album/sos/1657869377",
			}),
		).toMatchObject({ id: "1657869377", title: "SOS", image: large });
	});
});

describe("artworkUrl", () => {
	it("requests artwork at the given size", () => {
		expect(artworkUrl(thumbnail, 300)).toContain("/300x300bb.jpg");
		expect(artworkUrl(undefined)).toBeNull();
	});
});

describe("albumIdSchema", () => {
	it("accepts Apple Music ids and rejects anything else", () => {
		expect(albumIdSchema.safeParse({ albumId: "1657869377" }).success).toBe(
			true,
		);
		expect(albumIdSchema.safeParse({ albumId: "../me" }).success).toBe(false);
		expect(
			albumIdSchema.safeParse({ albumId: "0JGOiO34nwfUdDrD612dOp" }).success,
		).toBe(false);
	});
});
