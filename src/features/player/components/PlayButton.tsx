import { IoPause, IoPlay } from "react-icons/io5";
import type { Song } from "#/features/songs/types";
import { isPlayable, usePlayer } from "../PlayerProvider";

const sizes = {
	md: { button: "size-10", icon: "size-4" },
	lg: { button: "size-14", icon: "size-6" },
};

interface PlayButtonProps {
	// The first song to play, and the list it plays through.
	songs: Song[];
	label: string;
	size?: keyof typeof sizes;
}

// The round label-coloured button that starts a list of previews, or
// pauses it when one of its songs is playing.
export function PlayButton({ songs, label, size = "lg" }: PlayButtonProps) {
	const { play, toggle, current, isPlaying } = usePlayer();
	const playable = songs.filter(isPlayable);
	const first = playable[0];
	const isFromList = !!current && playable.some((s) => s.id === current.id);
	const showPause = isFromList && isPlaying;

	if (!first) return null;

	return (
		<button
			type="button"
			aria-label={showPause ? "Pause" : label}
			title={showPause ? "Pause" : label}
			onClick={() => (isFromList ? toggle() : play(first, playable))}
			className={`${sizes[size].button} inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full bg-label text-navy-deep shadow-sleeve transition-transform hover:scale-105 active:scale-95`}
		>
			{showPause ? (
				<IoPause aria-hidden className={sizes[size].icon} />
			) : (
				<IoPlay
					aria-hidden
					className={`${sizes[size].icon} translate-x-[1px]`}
				/>
			)}
		</button>
	);
}
