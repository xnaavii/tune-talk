import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Spinner } from "#/components/Spinner";
import { AlbumCard } from "#/features/albums/components/AlbumCard";
import { AlbumGroups } from "#/features/albums/components/AlbumGroups";
import { reviewQueries } from "#/features/reviews/queries";

export const Route = createFileRoute("/_app/_protected/reviews")({
	loader: ({ context }) =>
		context.queryClient.ensureQueryData(reviewQueries.mine()),
	component: MyReviewsPage,
	pendingComponent: Spinner,
});

function MyReviewsPage() {
	const { data: myReviews } = useSuspenseQuery(reviewQueries.mine());

	return (
		<>
			<h2 className="text-3xl font-semibold text-stone-100 mb-4">My Reviews</h2>
			{myReviews.length === 0 ? (
				<p className="text-stone-300">You haven't reviewed any albums yet.</p>
			) : (
				<AlbumGroups
					items={myReviews}
					groupBy={({ review }) => review.rating}
					sortKeys={(a, b) => Number(b) - Number(a)}
					heading={(rating) =>
						rating === "0" ? "Not rated yet" : `${rating} Star Reviews`
					}
					itemsClassName={(count) =>
						`grid grid-flow-col auto-cols-[220px] gap-[6px] overflow-x-auto py-2 ${
							count > 2 ? "grid-rows-2" : "grid-rows-1"
						}`
					}
					renderItem={({ album }) => <AlbumCard key={album.id} album={album} />}
				/>
			)}
		</>
	);
}
