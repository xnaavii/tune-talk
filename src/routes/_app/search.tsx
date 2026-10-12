import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { Spinner } from "#/components/Spinner";
import { AlbumCard } from "#/features/albums/components/AlbumCard";
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
			<h2 className="text-md text-stone-200">Try searching for an album...</h2>
		);
	}
	if (isLoading) return <Spinner />;
	if (isError) return <p className="text-red-400">{error.message}</p>;
	if (albums.length === 0) {
		return (
			<h2 className="text-md text-stone-200">No albums found for "{q}"</h2>
		);
	}

	return (
		<>
			<h2 className="text-md mb-2 text-stone-200">
				Showing {albums.length} results for "{q}"
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[6px] py-2">
				{albums.map((album) => (
					<AlbumCard album={album} key={album.id} />
				))}
			</div>
		</>
	);
}
