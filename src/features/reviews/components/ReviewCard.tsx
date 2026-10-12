import type { AlbumReview } from "../hooks/useReviewMutation";

interface ReviewCardProps {
	review: AlbumReview;
	canDelete: boolean;
	onDelete: (reviewId: string) => void;
}

export function ReviewCard({ review, canDelete, onDelete }: ReviewCardProps) {
	return (
		<div className="bg-[#C2E1FA]/10 rounded-xl p-3 flex flex-col gap-2 shadow-sm">
			<div className="flex justify-between items-start gap-2">
				<p className="whitespace-pre-line text-stone-100 text-sm leading-relaxed">
					{review.comment}
				</p>

				{canDelete && (
					<button
						type="button"
						onClick={() => onDelete(review.id)}
						className="text-xs text-red-400 hover:text-red-300 transition-colors shrink-0"
					>
						✕ Remove
					</button>
				)}
			</div>

			<div
				className="flex items-center gap-1"
				role="img"
				aria-label={`${review.rating} stars`}
			>
				{Array.from({ length: 5 }, (_, i) => (
					<span
						// biome-ignore lint/suspicious/noArrayIndexKey: fixed-length star list
						key={i}
						className={i < review.rating ? "text-yellow-400" : "text-stone-600"}
					>
						★
					</span>
				))}
			</div>

			<span className="text-xs text-stone-400 italic">— {review.userName}</span>
		</div>
	);
}
