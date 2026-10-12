import { Link, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { authClient } from "#/lib/auth-client";
import { useAlbumReviews } from "../hooks/useAlbumReviews";
import { useDeleteReview } from "../hooks/useDeleteReview";
import { useSaveReview } from "../hooks/useSaveReview";
import { ReviewCard } from "./ReviewCard";
import { ReviewInput } from "./ReviewInput";

export function Reviews({ albumId }: { albumId: string }) {
	const { data: session } = authClient.useSession();
	const { pathname } = useLocation();
	const { reviews, myReview, isPending } = useAlbumReviews(albumId);
	const { saveReview, isPending: isSaving } = useSaveReview({ albumId });
	const { deleteReview } = useDeleteReview({ albumId });
	const [reviewText, setReviewText] = useState("");

	const writtenReviews = reviews.filter((review) => review.comment.trim());

	function handleAddReview() {
		if (!reviewText.trim()) return;
		saveReview({ rating: myReview?.rating ?? 0, comment: reviewText });
		setReviewText("");
	}

	return (
		<section className="grid grid-cols-1">
			<h2 className="text-2xl mb-1 shrink-0">Reviews</h2>
			<div className="flex-1 flex flex-col gap-2 p-2">
				{session ? (
					<ReviewInput
						value={reviewText}
						onChange={setReviewText}
						onSubmit={handleAddReview}
						disabled={isSaving}
					/>
				) : (
					<p className="text-stone-300 text-sm">
						<Link
							to="/auth/login"
							search={{ redirect: pathname }}
							className="text-blue-300 hover:underline"
						>
							Log in
						</Link>{" "}
						to rate and review this album.
					</p>
				)}
				<div className="flex flex-col gap-2">
					{writtenReviews.length > 0 ? (
						writtenReviews.map((review) => (
							<ReviewCard
								key={review.id}
								review={review}
								canDelete={review.userId === session?.user.id}
								onDelete={deleteReview}
							/>
						))
					) : (
						<p className="text-stone-400 text-sm italic">
							{isPending ? "Loading reviews..." : "No reviews yet."}
						</p>
					)}
				</div>
			</div>
		</section>
	);
}
