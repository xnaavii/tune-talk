import { Link } from "@tanstack/react-router";
import { IoPause, IoPlay } from "react-icons/io5";
import { EqualizerBars } from "#/features/player/components/EqualizerBars";
import {
	isPlayable,
	usePlayer,
	useSongState,
} from "#/features/player/PlayerProvider";
import type { Song } from "../types";
import { formatDuration } from "../utils";

interface SongListProps {
	songs: Song[];
	// What plays after a song; defaults to the rest of this list.
	queue?: Song[];
	// "rank" numbers by position; "track" uses the album track number.
	numbering?: "rank" | "track";
	showArtwork?: boolean;
	showAlbum?: boolean;
	// On an album's tracklist, only featured artists need naming.
	albumArtist?: string;
}

// A playable list of songs. Clicking a song plays its preview, then the
// rest of the list.
export function SongList({
	songs,
	queue = songs,
	numbering = "rank",
	showArtwork = true,
	showAlbum = true,
	albumArtist,
}: SongListProps) {
	return (
		<ol className="glass-card flex flex-col p-1.5">
			{songs.map((song, index) => (
				<SongRow
					key={song.id}
					song={song}
					queue={queue}
					number={
						numbering === "rank" ? index + 1 : (song.trackNumber ?? index + 1)
					}
					showArtwork={showArtwork}
					showAlbum={showAlbum}
					showArtist={song.artist !== albumArtist}
				/>
			))}
		</ol>
	);
}

interface SongRowProps {
	song: Song;
	queue: Song[];
	number: number;
	showArtwork: boolean;
	showAlbum: boolean;
	showArtist: boolean;
}

function SongRow({
	song,
	queue,
	number,
	showArtwork,
	showAlbum,
	showArtist,
}: SongRowProps) {
	const { play } = usePlayer();
	const { isCurrent, isPlaying } = useSongState(song);
	const playable = isPlayable(song);

	return (
		<li
			className={`group grid items-center gap-3 rounded-xl px-2 py-1.5 transition-colors hover:bg-glass/10 ${
				isCurrent ? "bg-glass/15" : ""
			} ${
				showAlbum
					? "grid-cols-[1.75rem_1fr_auto] md:grid-cols-[1.75rem_minmax(0,3fr)_minmax(0,2fr)_auto]"
					: "grid-cols-[1.75rem_1fr_auto]"
			}`}
		>
			<button
				type="button"
				disabled={!playable}
				onClick={() => play(song, queue)}
				aria-label={
					isPlaying ? `Pause ${song.title}` : `Play preview of ${song.title}`
				}
				className="flex size-7 cursor-pointer items-center justify-center rounded-full disabled:cursor-not-allowed"
			>
				{/* Number at rest, bars while playing, play/pause on hover */}
				<span
					className={`text-sm font-semibold tabular-nums text-ink/60 ${
						isCurrent ? "hidden" : playable ? "group-hover:hidden" : ""
					}`}
				>
					{number}
				</span>
				{isPlaying && (
					<span className="group-hover:hidden">
						<EqualizerBars />
					</span>
				)}
				{playable && (
					<span
						className={
							isCurrent && !isPlaying ? "flex" : "hidden group-hover:flex"
						}
					>
						{isPlaying ? (
							<IoPause aria-hidden className="size-4" />
						) : (
							<IoPlay aria-hidden className="size-4" />
						)}
					</span>
				)}
			</button>

			<div className="flex min-w-0 items-center gap-3">
				{showArtwork && (
					<img
						src={song.image ?? undefined}
						alt=""
						loading="lazy"
						className="size-10 shrink-0 rounded-md bg-glass/10 object-cover shadow-soft"
					/>
				)}
				<div className="flex min-w-0 flex-col">
					<div className="flex min-w-0 items-center gap-1.5">
						<button
							type="button"
							disabled={!playable}
							onClick={() => play(song, queue)}
							className="truncate text-left text-[15px] font-semibold text-ink cursor-pointer disabled:cursor-default"
						>
							{song.title}
						</button>
						{song.explicit && (
							<span
								title="Explicit"
								className="shrink-0 rounded-[3px] bg-ink/20 px-1 text-[9px] font-bold leading-[14px] text-ink/80"
							>
								E
							</span>
						)}
					</div>
					{showArtist &&
						(song.artistId ? (
							<Link
								to="/artists/$artistId"
								params={{ artistId: song.artistId }}
								className="truncate text-sm text-ink/70 hover:text-ink hover:underline"
							>
								{song.artist}
							</Link>
						) : (
							<span className="truncate text-sm text-ink/70">
								{song.artist}
							</span>
						))}
				</div>
			</div>

			{showAlbum &&
				(song.albumId ? (
					<Link
						to="/albums/$albumId"
						params={{ albumId: song.albumId }}
						className="hidden truncate text-sm text-ink/60 hover:text-ink hover:underline md:block"
					>
						{song.albumTitle}
					</Link>
				) : (
					<span className="hidden md:block" />
				))}

			<span className="text-xs tabular-nums text-ink/60">
				{formatDuration(song.durationMs)}
			</span>
		</li>
	);
}

export function SongListSkeleton({ count = 5 }: { count?: number }) {
	return (
		<output
			aria-label="Loading songs"
			className="glass-card flex flex-col p-1.5"
		>
			{Array.from({ length: count }, (_, i) => (
				<div
					// biome-ignore lint/suspicious/noArrayIndexKey: static placeholders
					key={i}
					className="flex animate-pulse items-center gap-3 px-2 py-1.5"
				>
					<div className="w-7" />
					<div className="size-10 rounded-md bg-glass/15" />
					<div className="flex flex-1 flex-col gap-2">
						<div className="h-3.5 w-1/3 rounded bg-glass/15" />
						<div className="h-3 w-1/4 rounded bg-glass/10" />
					</div>
				</div>
			))}
		</output>
	);
}
