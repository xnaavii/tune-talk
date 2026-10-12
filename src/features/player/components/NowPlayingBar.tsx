import { Link } from "@tanstack/react-router";
import {
	IoClose,
	IoPause,
	IoPlay,
	IoPlaySkipBack,
	IoPlaySkipForward,
} from "react-icons/io5";
import { formatDuration } from "#/features/songs/utils";
import { usePlayer, usePlayerProgress } from "../PlayerProvider";

const controlClass =
	"inline-flex size-8 cursor-pointer items-center justify-center rounded-full text-ink/80 transition-colors hover:bg-glass/20 hover:text-ink disabled:cursor-default disabled:opacity-30 disabled:hover:bg-transparent";

// Glass bar under the main panel while a preview is loaded.
export function NowPlayingBar() {
	const {
		current,
		isPlaying,
		hasNext,
		hasPrevious,
		toggle,
		next,
		previous,
		close,
	} = usePlayer();

	if (!current) return null;

	return (
		<section
			aria-label="Now playing"
			className="glass-panel shrink-0 flex items-center gap-3 px-3 py-2.5 md:px-5"
		>
			<img
				src={current.image ?? undefined}
				alt=""
				className="size-11 shrink-0 rounded-md object-cover shadow-soft"
			/>
			<div className="flex min-w-0 flex-1 flex-col">
				{current.albumId ? (
					<Link
						to="/albums/$albumId"
						params={{ albumId: current.albumId }}
						className="truncate text-sm font-semibold hover:underline"
					>
						{current.title}
					</Link>
				) : (
					<p className="truncate text-sm font-semibold">{current.title}</p>
				)}
				<p className="truncate text-xs text-ink/70">
					{current.artist}
					<span className="text-ink/50"> · Preview</span>
				</p>
			</div>

			<ProgressBar />

			<div className="flex shrink-0 items-center gap-1">
				<button
					type="button"
					aria-label="Previous"
					onClick={previous}
					disabled={!hasPrevious}
					className={`${controlClass} hidden sm:inline-flex`}
				>
					<IoPlaySkipBack aria-hidden className="size-4" />
				</button>
				<button
					type="button"
					aria-label={isPlaying ? "Pause" : "Play"}
					onClick={toggle}
					className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full bg-ink text-navy transition-colors hover:bg-glass"
				>
					{isPlaying ? (
						<IoPause aria-hidden className="size-4" />
					) : (
						<IoPlay aria-hidden className="size-4" />
					)}
				</button>
				<button
					type="button"
					aria-label="Next"
					onClick={next}
					disabled={!hasNext}
					className={controlClass}
				>
					<IoPlaySkipForward aria-hidden className="size-4" />
				</button>
				<button
					type="button"
					aria-label="Close player"
					onClick={close}
					className={controlClass}
				>
					<IoClose aria-hidden className="size-[18px]" />
				</button>
			</div>
		</section>
	);
}

function ProgressBar() {
	const { currentTime, duration, seek } = usePlayerProgress();
	const max = duration || 30;
	const percent = Math.min(100, (currentTime / max) * 100);

	return (
		<div className="hidden w-full max-w-xs items-center gap-2 md:flex">
			<span className="w-7 text-right text-[11px] tabular-nums text-ink/60">
				{formatDuration(currentTime * 1000)}
			</span>
			<input
				type="range"
				aria-label="Seek"
				min={0}
				max={max}
				step={0.1}
				value={currentTime}
				onChange={(event) => seek(Number(event.target.value))}
				className="seek flex-1"
				style={{
					background: `linear-gradient(to right, var(--color-ink) ${percent}%, rgb(248 249 250 / 0.2) ${percent}%)`,
				}}
			/>
			<span className="w-7 text-[11px] tabular-nums text-ink/60">
				{formatDuration(max * 1000)}
			</span>
		</div>
	);
}
