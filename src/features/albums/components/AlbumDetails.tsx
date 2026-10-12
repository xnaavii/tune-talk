import { Link } from "@tanstack/react-router";
import { SiApplemusic } from "react-icons/si";
import { PlayButton } from "#/features/player/components/PlayButton";
import { StarRating } from "#/features/reviews/components/StarRating";
import { formatTotalDuration } from "#/features/songs/utils";
import type { AlbumWithTracks } from "../types";
import { releaseYear } from "../utils";
import { AlbumCover } from "./AlbumCover";

export function AlbumDetails({ album }: { album: AlbumWithTracks }) {
	const songCount = album.tracks.length || album.trackCount;

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
					{album.artistId ? (
						<Link
							to="/artists/$artistId"
							params={{ artistId: album.artistId }}
							className="w-fit text-lg text-ink/85 hover:text-ink hover:underline"
						>
							{album.artist}
						</Link>
					) : (
						<p className="text-lg text-ink/85">{album.artist}</p>
					)}
					<p className="text-sm text-ink/60">
						{[
							releaseYear(album),
							album.genre,
							songCount > 0 &&
								`${songCount} ${songCount === 1 ? "song" : "songs"}`,
							album.tracks.length > 0 && formatTotalDuration(album.tracks),
						]
							.filter(Boolean)
							.join(" · ")}
					</p>
				</div>

				<StarRating albumId={album.id} />

				<div className="flex flex-wrap items-center gap-2">
					<PlayButton songs={album.tracks} label="Play previews" />
					{album.appleMusicUrl && (
						<a
							href={album.appleMusicUrl}
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
	);
}
