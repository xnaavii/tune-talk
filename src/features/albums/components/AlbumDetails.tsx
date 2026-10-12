import { Link } from "@tanstack/react-router";
import { SiApplemusic } from "react-icons/si";
import { Vinyl } from "#/components/Vinyl";
import { PlayButton } from "#/features/player/components/PlayButton";
import { usePlayer } from "#/features/player/PlayerProvider";
import { StarRating } from "#/features/reviews/components/StarRating";
import { formatTotalDuration } from "#/features/songs/utils";
import type { AlbumWithTracks } from "../types";
import { displayTitle, isSingleOrEp, releaseYear } from "../utils";
import { AlbumCover } from "./AlbumCover";

// Album page hero: the sleeve with its record pulled halfway out, spinning
// while one of its songs plays.
export function AlbumDetails({ album }: { album: AlbumWithTracks }) {
	const { current, isPlaying } = usePlayer();
	const isAlbumPlaying = isPlaying && current?.albumId === album.id;
	const songCount = album.tracks.length || album.trackCount;

	return (
		<header className="grid grid-cols-1 items-end gap-8 md:grid-cols-[minmax(0,340px)_1fr]">
			<div className="relative w-[72%] max-w-[300px] md:w-[80%] md:max-w-none">
				<Vinyl
					image={album.image}
					spinning={isAlbumPlaying}
					className={`absolute top-[3%] left-0 w-[94%] transition-transform duration-700 ease-out ${
						isAlbumPlaying ? "translate-x-[34%]" : "translate-x-[26%]"
					}`}
				/>
				<AlbumCover
					album={album}
					className="relative aspect-square w-full rounded-[4px] object-cover shadow-sleeve"
				/>
			</div>

			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-2">
					<p className="eyebrow">
						{[
							isSingleOrEp(album) ? "Single" : "Album",
							releaseYear(album),
							album.genre,
						]
							.filter(Boolean)
							.join(" · ")}
					</p>
					<h1 className="display-title text-4xl text-ink sm:text-6xl">
						{displayTitle(album)}
					</h1>
					<p className="text-lg text-ink/85">
						{album.artistId ? (
							<Link
								to="/artists/$artistId"
								params={{ artistId: album.artistId }}
								className="font-semibold hover:underline"
							>
								{album.artist}
							</Link>
						) : (
							<span className="font-semibold">{album.artist}</span>
						)}
						{songCount > 0 && (
							<span className="text-ink/55">
								{" "}
								· {songCount} {songCount === 1 ? "song" : "songs"}
								{album.tracks.length > 0 &&
									`, ${formatTotalDuration(album.tracks)}`}
							</span>
						)}
					</p>
				</div>

				<StarRating albumId={album.id} />

				<div className="flex items-center gap-3">
					<PlayButton songs={album.tracks} label="Play album previews" />
					{album.appleMusicUrl && (
						<a
							href={album.appleMusicUrl}
							target="_blank"
							rel="noreferrer"
							className="inline-flex items-center gap-2 rounded-full bg-glass/15 px-4 py-2 text-sm font-medium text-ink ring-1 ring-ink/15 transition-colors hover:bg-glass/25"
						>
							<SiApplemusic aria-hidden className="size-4 text-apple-music" />
							Listen on Apple Music
						</a>
					)}
				</div>
			</div>
		</header>
	);
}
