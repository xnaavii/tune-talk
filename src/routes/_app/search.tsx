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
					title="Search"
					description="Search for an artist, song or album, or browse a genre."
				/>
				<GenreGrid />
			</>
		);
	}

	return (
		<>
			<PageHeader title={`Results for "${q}"`} />
			<div className="mb-5">
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
				<div className="flex flex-col gap-8">
					<SongListSkeleton count={4} />
					<AlbumGridSkeleton />
				</div>
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
			<AlbumGrid>
				{artists.map((artist) => (
					<ArtistCard artist={artist} key={artist.id} />
				))}
			</AlbumGrid>
		);
	}

	return (
		<div className="flex flex-col gap-8">
			{artists.length > 0 && (
				<Section title="Artists">
					<AlbumGrid>
						{artists.slice(0, 3).map((artist) => (
							<ArtistCard artist={artist} key={artist.id} />
						))}
					</AlbumGrid>
				</Section>
			)}
			{songs.length > 0 && (
				<Section title="Songs">
					<SongList songs={songs.slice(0, 5)} />
				</Section>
			)}
			{albums.length > 0 && (
				<Section title="Albums">
					<AlbumGrid>
						{albums.slice(0, 9).map((album) => (
							<AlbumCard album={album} key={album.id} />
						))}
					</AlbumGrid>
				</Section>
			)}
		</div>
	);
}
