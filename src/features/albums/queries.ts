import { queryOptions } from "@tanstack/react-query";
import { getAlbumDetails } from "./server/albums.functions";

export const albumQueries = {
	// Album metadata rarely changes, so a fetched album is reused for an hour.
	details: (albumId: string) =>
		queryOptions({
			queryKey: ["albums", "details", albumId],
			queryFn: () => getAlbumDetails({ data: { albumId } }),
			staleTime: 1000 * 60 * 60,
		}),
};
