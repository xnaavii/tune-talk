import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "#/components/PageHeader";
import { StatusMessage } from "#/components/StatusMessage";
import { AlbumGridSkeleton } from "#/features/albums/components/AlbumGrid";
import { RankedAlbumList } from "#/features/albums/components/RankedAlbumList";
import { albumQueries } from "#/features/albums/queries";

export const Route = createFileRoute("/_app/top")({
	loader: ({ context }) =>
		context.queryClient.ensureQueryData(albumQueries.top()),
	component: TopAlbumsPage,
	pendingComponent: TopAlbumsPending,
});

const header = (
	<PageHeader
		title="Top"
		description="The most played albums on Apple Music today."
	/>
);

function TopAlbumsPage() {
	const { data: albums } = useSuspenseQuery(albumQueries.top());

	return (
		<>
			{header}
			{albums.length === 0 ? (
				<StatusMessage>No chart available right now.</StatusMessage>
			) : (
				<RankedAlbumList albums={albums} />
			)}
		</>
	);
}

function TopAlbumsPending() {
	return (
		<>
			{header}
			<AlbumGridSkeleton />
		</>
	);
}
