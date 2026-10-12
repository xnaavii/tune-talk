import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { IoChevronBack } from "react-icons/io5";
import { Spinner } from "#/components/Spinner";
import { AlbumDetails } from "#/features/albums/components/AlbumDetails";
import { albumQueries } from "#/features/albums/queries";
import { SPOTIFY_ID_PATTERN } from "#/features/albums/utils";
import { Reviews } from "#/features/reviews/components/Reviews";
import { reviewQueries } from "#/features/reviews/queries";

export const Route = createFileRoute("/_app/albums/$albumId")({
	params: {
		parse: ({ albumId }) => {
			if (!SPOTIFY_ID_PATTERN.test(albumId)) throw notFound();
			return { albumId };
		},
	},
	loader: async ({ params, context: { queryClient } }) => {
		const reviews = queryClient.prefetchQuery(
			reviewQueries.album(params.albumId),
		);
		try {
			const album = await queryClient.ensureQueryData(
				albumQueries.details(params.albumId),
			);
			await reviews;
			return { album };
		} catch {
			throw notFound();
		}
	},
	head: ({ loaderData }) => ({
		meta: [
			{
				title: loaderData
					? `${loaderData.album.title} by ${loaderData.album.artist} | Tunetalk`
					: "Album not found | Tunetalk",
			},
		],
	}),
	component: AlbumPage,
	pendingComponent: Spinner,
	notFoundComponent: AlbumNotFound,
});

function AlbumPage() {
	const { albumId } = Route.useParams();
	const { data: album } = useSuspenseQuery(albumQueries.details(albumId));

	return (
		<div className="flex flex-col gap-[14px]">
			<div className="flex items-center justify-start shrink-0">
				<button
					type="button"
					aria-label="Go back"
					onClick={() => window.history.back()}
				>
					<IoChevronBack className="w-[28px] h-[28px]" />
				</button>
			</div>
			<AlbumDetails album={album} />
			<Reviews albumId={album.id} />
		</div>
	);
}

function AlbumNotFound() {
	return (
		<div className="flex flex-col items-center gap-3 text-center mt-8">
			<p className="text-stone-300">Album not found</p>
			<Link to="/" className="text-blue-400 hover:underline font-medium">
				Go back to Home
			</Link>
		</div>
	);
}
