import { useServerFn } from "@tanstack/react-start";
import { deleteReviewFn } from "../server/reviews.functions";
import { useReviewMutation } from "./useReviewMutation";

export function useDeleteReview({ albumId }: { albumId: string }) {
	const deleteReview = useServerFn(deleteReviewFn);

	const { mutate, isPending } = useReviewMutation<string>({
		albumId,
		mutationFn: (reviewId) => deleteReview({ data: { reviewId } }),
		optimisticUpdate: (reviews, reviewId) =>
			reviews.filter((r) => r.id !== reviewId),
		successMessage: "Review removed",
	});

	return { deleteReview: mutate, isPending };
}
