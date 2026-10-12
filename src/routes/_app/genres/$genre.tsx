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
import {
	SongList,
	SongListSkeleton,
} from "#/features/songs/components/SongList";

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

function GenreHeader({ genre }: { genre: Genre }) {
	return (
		<div
			className="-mx-4 -mt-4 mb-4 px-4 pt-10 pb-1 sm:-mx-8 sm:px-8"
			style={{
				background: `linear-gradient(to bottom, oklch(0.55 0.16 ${genre.hue} / 0.45), transparent)`,
			}}
		>
			<PageHeader
				eyebrow="Genre crate"
				title={genre.name}
				description={`Albums and songs filed under ${genre.name} on Apple Music.`}
			/>
		</div>
	);
}

function GenrePage() {
	const params = Route.useParams();
	const genre = findGenre(params.genre) as Genre;
	const { data } = useSuspenseQuery(genreQueries.details(genre.slug));

	if (data.albums.length + data.songs.length === 0) {
		return (
			<>
				<GenreHeader genre={genre} />
				<StatusMessage>This crate is empty right now.</StatusMessage>
			</>
		);
	}

	return (
		<>
			<GenreHeader genre={genre} />
			<div className="flex flex-col gap-12">
				{data.songs.length > 0 && (
					<Section
						title={
							<span className="flex items-center gap-3">
								Songs
								<PlayButton
									songs={data.songs}
									label={`Play ${genre.name}`}
									size="md"
								/>
							</span>
						}
					>
						<SongList songs={data.songs.slice(0, 10)} columns={2} />
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
	const genre = findGenre(params.genre) as Genre;
	return (
		<>
			<GenreHeader genre={genre} />
			<SongListSkeleton />
			<div className="mt-10">
				<AlbumGridSkeleton />
			</div>
		</>
	);
}
