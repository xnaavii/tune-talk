import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { PageHeader } from "#/components/PageHeader";
import { StatusMessage } from "#/components/StatusMessage";
import { AlbumCard } from "#/features/albums/components/AlbumCard";
import {
	AlbumGrid,
	AlbumGridSkeleton,
} from "#/features/albums/components/AlbumGrid";
import { albumQueries } from "#/features/albums/queries";

const searchParamsSchema = z.object({
	q: z.string().catch(""),
});

export const Route = createFileRoute("/_app/search")({
	component: SearchPage,
	validateSearch: searchParamsSchema,
	loaderDeps: ({ search }) => ({ q: search.q }),
	loader: ({ context, deps }) => {
		if (!deps.q.trim()) return;
		context.queryClient.prefetchQuery(albumQueries.search(deps.q));
	},
});

function SearchPage() {
	const { q } = Route.useSearch();
	const {
		data: albums = [],
		isLoading,
		isError,
		error,
	} = useQuery({
		...albumQueries.search(q),
		// Keep showing the last results while the next query loads.
		placeholderData: keepPreviousData,
	});

	if (!q.trim()) {
		return (
			<>
				<PageHeader title="Search" />
				<StatusMessage>
					Search for an artist or album to see results.
				</StatusMessage>
			</>
		);
	}

	return (
		<>
			<PageHeader
				title={`Results for "${q}"`}
				description={
					albums.length > 0 && `Showing the top ${albums.length} albums`
				}
			/>
			{isLoading ? (
				<AlbumGridSkeleton />
			) : isError ? (
				<StatusMessage tone="error">{error.message}</StatusMessage>
			) : albums.length === 0 ? (
				<StatusMessage>No albums found. Try another search.</StatusMessage>
			) : (
				<AlbumGrid>
					{albums.map((album) => (
						<AlbumCard album={album} key={album.id} />
					))}
				</AlbumGrid>
			)}
		</>
	);
}
