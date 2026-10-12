import { queryOptions } from "@tanstack/react-query";
import type { ChartCountry } from "./countries";
import { getTopAlbums, getTopSongs } from "./server/charts.functions";

// Charts change slowly, so a fetched chart is reused for half an hour.
const CHART_STALE_TIME = 1000 * 60 * 30;

export const chartQueries = {
	albums: (country: ChartCountry = "us") =>
		queryOptions({
			queryKey: ["charts", "albums", country],
			queryFn: () => getTopAlbums({ data: { country } }),
			staleTime: CHART_STALE_TIME,
		}),
	songs: (country: ChartCountry = "us") =>
		queryOptions({
			queryKey: ["charts", "songs", country],
			queryFn: () => getTopSongs({ data: { country } }),
			staleTime: CHART_STALE_TIME,
		}),
};
