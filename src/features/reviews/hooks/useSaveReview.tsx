import { useServerFn } from "@tanstack/react-start";
import { authClient } from "#/lib/auth-client";
import { saveReviewFn } from "../server/reviews.functions";
import { useReviewMutation } from "./useReviewMutation";

interface ReviewInput {
	rating: number;
	comment: string;
}

export function useSaveReview({ albumId }: { albumId: string }) {
	const saveReview = useServerFn(saveReviewFn);
	const { data: session } = authClient.useSession();

	const { mutate, isPending } = useReviewMutation<ReviewInput>({
		albumId,
		mutationFn: (review) => saveReview({ data: { albumId, ...review } }),
		optimisticUpdate: (reviews, review) => {
			if (!session) return reviews;
			const { user } = session;
			const existing = reviews.find((r) => r.userId === user.id);

			if (existing) {
				return reviews.map((r) => (r === existing ? { ...r, ...review } : r));
			}
			return [
				{
					id: `optimistic-${user.id}`,
					userId: user.id,
					userName: user.name,
					updatedAt: new Date(),
					...review,
				},
				...reviews,
			];
		},
		successMessage: "Review saved",
	});

	return { saveReview: mutate, isPending };
}
