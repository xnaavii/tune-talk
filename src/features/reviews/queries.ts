import { queryOptions } from "@tanstack/react-query";
import {
	getAlbumReviewsFn,
	getMyReviewsFn,
	getPopularAlbumsFn,
} from "./server/reviews.functions";

export const reviewQueries = {
	all: () => ["reviews"] as const,
	album: (albumId: string) =>
		queryOptions({
			queryKey: ["reviews", "album", albumId],
			queryFn: () => getAlbumReviewsFn({ data: { albumId } }),
		}),
	popular: () =>
		queryOptions({
			queryKey: ["reviews", "popular"],
			queryFn: () => getPopularAlbumsFn(),
		}),
	mine: () =>
		queryOptions({
			queryKey: ["reviews", "mine"],
			queryFn: () => getMyReviewsFn(),
		}),
};
