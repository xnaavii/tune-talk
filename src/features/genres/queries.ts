import { queryOptions } from "@tanstack/react-query";
import type { GenreSlug } from "./genres";
import { getGenre } from "./server/genres.functions";

export const genreQueries = {
	details: (slug: GenreSlug) =>
		queryOptions({
			queryKey: ["genres", slug],
			queryFn: () => getGenre({ data: { slug } }),
			staleTime: 1000 * 60 * 60,
		}),
};
