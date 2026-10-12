import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageHeader, Section } from "#/components/PageHeader";
import { StatusMessage } from "#/components/StatusMessage";
import { AlbumCard } from "#/features/albums/components/AlbumCard";
import {
	AlbumGrid,
	AlbumGridSkeleton,
} from "#/features/albums/components/AlbumGrid";
import { findGenre, type Genre } from "#/features/genres/genres";
import { genreQueries } from "#/features/genres/queries";
import { PlayButton } from "#/features/player/components/PlayButton";
import { SongList } from "#/features/songs/components/SongList";

export const Route = createFileRoute("/_app/genres/$genre")({
	params: {
		parse: ({ genre }) => {
			const found = findGenre(genre);
			if (!found) throw notFound();
			return { genre: found.slug };
		},
	},
	loader: ({ context, params }) =>
		context.queryClient.ensureQueryData(genreQueries.details(params.genre)),
	head: ({ params }) => ({
		meta: [{ title: `${findGenre(params.genre)?.name ?? "Genre"} | Tunetalk` }],
	}),
	component: GenrePage,
	pendingComponent: GenrePending,
	notFoundComponent: () => <StatusMessage>Genre not found.</StatusMessage>,
});

function genreHeader(genre: Genre) {
	return (
		<PageHeader
			title={genre.name}
			description={`Albums and songs filed under ${genre.name} on Apple Music.`}
		/>
	);
}

function GenrePage() {
	const params = Route.useParams();
	const genre = findGenre(params.genre) as Genre;
	const { data } = useSuspenseQuery(genreQueries.details(genre.slug));

	if (data.albums.length + data.songs.length === 0) {
		return (
			<>
				{genreHeader(genre)}
				<StatusMessage>Nothing in this genre right now.</StatusMessage>
			</>
		);
	}

	const songs = data.songs.slice(0, 10);

	return (
		<>
			{genreHeader(genre)}
			<div className="flex flex-col gap-8">
				{songs.length > 0 && (
					<Section title="Songs">
						<PlayButton songs={songs} label={`Play ${genre.name}`} />
						<SongList songs={songs} />
					</Section>
				)}
				{data.albums.length > 0 && (
					<Section title="Albums">
						<AlbumGrid>
							{data.albums.map((album) => (
								<AlbumCard key={album.id} album={album} />
							))}
						</AlbumGrid>
					</Section>
				)}
			</div>
		</>
	);
}

function GenrePending() {
	const params = Route.useParams();
	return (
		<>
			{genreHeader(findGenre(params.genre) as Genre)}
			<AlbumGridSkeleton />
		</>
	);
}
