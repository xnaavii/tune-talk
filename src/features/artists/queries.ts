import { queryOptions } from "@tanstack/react-query";
import { getArtist } from "./server/artists.functions";

export const artistQueries = {
	// Discographies rarely change, so a fetched artist is reused for an hour.
	details: (artistId: string) =>
		queryOptions({
			queryKey: ["artists", artistId],
			queryFn: () => getArtist({ data: { artistId } }),
			staleTime: 1000 * 60 * 60,
		}),
};
