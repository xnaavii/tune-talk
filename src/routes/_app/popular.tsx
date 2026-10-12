import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "#/components/PageHeader";
import { StatusMessage } from "#/components/StatusMessage";
import { AlbumGridSkeleton } from "#/features/albums/components/AlbumGrid";
import { RankedAlbumList } from "#/features/albums/components/RankedAlbumList";
import { StarRow } from "#/features/reviews/components/Star";
import { reviewQueries } from "#/features/reviews/queries";
import { textLinkClass } from "#/lib/styles";

export const Route = createFileRoute("/_app/popular")({
	loader: ({ context }) =>
		context.queryClient.ensureQueryData(reviewQueries.popular()),
	component: PopularPage,
	pendingComponent: PopularPending,
});

const header = (
	<PageHeader
		title="Popular"
		description="The highest rated albums on Tunetalk."
	/>
);

function PopularPage() {
	const { data: albums } = useSuspenseQuery(reviewQueries.popular());

	return (
		<>
			{header}
			{albums.length > 0 ? (
				<RankedAlbumList
					albums={albums}
					meta={(album) => (
						<span className="ml-2 inline-flex items-center gap-1.5 align-middle">
							<StarRow rating={album.averageRating} size={12} />
							<span className="font-semibold text-ink tabular-nums">
								{album.averageRating.toFixed(1)}
							</span>
							<span>
								({album.reviewCount}{" "}
								{album.reviewCount === 1 ? "rating" : "ratings"})
							</span>
						</span>
					)}
				/>
			) : (
				<StatusMessage
					action={
						<Link to="/search" search={{ q: "" }} className={textLinkClass}>
							Find an album to rate
						</Link>
					}
				>
					No rated albums yet.
				</StatusMessage>
			)}
		</>
	);
}

function PopularPending() {
	return (
		<>
			{header}
			<AlbumGridSkeleton />
		</>
	);
}
