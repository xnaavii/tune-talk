import { useQuery } from "@tanstack/react-query";
import { authClient } from "#/lib/auth-client";
import { reviewQueries } from "../queries";
import { averageRating } from "../utils";

// An album's reviews plus the values the rating and review UI both need.
export function useAlbumReviews(albumId: string) {
	const { data: session } = authClient.useSession();
	const { data: reviews = [], ...query } = useQuery(
		reviewQueries.album(albumId),
	);
	const userId = session?.user.id;

	return {
		...query,
		reviews,
		averageRating: averageRating(reviews),
		myReview: userId ? reviews.find((r) => r.userId === userId) : undefined,
	};
}
