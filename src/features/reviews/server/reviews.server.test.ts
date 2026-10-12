import { beforeEach, describe, expect, it, vi } from "vitest";
import { album, user } from "#/db/schema";
import { createTestDb } from "#/test/testDb";

const testDb = vi.hoisted(() => ({ current: null as unknown }));
vi.mock("#/db", () => ({
	get db() {
		return testDb.current;
	},
}));

const fetchCatalogAlbum = vi.hoisted(() => vi.fn());
vi.mock("#/features/albums/server/albums.server", () => ({
	fetchCatalogAlbum,
}));

const {
	deleteUserReview,
	findOrCreateAlbum,
	selectAlbumReviews,
	selectPopularAlbums,
	selectUserReviews,
	upsertReview,
} = await import("./reviews.server");

const albumRow = (id: string, title: string) => ({
	id,
	title,
	artist: "Artist",
	releaseDate: "2024-01-01",
	image: null,
	appleMusicUrl: null,
});
const ALBUM_A = albumRow("1001", "Album A");
const ALBUM_B = albumRow("1002", "Album B");

beforeEach(async () => {
	const db = await createTestDb();
	testDb.current = db;
	fetchCatalogAlbum.mockReset();
	await db.insert(user).values([
		{ id: "u1", name: "Ivan", email: "ivan@example.com" },
		{ id: "u2", name: "Sam", email: "sam@example.com" },
	]);
	await db.insert(album).values([ALBUM_A, ALBUM_B]);
});

describe("findOrCreateAlbum", () => {
	it("returns a stored album without calling Apple Music", async () => {
		expect(await findOrCreateAlbum(ALBUM_A.id)).toMatchObject(ALBUM_A);
		expect(fetchCatalogAlbum).not.toHaveBeenCalled();
	});

	it("snapshots a new album from Apple Music", async () => {
		const albumC = albumRow("1003", "Album C");
		fetchCatalogAlbum.mockResolvedValue(albumC);
		expect(await findOrCreateAlbum(albumC.id)).toMatchObject(albumC);
		expect(fetchCatalogAlbum).toHaveBeenCalledWith(albumC.id);
	});
});

describe("reviews", () => {
	it("keeps one review per user and album, updating it in place", async () => {
		await upsertReview({
			userId: "u1",
			albumId: ALBUM_A.id,
			rating: 3,
			comment: "",
		});
		await upsertReview({
			userId: "u1",
			albumId: ALBUM_A.id,
			rating: 5,
			comment: "Great",
		});

		const reviews = await selectAlbumReviews(ALBUM_A.id);
		expect(reviews).toHaveLength(1);
		expect(reviews[0]).toMatchObject({
			userName: "Ivan",
			rating: 5,
			comment: "Great",
		});
	});

	it("only lets users delete their own reviews", async () => {
		const review = await upsertReview({
			userId: "u1",
			albumId: ALBUM_A.id,
			rating: 4,
			comment: "",
		});
		if (!review) throw new Error("review not saved");

		expect(await deleteUserReview("u2", review.id)).toBeNull();
		expect(await deleteUserReview("u1", review.id)).toMatchObject({
			id: review.id,
		});
		expect(await selectAlbumReviews(ALBUM_A.id)).toHaveLength(0);
	});

	it("lists a user's reviews with their albums", async () => {
		await upsertReview({
			userId: "u1",
			albumId: ALBUM_A.id,
			rating: 2,
			comment: "",
		});
		await upsertReview({
			userId: "u2",
			albumId: ALBUM_B.id,
			rating: 5,
			comment: "",
		});

		const mine = await selectUserReviews("u1");
		expect(mine).toHaveLength(1);
		expect(mine[0].album).toMatchObject(ALBUM_A);
	});

	it("ranks popular albums by average rating, ignoring unrated comments", async () => {
		await upsertReview({
			userId: "u1",
			albumId: ALBUM_A.id,
			rating: 3,
			comment: "",
		});
		await upsertReview({
			userId: "u2",
			albumId: ALBUM_A.id,
			rating: 0,
			comment: "Haven't rated yet",
		});
		await upsertReview({
			userId: "u1",
			albumId: ALBUM_B.id,
			rating: 5,
			comment: "",
		});
		await upsertReview({
			userId: "u2",
			albumId: ALBUM_B.id,
			rating: 4,
			comment: "",
		});

		const popular = await selectPopularAlbums();
		expect(
			popular.map((a) => [a.title, a.averageRating, a.reviewCount]),
		).toEqual([
			["Album B", 4.5, 2],
			["Album A", 3, 1],
		]);
	});
});
