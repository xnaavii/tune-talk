import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "#/components/PageHeader";
import { AlbumGridSkeleton } from "#/features/albums/components/AlbumGrid";
import { AlbumShelf } from "#/features/albums/components/AlbumShelf";
import { FeaturedAlbum } from "#/features/albums/components/FeaturedAlbum";
import { CountryPicker } from "#/features/charts/components/CountryPicker";
import { chartQueries } from "#/features/charts/queries";
import { GenreGrid } from "#/features/genres/components/GenreGrid";
import { PlayButton } from "#/features/player/components/PlayButton";
import { reviewQueries } from "#/features/reviews/queries";
import {
	SongList,
	SongListSkeleton,
} from "#/features/songs/components/SongList";

export const Route = createFileRoute("/_app/explore")({
	loader: ({ context: { queryClient } }) =>
		Promise.all([
			queryClient.ensureQueryData(chartQueries.albums()),
			queryClient.ensureQueryData(chartQueries.songs()),
		]),
	head: () => ({ meta: [{ title: "Explore | Tunetalk" }] }),
	component: ExplorePage,
	pendingComponent: ExplorePending,
});

const header = (
	<PageHeader
		eyebrow={new Intl.DateTimeFormat("en", {
			weekday: "long",
			month: "long",
			day: "numeric",
		}).format(new Date())}
		title="Explore"
		description="What the world is spinning today, crates to dig through, and what Tunetalk rates highest."
	/>
);

function ExplorePage() {
	const { data: albums } = useSuspenseQuery(chartQueries.albums());
	const { data: songs } = useSuspenseQuery(chartQueries.songs());
	// The community shelf is extra, so it never holds up the page.
	const { data: popular = [] } = useQuery(reviewQueries.popular());
	const [featured, ...restAlbums] = albums;
	const topSongs = songs.slice(0, 10);

	return (
		<>
			{header}
			<div className="flex flex-col gap-12">
				{featured && (
					<FeaturedAlbum
						album={featured}
						eyebrow="No. 1 on Apple Music today"
					/>
				)}

				{topSongs.length > 0 && (
					<Section
						eyebrow="Tap a song for a preview"
						title={
							<span className="flex items-center gap-3">
								Top songs today
								<PlayButton songs={topSongs} label="Play top songs" size="md" />
							</span>
						}
						more={{ to: "/charts", search: { type: "songs", country: "us" } }}
					>
						<SongList songs={topSongs} columns={2} />
					</Section>
				)}

				<Section
					eyebrow="Apple Music · United States"
					title="Most played albums"
					more={{ to: "/charts", search: { type: "albums", country: "us" } }}
				>
					<AlbumShelf albums={restAlbums.slice(0, 15)} />
				</Section>

				<Section eyebrow="Dig through the crates" title="Browse by genre">
					<GenreGrid />
				</Section>

				<Section eyebrow="Charts around the world" title="Travel the charts">
					<CountryPicker type="songs" />
				</Section>

				{popular.length > 0 && (
					<Section
						eyebrow="Rated by the community"
						title="Highest rated on Tunetalk"
						more={{ to: "/popular" }}
					>
						<AlbumShelf albums={popular.slice(0, 15)} />
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
			<div className="flex flex-col gap-12">
				<div className="h-64 animate-pulse rounded-2xl bg-glass/10" />
				<SongListSkeleton />
				<AlbumGridSkeleton count={4} />
			</div>
		</>
	);
}
