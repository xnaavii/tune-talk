import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "#/components/PageHeader";
import { StatusMessage } from "#/components/StatusMessage";
import { AlbumCard } from "#/features/albums/components/AlbumCard";
import { AlbumGridSkeleton } from "#/features/albums/components/AlbumGrid";
import { AlbumGroups } from "#/features/albums/components/AlbumGroups";
import { albumQueries } from "#/features/albums/queries";

export const Route = createFileRoute("/_app/new")({
	loader: ({ context }) =>
		context.queryClient.ensureQueryData(albumQueries.newReleases()),
	component: NewAlbumsPage,
	pendingComponent: NewAlbumsPending,
});

const header = (
	<PageHeader
		title="New"
		description="Albums released in the last two weeks."
	/>
);

const dateFormat = new Intl.DateTimeFormat("en", {
	month: "long",
	day: "numeric",
	year: "numeric",
	timeZone: "UTC",
});

function NewAlbumsPage() {
	const { data: albums } = useSuspenseQuery(albumQueries.newReleases());

	return (
		<>
			{header}
			{albums.length === 0 ? (
				<StatusMessage>No new releases right now.</StatusMessage>
			) : (
				<AlbumGroups
					items={albums}
					groupBy={(album) => album.releaseDate}
					sortKeys={(a, b) => b.localeCompare(a)}
					heading={(date) =>
						date.length === 10 ? dateFormat.format(new Date(date)) : date
					}
					renderItem={(album) => <AlbumCard key={album.id} album={album} />}
				/>
			)}
		</>
	);
}

function NewAlbumsPending() {
	return (
		<>
			{header}
			<AlbumGridSkeleton />
		</>
	);
}
