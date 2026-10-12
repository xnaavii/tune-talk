import { IoPause, IoPlay } from "react-icons/io5";
import type { Song } from "#/features/songs/types";
import { isPlayable, usePlayer } from "../PlayerProvider";

interface PlayButtonProps {
	// The songs to play, in order.
	songs: Song[];
	label: string;
}

// Glass pill that plays a list of previews, or pauses it when one of its
// songs is playing.
export function PlayButton({ songs, label }: PlayButtonProps) {
	const { play, toggle, current, isPlaying } = usePlayer();
	const playable = songs.filter(isPlayable);
	const first = playable[0];
	const isFromList = !!current && playable.some((s) => s.id === current.id);
	const showPause = isFromList && isPlaying;

	if (!first) return null;

	return (
		<button
			type="button"
			onClick={() => (isFromList ? toggle() : play(first, playable))}
			className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-full bg-ink px-3.5 py-1.5 text-xs font-semibold text-navy shadow-soft transition-colors hover:bg-glass"
		>
			{showPause ? (
				<IoPause aria-hidden className="size-3.5" />
			) : (
				<IoPlay aria-hidden className="size-3.5" />
			)}
			{showPause ? "Pause" : label}
		</button>
	);
}
