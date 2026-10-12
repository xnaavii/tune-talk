import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { IoChevronBack } from "react-icons/io5";
import { SiApplemusic } from "react-icons/si";
import defaultCover from "#/assets/record-blue.jpg";
import { IconButton } from "#/components/Button";
import { Section } from "#/components/PageHeader";
import { Spinner } from "#/components/Spinner";
import { StatusMessage } from "#/components/StatusMessage";
import { AlbumCard } from "#/features/albums/components/AlbumCard";
import { AlbumGrid } from "#/features/albums/components/AlbumGrid";
import { ALBUM_ID_PATTERN } from "#/features/albums/utils";
import { artistQueries } from "#/features/artists/queries";
import { PlayButton } from "#/features/player/components/PlayButton";
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

	return (
		<div className="flex flex-col gap-8">
			<IconButton
				icon={IoChevronBack}
				label="Go back"
				onClick={() => window.history.back()}
			/>
			<figure className="grid grid-cols-1 gap-5 sm:grid-cols-[200px_1fr] md:grid-cols-[240px_1fr]">
				<img
					src={artist.image ?? defaultCover}
					alt=""
					className="aspect-square w-full max-w-[220px] rounded-full object-cover shadow-lg sm:max-w-none"
				/>
				<figcaption className="flex flex-col justify-end gap-4">
					<div className="flex flex-col gap-1">
						<h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
							{artist.name}
						</h2>
						<p className="text-sm text-ink/60">
							{[
								artist.genre,
								`${artist.albums.length + artist.singles.length} releases`,
							]
								.filter(Boolean)
								.join(" · ")}
						</p>
					</div>
					<div className="flex flex-wrap items-center gap-2">
						<PlayButton songs={artist.topSongs} label="Play top songs" />
						{artist.appleMusicUrl && (
							<a
								href={artist.appleMusicUrl}
								target="_blank"
								rel="noreferrer"
								className="inline-flex w-fit items-center gap-2 rounded-full bg-navy/40 px-3 py-1.5 text-xs font-medium text-ink ring-1 ring-ink/15 transition-colors hover:bg-navy/60"
							>
								<SiApplemusic aria-hidden className="size-4 text-apple-music" />
								Listen on Apple Music
							</a>
						)}
					</div>
				</figcaption>
			</figure>

			{artist.topSongs.length > 0 && (
				<Section title="Top songs">
					<SongList songs={artist.topSongs} />
				</Section>
			)}

			{artist.albums.length > 0 && (
				<Section title="Albums">
					<AlbumGrid>
						{artist.albums.map((album) => (
							<AlbumCard key={album.id} album={album} />
						))}
					</AlbumGrid>
				</Section>
			)}

			{artist.singles.length > 0 && (
				<Section title="Singles & EPs">
					<AlbumGrid>
						{artist.singles.map((album) => (
							<AlbumCard key={album.id} album={album} />
						))}
					</AlbumGrid>
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
