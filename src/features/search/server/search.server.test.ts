import { describe, expect, it } from "vitest";
import type { Album } from "#/features/albums/types";
import { withArtistImages } from "./search.server";

const album = (artistId: string, image: string): Album => ({
	id: "1",
	title: "Album",
	artist: "Artist",
	releaseDate: "2024-01-01",
	image,
	appleMusicUrl: null,
	artistId,
});

describe("withArtistImages", () => {
	it("borrows the first cover by each artist from the other results", () => {
		const artists = withArtistImages(
			[
				{ artistId: 1, artistName: "SZA" },
				{ artistId: 2, artistName: "No covers" },
			],
			[album("1", "first.jpg"), album("1", "second.jpg")],
			[],
		);
		expect(artists.map((artist) => artist.image)).toEqual(["first.jpg", null]);
	});
});
