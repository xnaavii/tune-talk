import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { IoChevronBack } from "react-icons/io5";
import { IconButton } from "#/components/Button";
import { Spinner } from "#/components/Spinner";
import { StatusMessage } from "#/components/StatusMessage";
import { AlbumDetails } from "#/features/albums/components/AlbumDetails";
import { albumQueries } from "#/features/albums/queries";
import { ALBUM_ID_PATTERN } from "#/features/albums/utils";
import { Reviews } from "#/features/reviews/components/Reviews";
import { reviewQueries } from "#/features/reviews/queries";
import { textLinkClass } from "#/lib/styles";

export const Route = createFileRoute("/_app/albums/$albumId")({
	params: {
		parse: ({ albumId }) => {
			if (!ALBUM_ID_PATTERN.test(albumId)) throw notFound();
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
		<div className="flex flex-col gap-6">
			<IconButton
				icon={IoChevronBack}
				label="Go back"
				onClick={() => window.history.back()}
			/>
			<AlbumDetails album={album} />
			<Reviews albumId={album.id} />
		</div>
	);
}

function AlbumNotFound() {
	return (
		<StatusMessage
			action={
				<Link to="/" className={textLinkClass}>
					Go back home
				</Link>
			}
		>
			Album not found.
		</StatusMessage>
	);
}
