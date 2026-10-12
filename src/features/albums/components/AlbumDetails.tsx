import { FaSpotify } from "react-icons/fa6";
import { StarRating } from "#/features/reviews/components/StarRating";
import type { Album } from "../types";
import { releaseYear } from "../utils";
import { AlbumCover } from "./AlbumCover";

export function AlbumDetails({ album }: { album: Album }) {
	return (
		<figure className="grid grid-cols-1 gap-5 sm:grid-cols-[200px_1fr] md:grid-cols-[240px_1fr]">
			<AlbumCover
				album={album}
				className="aspect-square w-full max-w-[280px] rounded-lg object-cover shadow-lg sm:max-w-none"
			/>

			<figcaption className="flex flex-col justify-end gap-4">
				<div className="flex flex-col gap-1">
					<h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
						{album.title}
					</h2>
					<p className="text-lg text-ink/85">{album.artist}</p>
					<p className="text-sm text-ink/60">{releaseYear(album)}</p>
				</div>

				<StarRating albumId={album.id} />

				{album.spotifyUrl && (
					<a
						href={album.spotifyUrl}
						target="_blank"
						rel="noreferrer"
						className="inline-flex w-fit items-center gap-2 rounded-full bg-navy/40 px-3 py-1.5 text-xs font-medium text-ink ring-1 ring-ink/15 transition-colors hover:bg-navy/60"
					>
						<FaSpotify aria-hidden className="size-4 text-spotify" />
						Listen on Spotify
					</a>
				)}
			</figcaption>
		</figure>
	);
}
