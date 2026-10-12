import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "#/components/PageHeader";
import { AlbumCard } from "#/features/albums/components/AlbumCard";
import {
	AlbumGrid,
	AlbumGridSkeleton,
} from "#/features/albums/components/AlbumGrid";
import { chartQueries } from "#/features/charts/queries";
import { GenreGrid } from "#/features/genres/components/GenreGrid";
import { PlayButton } from "#/features/player/components/PlayButton";
import { reviewQueries } from "#/features/reviews/queries";
import {
	SongList,
	SongListSkeleton,
} from "#/features/songs/components/SongList";

export const Route = createFileRoute("/_app/explore")({
	// Prefetch (which never throws) rather than ensure: if one chart fails,
	// the rest of Explore still renders and the failed section is skipped.
	loader: ({ context: { queryClient } }) =>
		Promise.all([
			queryClient.prefetchQuery(chartQueries.albums()),
			queryClient.prefetchQuery(chartQueries.songs()),
		]),
	head: () => ({ meta: [{ title: "Explore | Tunetalk" }] }),
	component: ExplorePage,
	pendingComponent: ExplorePending,
});

const header = (
	<PageHeader
		title="Explore"
		description="Today's top songs and albums on Apple Music, plus genres to browse."
	/>
);

function ExplorePage() {
	const { data: albums = [] } = useQuery(chartQueries.albums());
	const { data: songs = [] } = useQuery(chartQueries.songs());
	// The community section is extra, so it never holds up the page.
	const { data: popular = [] } = useQuery(reviewQueries.popular());
	const topSongs = songs.slice(0, 8);

	return (
		<>
			{header}
			<div className="flex flex-col gap-8">
				{topSongs.length > 0 && (
					<Section
						title="Top songs"
						more={{ to: "/charts", search: { type: "songs", country: "us" } }}
					>
						<PlayButton songs={topSongs} label="Play top songs" />
						<SongList songs={topSongs} />
					</Section>
				)}

				{albums.length > 0 && (
					<Section
						title="Top albums"
						more={{ to: "/charts", search: { type: "albums", country: "us" } }}
					>
						<AlbumGrid>
							{albums.slice(0, 9).map((album) => (
								<AlbumCard key={album.id} album={album} />
							))}
						</AlbumGrid>
					</Section>
				)}

				<Section title="Genres">
					<GenreGrid />
				</Section>

				{popular.length > 0 && (
					<Section title="Highest rated on Tunetalk" more={{ to: "/popular" }}>
						<AlbumGrid>
							{popular.slice(0, 6).map((album) => (
								<AlbumCard key={album.id} album={album} />
							))}
						</AlbumGrid>
					</Section>
				)}
			</div>
		</>
	);
}

function ExplorePending() {
	return (
		<>
			{header}
			<div className="flex flex-col gap-8">
				<SongListSkeleton />
				<AlbumGridSkeleton />
			</div>
		</>
	);
}
