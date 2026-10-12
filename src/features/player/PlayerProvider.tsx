import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import type { Song } from "#/features/songs/types";

interface PlayerContextValue {
	current: Song | null;
	queue: Song[];
	isPlaying: boolean;
	hasNext: boolean;
	hasPrevious: boolean;
	// Plays `songs` from `song` onward; playing the current song toggles it.
	play: (song: Song, songs?: Song[]) => void;
	toggle: () => void;
	next: () => void;
	previous: () => void;
	close: () => void;
}

interface ProgressContextValue {
	currentTime: number;
	duration: number;
	seek: (seconds: number) => void;
}

const PlayerContext = createContext<PlayerContextValue | null>(null);
// Kept apart from the player so only the progress bar re-renders every tick.
const ProgressContext = createContext<ProgressContextValue | null>(null);

export function isPlayable(song: Song) {
	return !!song.previewUrl;
}

// One <audio> element for the whole app, so a preview keeps playing while
// the user browses. Apple previews are 30 second clips.
export function PlayerProvider({ children }: { children: ReactNode }) {
	const audioRef = useRef<HTMLAudioElement>(null);
	const [queue, setQueue] = useState<Song[]>([]);
	const [index, setIndex] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);

	const current = queue[index] ?? null;
	const hasNext = index < queue.length - 1;
	const hasPrevious = index > 0;

	// Load and start a song whenever the current one changes.
	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;
		if (!current?.previewUrl) {
			audio.pause();
			audio.removeAttribute("src");
			return;
		}
		audio.src = current.previewUrl;
		setCurrentTime(0);
		audio.play().catch(() => setIsPlaying(false));
	}, [current]);

	const play = useCallback(
		(song: Song, songs: Song[] = [song]) => {
			if (current?.id === song.id) {
				const audio = audioRef.current;
				if (audio?.paused) audio.play();
				else audio?.pause();
				return;
			}
			const playable = songs.filter(isPlayable);
			const start = playable.findIndex((item) => item.id === song.id);
			if (start === -1) return;
			setQueue(playable);
			setIndex(start);
		},
		[current],
	);

	const toggle = useCallback(() => {
		const audio = audioRef.current;
		if (!audio || !current) return;
		if (audio.paused) audio.play();
		else audio.pause();
	}, [current]);

	const next = useCallback(() => {
		setIndex((i) => Math.min(i + 1, queue.length - 1));
	}, [queue.length]);

	const previous = useCallback(() => {
		const audio = audioRef.current;
		// Like most players: restart the song unless it only just began.
		if (audio && audio.currentTime > 3) {
			audio.currentTime = 0;
			return;
		}
		setIndex((i) => Math.max(i - 1, 0));
	}, []);

	const close = useCallback(() => {
		setQueue([]);
		setIndex(0);
	}, []);

	const seek = useCallback((seconds: number) => {
		if (audioRef.current) audioRef.current.currentTime = seconds;
	}, []);

	// Lock screen and media keys.
	useEffect(() => {
		if (!("mediaSession" in navigator)) return;
		navigator.mediaSession.metadata = current
			? new MediaMetadata({
					title: current.title,
					artist: current.artist,
					album: current.albumTitle,
					artwork: current.image
						? [{ src: current.image, sizes: "300x300", type: "image/jpeg" }]
						: [],
				})
			: null;
		navigator.mediaSession.setActionHandler("play", toggle);
		navigator.mediaSession.setActionHandler("pause", toggle);
		navigator.mediaSession.setActionHandler("nexttrack", hasNext ? next : null);
		navigator.mediaSession.setActionHandler(
			"previoustrack",
			hasPrevious ? previous : null,
		);
	}, [current, hasNext, hasPrevious, next, previous, toggle]);

	const player = useMemo(
		() => ({
			current,
			queue,
			isPlaying,
			hasNext,
			hasPrevious,
			play,
			toggle,
			next,
			previous,
			close,
		}),
		[
			current,
			queue,
			isPlaying,
			hasNext,
			hasPrevious,
			play,
			toggle,
			next,
			previous,
			close,
		],
	);

	const progress = useMemo(
		() => ({ currentTime, duration, seek }),
		[currentTime, duration, seek],
	);

	return (
		<PlayerContext value={player}>
			<ProgressContext value={progress}>
				{children}
				{/* biome-ignore lint/a11y/useMediaCaption: music previews have no captions */}
				<audio
					ref={audioRef}
					preload="auto"
					onPlay={() => setIsPlaying(true)}
					onPause={() => setIsPlaying(false)}
					onTimeUpdate={(event) =>
						setCurrentTime(event.currentTarget.currentTime)
					}
					onLoadedMetadata={(event) =>
						setDuration(event.currentTarget.duration)
					}
					onEnded={() => (hasNext ? next() : setIsPlaying(false))}
				/>
			</ProgressContext>
		</PlayerContext>
	);
}

export function usePlayer() {
	const player = useContext(PlayerContext);
	if (!player) throw new Error("usePlayer must be used inside PlayerProvider");
	return player;
}

export function usePlayerProgress() {
	const progress = useContext(ProgressContext);
	if (!progress) {
		throw new Error("usePlayerProgress must be used inside PlayerProvider");
	}
	return progress;
}

// Whether `song` is loaded in the player, and whether it's audible.
export function useSongState(song: Pick<Song, "id">) {
	const { current, isPlaying } = usePlayer();
	const isCurrent = current?.id === song.id;
	return { isCurrent, isPlaying: isCurrent && isPlaying };
}
