import { queryOptions } from "@tanstack/react-query";
import {
	getAlbumDetails,
	getNewReleases,
	searchAlbums,
} from "./server/albums.functions";

export const albumQueries = {
	search: (query: string) =>
		queryOptions({
			queryKey: ["albums", "search", { query }],
			queryFn: () => searchAlbums({ data: { query } }),
			enabled: !!query.trim(),
		}),
	newReleases: () =>
		queryOptions({
			queryKey: ["albums", "new"],
			queryFn: () => getNewReleases(),
			staleTime: 1000 * 60 * 30,
		}),
	// Album metadata rarely changes, so a fetched album is reused for an hour.
	details: (albumId: string) =>
		queryOptions({
			queryKey: ["albums", "details", albumId],
			queryFn: () => getAlbumDetails({ data: { albumId } }),
			staleTime: 1000 * 60 * 60,
		}),
};
