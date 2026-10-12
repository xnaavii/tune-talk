import { describe, expect, it } from "vitest";
import { albumIdSchema, normalizeSpotifyAlbum, releaseYear } from "./utils";

describe("normalizeSpotifyAlbum", () => {
	it("maps a Spotify album to the app's album shape", () => {
		expect(
			normalizeSpotifyAlbum({
				id: "0JGOiO34nwfUdDrD612dOp",
				name: "SOS",
				artists: [{ name: "SZA" }, { name: "Travis Scott" }],
				release_date: "2022-12-09",
				images: [{ url: "https://i.scdn.co/large" }, { url: "small" }],
				external_urls: { spotify: "https://open.spotify.com/album/x" },
			}),
		).toEqual({
			id: "0JGOiO34nwfUdDrD612dOp",
			title: "SOS",
			artist: "SZA, Travis Scott",
			releaseDate: "2022-12-09",
			image: "https://i.scdn.co/large",
			spotifyUrl: "https://open.spotify.com/album/x",
		});
	});

	it("handles albums without artwork or a release date", () => {
		const album = normalizeSpotifyAlbum({
			id: "0JGOiO34nwfUdDrD612dOp",
			name: "Untitled",
			artists: [{ name: "Someone" }],
		});
		expect(album.image).toBeNull();
		expect(album.releaseDate).toBe("");
		expect(releaseYear(album)).toBe("");
	});
});

describe("albumIdSchema", () => {
	it("accepts Spotify ids and rejects anything else", () => {
		expect(
			albumIdSchema.safeParse({ albumId: "0JGOiO34nwfUdDrD612dOp" }).success,
		).toBe(true);
		expect(albumIdSchema.safeParse({ albumId: "../me" }).success).toBe(false);
	});
});
