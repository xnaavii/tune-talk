import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { authClient } from "#/lib/auth-client";
import { reviewQueries } from "../queries";
import type { selectAlbumReviews } from "../server/reviews.server";

export type AlbumReview = Awaited<
	ReturnType<typeof selectAlbumReviews>
>[number];

interface UseReviewMutation<TVariables> {
	albumId: string;
	mutationFn: (variables: TVariables) => Promise<unknown>;
	// Applies the change to the cached album reviews before the server answers.
	optimisticUpdate: (
		reviews: AlbumReview[],
		variables: TVariables,
	) => AlbumReview[];
	successMessage: string;
}

// Shared setup for review mutations: sends signed-out users to log in,
// updates the album's reviews optimistically, rolls back on failure, and
// refetches every review list afterwards.
export function useReviewMutation<TVariables>({
	albumId,
	mutationFn,
	optimisticUpdate,
	successMessage,
}: UseReviewMutation<TVariables>) {
	const queryClient = useQueryClient();
	const { data: session } = authClient.useSession();
	const navigate = useNavigate();
	const { queryKey } = reviewQueries.album(albumId);

	const mutation = useMutation({
		mutationFn,
		onMutate: async (variables) => {
			await queryClient.cancelQueries({ queryKey });
			const previous = queryClient.getQueryData(queryKey);
			queryClient.setQueryData(queryKey, (reviews = []) =>
				optimisticUpdate(reviews, variables),
			);
			return { previous };
		},
		onSuccess: () => {
			toast.success(successMessage);
		},
		onError: (error, _variables, context) => {
			queryClient.setQueryData(queryKey, context?.previous);
			toast.error(
				error instanceof Error
					? error.message
					: "Something went wrong. Please try again.",
			);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: reviewQueries.all() });
		},
	});

	function mutate(variables: TVariables) {
		if (!session) {
			navigate({
				to: "/auth/login",
				search: { redirect: window.location.pathname },
			});
			return;
		}

		mutation.mutate(variables);
	}

	return { mutate, isPending: mutation.isPending };
}
