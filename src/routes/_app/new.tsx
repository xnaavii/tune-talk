import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Spinner } from "#/components/Spinner";
import { AlbumCard } from "#/features/albums/components/AlbumCard";
import { AlbumGroups } from "#/features/albums/components/AlbumGroups";
import { albumQueries } from "#/features/albums/queries";

export const Route = createFileRoute("/_app/new")({
	loader: ({ context }) =>
		context.queryClient.ensureQueryData(albumQueries.newReleases()),
	component: NewAlbumsPage,
	pendingComponent: Spinner,
});

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
			<h2 className="text-3xl font-semibold text-stone-100">
				Newly Released Albums
			</h2>
			{albums.length === 0 ? (
				<p className="text-stone-300 p-4">No albums available.</p>
			) : (
				<div className="p-4">
					<AlbumGroups
						items={albums}
						groupBy={(album) => album.releaseDate}
						sortKeys={(a, b) => b.localeCompare(a)}
						heading={(date) =>
							date.length === 10 ? dateFormat.format(new Date(date)) : date
						}
						renderItem={(album) => <AlbumCard key={album.id} album={album} />}
					/>
				</div>
			)}
		</>
	);
}
