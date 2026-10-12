import { useState } from "react";
import { IoRemoveCircle } from "react-icons/io5";
import { useAlbumReviews } from "../hooks/useAlbumReviews";
import { useDeleteReview } from "../hooks/useDeleteReview";
import { useSaveReview } from "../hooks/useSaveReview";
import { Star } from "./Star";

const STAR_COUNT = 5;

export function StarRating({ albumId }: { albumId: string }) {
	const { averageRating, myReview } = useAlbumReviews(albumId);
	const { saveReview } = useSaveReview({ albumId });
	const { deleteReview } = useDeleteReview({ albumId });
	const [hoveredStar, setHoveredStar] = useState<number | null>(null);

	const userRating = myReview?.rating ?? 0;
	const fullStars = Math.floor(averageRating);
	const hasHalfStar = averageRating - fullStars >= 0.5;

	function isFilled(index: number) {
		if (hoveredStar !== null) return index <= hoveredStar;
		if (userRating > 0) return index <= userRating;
		return index <= fullStars;
	}

	return (
		<div className="flex items-center gap-[4px]">
			{Array.from({ length: STAR_COUNT }, (_, i) => {
				const index = i + 1;
				return (
					<button
						type="button"
						key={index}
						aria-label={`Rate ${index} out of ${STAR_COUNT}`}
						onClick={() =>
							saveReview({ rating: index, comment: myReview?.comment ?? "" })
						}
						onMouseOver={() => setHoveredStar(index)}
						onFocus={() => setHoveredStar(index)}
						onMouseLeave={() => setHoveredStar(null)}
						onBlur={() => setHoveredStar(null)}
					>
						<Star
							size={20}
							color={
								hoveredStar !== null || userRating > 0
									? "rgba(250,204,21)"
									: "#FFFFFF"
							}
							filled={isFilled(index)}
							half={
								hoveredStar === null &&
								userRating === 0 &&
								hasHalfStar &&
								index === fullStars + 1
							}
						/>
					</button>
				);
			})}
			<span className="text-[10px] sm:text-[12px]">
				{averageRating.toFixed(1)}
			</span>
			<div
				className={`transition-all duration-300 ease-in-out overflow-hidden ${
					userRating > 0 ? "opacity-100 py-1" : "opacity-0 py-0"
				}`}
			>
				{myReview && userRating > 0 && (
					<button
						type="button"
						aria-label="Remove your rating"
						className="ml-1 sm:ml-2 p-1 rounded-full hover:bg-red-200 active:bg-red-300 transition-colors"
						onClick={() =>
							// Keep a written review; only drop the rating.
							myReview.comment
								? saveReview({ rating: 0, comment: myReview.comment })
								: deleteReview(myReview.id)
						}
					>
						<IoRemoveCircle className="w-4 h-4 sm:w-5 sm:h-5" color="#ffe3e3" />
					</button>
				)}
			</div>
		</div>
	);
}
