import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "#/components/PageHeader";
import { StatusMessage } from "#/components/StatusMessage";
import { AlbumCard } from "#/features/albums/components/AlbumCard";
import { AlbumGridSkeleton } from "#/features/albums/components/AlbumGrid";
import { AlbumGroups } from "#/features/albums/components/AlbumGroups";
import { reviewQueries } from "#/features/reviews/queries";
import { textLinkClass } from "#/lib/styles";

export const Route = createFileRoute("/_app/_protected/reviews")({
	loader: ({ context }) =>
		context.queryClient.ensureQueryData(reviewQueries.mine()),
	component: MyReviewsPage,
	pendingComponent: MyReviewsPending,
});

const header = (
	<PageHeader
		eyebrow="Your collection"
		title="Your Reviews"
		description="Every album you've rated or reviewed."
	/>
);

function MyReviewsPage() {
	const { data: myReviews } = useSuspenseQuery(reviewQueries.mine());

	return (
		<>
			{header}
			{myReviews.length === 0 ? (
				<StatusMessage
					action={
						<Link to="/search" search={{ q: "" }} className={textLinkClass}>
							Find an album to rate
						</Link>
					}
				>
					You haven't reviewed any albums yet.
				</StatusMessage>
			) : (
				<AlbumGroups
					items={myReviews}
					groupBy={({ review }) => review.rating}
					sortKeys={(a, b) => Number(b) - Number(a)}
					heading={(rating) =>
						rating === "0"
							? "Not rated yet"
							: `${rating} ${rating === "1" ? "star" : "stars"}`
					}
					renderItem={({ album }) => <AlbumCard key={album.id} album={album} />}
				/>
			)}
		</>
	);
}

function MyReviewsPending() {
	return (
		<>
			{header}
			<AlbumGridSkeleton />
		</>
	);
}
