import { queryOptions } from "@tanstack/react-query";
import { search } from "./server/search.functions";

export const searchQueries = {
	results: (query: string) =>
		queryOptions({
			queryKey: ["search", { query }],
			queryFn: () => search({ data: { query } }),
			enabled: !!query.trim(),
		}),
};
