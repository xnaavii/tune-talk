import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { IoStar } from "react-icons/io5";
import { Spinner } from "#/components/Spinner";
import { AlbumCard } from "#/features/albums/components/AlbumCard";
import { reviewQueries } from "#/features/reviews/queries";

export const Route = createFileRoute("/_app/popular")({
	loader: ({ context }) =>
		context.queryClient.ensureQueryData(reviewQueries.popular()),
	component: PopularPage,
	pendingComponent: Spinner,
});

function PopularPage() {
	const { data: albums } = useSuspenseQuery(reviewQueries.popular());

	return (
		<>
			<h2 className="text-3xl font-semibold text-stone-100 mb-4">
				Popular Music
			</h2>

			{albums.length > 0 ? (
				<div className="flex flex-col gap-[12px] w-full">
					{albums.map((album) => (
						<div key={album.id} className="flex flex-row gap-3 items-center">
							<span
								className="flex items-center gap-[6px] text-stone-200"
								title={`${album.reviewCount} ratings`}
							>
								{album.averageRating.toFixed(1)} <IoStar size={12} />
							</span>
							<div className="flex-1 min-w-0">
								<AlbumCard album={album} />
							</div>
						</div>
					))}
				</div>
			) : (
				<p className="text-stone-300">
					No rated albums yet. Search for an album and be the first to rate it.
				</p>
			)}
		</>
	);
}
