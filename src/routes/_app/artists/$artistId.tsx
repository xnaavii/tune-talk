import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiApplemusic } from "react-icons/si";
import { Section } from "#/components/PageHeader";
import { Spinner } from "#/components/Spinner";
import { StatusMessage } from "#/components/StatusMessage";
import { Vinyl } from "#/components/Vinyl";
import { AlbumCard } from "#/features/albums/components/AlbumCard";
import { AlbumGrid } from "#/features/albums/components/AlbumGrid";
import { AlbumShelf } from "#/features/albums/components/AlbumShelf";
import { ALBUM_ID_PATTERN } from "#/features/albums/utils";
import { artistQueries } from "#/features/artists/queries";
import { PlayButton } from "#/features/player/components/PlayButton";
import { usePlayer } from "#/features/player/PlayerProvider";
import { SongList } from "#/features/songs/components/SongList";
import { textLinkClass } from "#/lib/styles";

export const Route = createFileRoute("/_app/artists/$artistId")({
	params: {
		parse: ({ artistId }) => {
			if (!ALBUM_ID_PATTERN.test(artistId)) throw notFound();
			return { artistId };
		},
	},
	loader: async ({ params, context: { queryClient } }) => {
		try {
			const artist = await queryClient.ensureQueryData(
				artistQueries.details(params.artistId),
			);
			return { name: artist.name };
		} catch {
			throw notFound();
		}
	},
	head: ({ loaderData }) => ({
		meta: [
			{
				title: loaderData
					? `${loaderData.name} | Tunetalk`
					: "Artist not found | Tunetalk",
			},
		],
	}),
	component: ArtistPage,
	pendingComponent: Spinner,
	notFoundComponent: ArtistNotFound,
});

function ArtistPage() {
	const { artistId } = Route.useParams();
	const { data: artist } = useSuspenseQuery(artistQueries.details(artistId));
	const { current, isPlaying } = usePlayer();
	const isArtistPlaying = isPlaying && current?.artistId === artist.id;
	const releaseCount = artist.albums.length + artist.singles.length;

	return (
		<div className="flex flex-col gap-12">
			<header className="flex flex-col items-center gap-6 pt-2 text-center sm:flex-row sm:items-end sm:text-left">
				<Vinyl
					image={artist.image}
					spinning={isArtistPlaying}
					className="relative w-44 shrink-0 sm:w-56"
				/>
				<div className="flex flex-col gap-3">
					<p className="eyebrow">
						Artist{artist.genre && ` · ${artist.genre}`} · {releaseCount}{" "}
						{releaseCount === 1 ? "release" : "releases"}
					</p>
					<h1 className="display-title text-5xl text-ink sm:text-7xl">
						{artist.name}
					</h1>
					<div className="mt-1 flex items-center justify-center gap-3 sm:justify-start">
						<PlayButton
							songs={artist.topSongs}
							label={`Play ${artist.name} previews`}
						/>
						{artist.appleMusicUrl && (
							<a
								href={artist.appleMusicUrl}
								target="_blank"
								rel="noreferrer"
								className="inline-flex items-center gap-2 rounded-full bg-glass/15 px-4 py-2 text-sm font-medium text-ink ring-1 ring-ink/15 transition-colors hover:bg-glass/25"
							>
								<SiApplemusic aria-hidden className="size-4 text-apple-music" />
								Apple Music
							</a>
						)}
					</div>
				</div>
			</header>

			{artist.topSongs.length > 0 && (
				<Section title="Top songs">
					<SongList songs={artist.topSongs} />
				</Section>
			)}

			{artist.albums.length > 0 && (
				<Section title="Albums" eyebrow="Discography">
					<AlbumGrid>
						{artist.albums.map((album) => (
							<AlbumCard key={album.id} album={album} />
						))}
					</AlbumGrid>
				</Section>
			)}

			{artist.singles.length > 0 && (
				<Section title="Singles & EPs">
					<AlbumShelf albums={artist.singles} />
				</Section>
			)}
		</div>
	);
}

function ArtistNotFound() {
	return (
		<StatusMessage
			action={
				<Link to="/explore" className={textLinkClass}>
					Back to Explore
				</Link>
			}
		>
			Artist not found.
		</StatusMessage>
	);
}
