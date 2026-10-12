import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { IoChevronBack } from "react-icons/io5";
import { IconButton } from "#/components/Button";
import { Section } from "#/components/PageHeader";
import { Spinner } from "#/components/Spinner";
import { StatusMessage } from "#/components/StatusMessage";
import { AlbumDetails } from "#/features/albums/components/AlbumDetails";
import { AlbumShelf } from "#/features/albums/components/AlbumShelf";
import { Tracklist } from "#/features/albums/components/Tracklist";
import { albumQueries } from "#/features/albums/queries";
import type { AlbumWithTracks } from "#/features/albums/types";
import { ALBUM_ID_PATTERN } from "#/features/albums/utils";
import { artistQueries } from "#/features/artists/queries";
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
			return { title: album.title, artist: album.artist };
		} catch {
			throw notFound();
		}
	},
	head: ({ loaderData }) => ({
		meta: [
			{
				title: loaderData
					? `${loaderData.title} by ${loaderData.artist} | Tunetalk`
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
		<div className="flex flex-col gap-12">
			<div className="flex flex-col gap-4">
				<IconButton
					icon={IoChevronBack}
					label="Go back"
					onClick={() => window.history.back()}
				/>
				<AlbumDetails album={album} />
			</div>
			<div className="grid grid-cols-1 gap-12 xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
				<Tracklist album={album} />
				<Reviews albumId={album.id} />
			</div>
			<MoreByArtist album={album} />
		</div>
	);
}

// The artist's other releases, loaded after the album so it never holds
// up the page.
function MoreByArtist({ album }: { album: AlbumWithTracks }) {
	const { data: artist } = useQuery({
		...artistQueries.details(album.artistId ?? ""),
		enabled: !!album.artistId,
	});
	const others = [...(artist?.albums ?? []), ...(artist?.singles ?? [])]
		.filter((other) => other.id !== album.id)
		.slice(0, 15);

	if (!album.artistId || others.length === 0) return null;

	return (
		<Section
			title={`More by ${album.artist}`}
			more={{
				to: "/artists/$artistId",
				params: { artistId: album.artistId },
			}}
		>
			<AlbumShelf albums={others} />
		</Section>
	);
}

function AlbumNotFound() {
	return (
		<StatusMessage
			action={
				<Link to="/explore" className={textLinkClass}>
					Back to Explore
				</Link>
			}
		>
			Album not found.
		</StatusMessage>
	);
}
