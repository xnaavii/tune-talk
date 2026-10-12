import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { albumIdSchema } from "#/features/albums/utils";
import { ensureSession, getSession } from "#/lib/auth.functions";
import {
	deleteUserReview,
	findOrCreateAlbum,
	selectAlbumReviews,
	selectPopularAlbums,
	selectUserReviews,
	upsertReview,
} from "./reviews.server";

export const saveReviewSchema = albumIdSchema.extend({
	rating: z.number().int().min(0).max(5),
	comment: z.string().trim().max(250),
});

export const getAlbumReviewsFn = createServerFn({ method: "GET" })
	.validator(albumIdSchema)
	.handler(async ({ data }) => await selectAlbumReviews(data.albumId));

export const getPopularAlbumsFn = createServerFn({ method: "GET" }).handler(
	async () => await selectPopularAlbums(),
);

export const getMyReviewsFn = createServerFn({ method: "GET" }).handler(
	async () => {
		const session = await getSession();
		if (!session) return [];
		return await selectUserReviews(session.user.id);
	},
);

// Creates or updates the signed-in user's review of an album.
export const saveReviewFn = createServerFn({ method: "POST" })
	.validator(saveReviewSchema)
	.handler(async ({ data }) => {
		const session = await ensureSession();

		// Validates the album exists and snapshots it for review lists.
		const albumRow = await findOrCreateAlbum(data.albumId);

		const saved = await upsertReview({
			userId: session.user.id,
			albumId: albumRow.id,
			rating: data.rating,
			comment: data.comment,
		});

		if (!saved) {
			throw new Error("Failed to save review");
		}

		return saved;
	});

export const deleteReviewFn = createServerFn({ method: "POST" })
	.validator(z.object({ reviewId: z.uuid() }))
	.handler(async ({ data }) => {
		const session = await ensureSession();
		const deleted = await deleteUserReview(session.user.id, data.reviewId);

		if (!deleted) {
			throw new Error("Review not found");
		}

		return deleted;
	});
