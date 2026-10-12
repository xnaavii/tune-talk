import { and, asc, avg, count, desc, eq, gt } from "drizzle-orm";
import { db } from "#/db";
import { album, review, user } from "#/db/schema";
import { fetchCatalogAlbum } from "#/features/albums/server/albums.server";
import type { RankedAlbum } from "#/features/albums/types";

export type Review = typeof review.$inferSelect;

export async function findOrCreateAlbum(albumId: string) {
	const [existing] = await db.select().from(album).where(eq(album.id, albumId));

	if (existing) return existing;

	const { id, title, artist, releaseDate, image, appleMusicUrl } =
		await fetchCatalogAlbum(albumId);
	const details = { id, title, artist, releaseDate, image, appleMusicUrl };
	const [inserted] = await db
		.insert(album)
		.values(details)
		.onConflictDoUpdate({ target: album.id, set: details })
		.returning();

	return inserted;
}

export async function upsertReview({
	userId,
	albumId,
	rating,
	comment,
}: {
	userId: string;
	albumId: string;
	rating: number;
	comment: string;
}) {
	const [upserted] = await db
		.insert(review)
		.values({ userId, albumId, rating, comment })
		.onConflictDoUpdate({
			target: [review.userId, review.albumId],
			set: { rating, comment, updatedAt: new Date() },
		})
		.returning();

	return upserted ?? null;
}

export async function deleteUserReview(userId: string, reviewId: string) {
	const [deleted] = await db
		.delete(review)
		.where(and(eq(review.id, reviewId), eq(review.userId, userId)))
		.returning();

	return deleted ?? null;
}

export async function selectAlbumReviews(albumId: string) {
	return await db
		.select({
			id: review.id,
			userId: review.userId,
			userName: user.name,
			rating: review.rating,
			comment: review.comment,
			updatedAt: review.updatedAt,
		})
		.from(review)
		.innerJoin(user, eq(review.userId, user.id))
		.where(eq(review.albumId, albumId))
		.orderBy(desc(review.updatedAt));
}

export async function selectUserReviews(userId: string) {
	return await db
		.select({ review, album })
		.from(review)
		.innerJoin(album, eq(review.albumId, album.id))
		.where(eq(review.userId, userId))
		.orderBy(desc(review.rating), desc(review.updatedAt));
}

// Reviewed albums ranked by average rating (unrated comments excluded),
// then by number of ratings.
export async function selectPopularAlbums(limit = 50): Promise<RankedAlbum[]> {
	const averageRating = avg(review.rating);
	const reviewCount = count(review.id);

	const rows = await db
		.select({ album, averageRating, reviewCount })
		.from(review)
		.innerJoin(album, eq(review.albumId, album.id))
		.where(gt(review.rating, 0))
		.groupBy(album.id)
		.orderBy(desc(averageRating), desc(reviewCount), asc(album.title))
		.limit(limit);

	return rows.map((row) => ({
		...row.album,
		averageRating: Number(row.averageRating),
		reviewCount: row.reviewCount,
	}));
}
