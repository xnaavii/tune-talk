import { IoTrashOutline } from "react-icons/io5";
import type { AlbumReview } from "../hooks/useReviewMutation";
import { StarRow } from "./Star";

interface ReviewCardProps {
	review: AlbumReview;
	canDelete: boolean;
	onDelete: (reviewId: string) => void;
}

const dateFormat = new Intl.DateTimeFormat("en", {
	month: "short",
	day: "numeric",
	year: "numeric",
});

export function ReviewCard({ review, canDelete, onDelete }: ReviewCardProps) {
	return (
		<article className="glass-card flex flex-col gap-2.5 p-4">
			<header className="flex items-center gap-3">
				<span
					aria-hidden
					className="flex size-8 shrink-0 items-center justify-center rounded-full bg-glass/25 text-sm font-semibold uppercase"
				>
					{review.userName.charAt(0)}
				</span>
				<div className="flex min-w-0 flex-1 flex-col">
					<span className="truncate text-sm font-medium">
						{review.userName}
						{canDelete && <span className="text-ink/60"> (you)</span>}
					</span>
					<span className="text-xs text-ink/55">
						{dateFormat.format(new Date(review.updatedAt))}
					</span>
				</div>
				{review.rating > 0 && <StarRow rating={review.rating} />}
				{canDelete && (
					<button
						type="button"
						onClick={() => onDelete(review.id)}
						aria-label="Delete your review"
						title="Delete your review"
						className="inline-flex size-8 items-center justify-center rounded-full text-ink/60 hover:bg-red-400/20 hover:text-red-200 transition-colors cursor-pointer"
					>
						<IoTrashOutline aria-hidden className="size-4" />
					</button>
				)}
			</header>
			<p className="whitespace-pre-line text-sm leading-relaxed text-ink/90">
				{review.comment}
			</p>
		</article>
	);
}
