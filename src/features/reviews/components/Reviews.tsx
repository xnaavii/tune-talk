import { Link, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { SectionHeading } from "#/components/PageHeader";
import { StatusMessage } from "#/components/StatusMessage";
import { authClient } from "#/lib/auth-client";
import { textLinkClass } from "#/lib/styles";
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

	function handleSubmit() {
		if (!reviewText.trim()) return;
		saveReview({ rating: myReview?.rating ?? 0, comment: reviewText });
		setReviewText("");
	}

	return (
		<section className="flex flex-col gap-3">
			<SectionHeading>
				Reviews{writtenReviews.length > 0 && ` (${writtenReviews.length})`}
			</SectionHeading>

			{session ? (
				<ReviewInput
					value={reviewText}
					onChange={setReviewText}
					onSubmit={handleSubmit}
					isEditing={!!myReview?.comment}
					disabled={isSaving}
				/>
			) : (
				<p className="text-sm text-ink/70">
					<Link
						to="/auth/login"
						search={{ redirect: pathname }}
						className={textLinkClass}
					>
						Log in
					</Link>{" "}
					to rate and review this album.
				</p>
			)}

			{writtenReviews.length > 0 ? (
				<div className="flex flex-col gap-2">
					{writtenReviews.map((review) => (
						<ReviewCard
							key={review.id}
							review={review}
							canDelete={review.userId === session?.user.id}
							onDelete={deleteReview}
						/>
					))}
				</div>
			) : (
				<StatusMessage>
					{isPending
						? "Loading reviews..."
						: "No reviews yet. Be the first to share your take."}
				</StatusMessage>
			)}
		</section>
	);
}
