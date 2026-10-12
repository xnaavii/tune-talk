import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { PageHeader, Section } from "#/components/PageHeader";
import { StatusMessage } from "#/components/StatusMessage";
import { Tabs } from "#/components/Tabs";
import { AlbumCard } from "#/features/albums/components/AlbumCard";
import {
	AlbumGrid,
	AlbumGridSkeleton,
} from "#/features/albums/components/AlbumGrid";
import { AlbumShelf } from "#/features/albums/components/AlbumShelf";
import { ArtistCard } from "#/features/artists/components/ArtistCard";
import { GenreGrid } from "#/features/genres/components/GenreGrid";
import { searchQueries } from "#/features/search/queries";
import type { SearchResults } from "#/features/search/server/search.server";
import {
	SongList,
	SongListSkeleton,
} from "#/features/songs/components/SongList";

const SEARCH_TYPES = ["all", "songs", "albums", "artists"] as const;
type SearchType = (typeof SEARCH_TYPES)[number];

const searchParamsSchema = z.object({
	q: z.string().catch(""),
	type: z.enum(SEARCH_TYPES).catch("all").optional(),
});

export const Route = createFileRoute("/_app/search")({
	component: SearchPage,
	validateSearch: searchParamsSchema,
	loaderDeps: ({ search }) => ({ q: search.q }),
	// Awaited so the server renders the results instead of a skeleton the
	// client would immediately replace (a hydration mismatch).
	loader: async ({ context, deps }) => {
		if (!deps.q.trim()) return;
		await context.queryClient.prefetchQuery(searchQueries.results(deps.q));
	},
	head: () => ({ meta: [{ title: "Search | Tunetalk" }] }),
});

const artistGridClass =
	"grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5";

function SearchPage() {
	const { q, type = "all" } = Route.useSearch();
	const {
		data: results,
		isLoading,
		isError,
		error,
	} = useQuery({
		...searchQueries.results(q),
		// Keep showing the last results while the next query loads.
		placeholderData: keepPreviousData,
	});

	if (!q.trim()) {
		return (
			<>
				<PageHeader
					eyebrow="Search"
					title="Find your next record"
					description="Search Apple Music for artists, songs and albums, or start from a genre."
				/>
				<GenreGrid />
			</>
		);
	}

	return (
		<>
			<PageHeader eyebrow="Search results" title={`“${q}”`} />
			<div className="mb-8">
				<Tabs
					label="Result type"
					tabs={SEARCH_TYPES.map((tab) => ({
						label: tab.charAt(0).toUpperCase() + tab.slice(1),
						link: { to: "/search", search: { q, type: tab }, replace: true },
						isActive: tab === type,
					}))}
				/>
			</div>
			{isLoading ? (
				<>
					<SongListSkeleton count={4} />
					<div className="mt-8">
						<AlbumGridSkeleton count={4} />
					</div>
				</>
			) : isError ? (
				<StatusMessage tone="error">{error.message}</StatusMessage>
			) : results ? (
				<Results results={results} type={type} />
			) : null}
		</>
	);
}

function Results({
	results,
	type,
}: {
	results: SearchResults;
	type: SearchType;
}) {
	const { artists, albums, songs } = results;
	const isEmpty =
		type === "all"
			? artists.length + albums.length + songs.length === 0
			: results[type].length === 0;

	if (isEmpty) {
		return <StatusMessage>Nothing found. Try another search.</StatusMessage>;
	}

	if (type === "songs") return <SongList songs={songs} />;
	if (type === "albums") {
		return (
			<AlbumGrid>
				{albums.map((album) => (
					<AlbumCard album={album} key={album.id} />
				))}
			</AlbumGrid>
		);
	}
	if (type === "artists") {
		return (
			<div className={artistGridClass}>
				{artists.map((artist) => (
					<ArtistCard artist={artist} key={artist.id} />
				))}
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-12">
			{songs.length > 0 && (
				<Section title="Songs">
					<SongList songs={songs.slice(0, 6)} columns={2} />
				</Section>
			)}
			{artists.length > 0 && (
				<Section title="Artists">
					<div className="shelf -mx-4 px-4 sm:-mx-8 sm:px-8">
						{artists.map((artist) => (
							<ArtistCard artist={artist} key={artist.id} />
						))}
					</div>
				</Section>
			)}
			{albums.length > 0 && (
				<Section title="Albums">
					<AlbumShelf albums={albums} />
				</Section>
			)}
		</div>
	);
}
