import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useAlbumReviews } from "../hooks/useAlbumReviews";
import { useDeleteReview } from "../hooks/useDeleteReview";
import { useSaveReview } from "../hooks/useSaveReview";
import { Star } from "./Star";

const STAR_COUNT = 5;

// Interactive rating: shows the user's rating if they have one, otherwise the
// album average. Hovering previews a new rating.
export function StarRating({ albumId }: { albumId: string }) {
	const { reviews, averageRating, myReview } = useAlbumReviews(albumId);
	const { saveReview } = useSaveReview({ albumId });
	const { deleteReview } = useDeleteReview({ albumId });
	const [hoveredStar, setHoveredStar] = useState<number | null>(null);

	const userRating = myReview?.rating ?? 0;
	const ratingCount = reviews.filter((r) => r.rating > 0).length;
	const shown = hoveredStar ?? (userRating || averageRating);
	const highlighted = hoveredStar !== null || userRating > 0;
	const full = Math.floor(shown);
	const half = !highlighted && shown - full >= 0.5;

	return (
		<div className="flex flex-col gap-1.5">
			<div className="flex items-center gap-2">
				<fieldset
					className="flex items-center"
					onMouseLeave={() => setHoveredStar(null)}
				>
					<legend className="sr-only">Your rating</legend>
					{Array.from({ length: STAR_COUNT }, (_, i) => {
						const index = i + 1;
						return (
							<button
								type="button"
								key={index}
								aria-label={`Rate ${index} out of ${STAR_COUNT}`}
								aria-pressed={userRating === index}
								className="p-0.5 rounded cursor-pointer transition-transform hover:scale-110"
								onClick={() =>
									saveReview({
										rating: index,
										comment: myReview?.comment ?? "",
									})
								}
								onMouseEnter={() => setHoveredStar(index)}
								onFocus={() => setHoveredStar(index)}
								onBlur={() => setHoveredStar(null)}
							>
								<Star
									size={22}
									highlighted={highlighted}
									filled={index <= full}
									half={half && index === full + 1}
								/>
							</button>
						);
					})}
				</fieldset>
				<span className="text-sm font-semibold tabular-nums">
					{averageRating.toFixed(1)}
				</span>
				{myReview && userRating > 0 && (
					<button
						type="button"
						title="Remove your rating"
						aria-label="Remove your rating"
						className="inline-flex items-center justify-center size-6 rounded-full text-ink/70 hover:bg-red-400/20 hover:text-red-200 transition-colors cursor-pointer"
						onClick={() =>
							// Keep a written review; only drop the rating.
							myReview.comment
								? saveReview({ rating: 0, comment: myReview.comment })
								: deleteReview(myReview.id)
						}
					>
						<IoClose aria-hidden className="size-4" />
					</button>
				)}
			</div>
			<p className="text-xs text-ink/60">
				{userRating > 0
					? `You rated this ${userRating} out of 5`
					: "Tap a star to rate"}
				{" · "}
				{ratingCount} {ratingCount === 1 ? "rating" : "ratings"}
			</p>
		</div>
	);
}
