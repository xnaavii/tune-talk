import { Link } from "@tanstack/react-router";
import {
	IoClose,
	IoPause,
	IoPlay,
	IoPlaySkipBack,
	IoPlaySkipForward,
} from "react-icons/io5";
import { Vinyl } from "#/components/Vinyl";
import { formatDuration } from "#/features/songs/utils";
import { usePlayer, usePlayerProgress } from "../PlayerProvider";

const controlClass =
	"inline-flex size-9 cursor-pointer items-center justify-center rounded-full text-ink/80 transition-colors hover:bg-glass/15 hover:text-ink disabled:cursor-default disabled:opacity-30 disabled:hover:bg-transparent";

// The turntable docked at the bottom of the app while a preview is loaded.
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
			className="glass-panel relative mx-2 mb-2 grid grid-cols-[1fr_auto] items-center gap-3 rounded-2xl bg-navy-deep/70 px-3 py-2.5 sm:mx-0 sm:mb-0 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_minmax(0,1fr)] md:px-4"
		>
			<div className="flex min-w-0 items-center gap-3">
				<Vinyl
					image={current.image}
					spinning={isPlaying}
					className="relative size-12 shrink-0"
				/>
				<div className="flex min-w-0 flex-col">
					{current.albumId ? (
						<Link
							to="/albums/$albumId"
							params={{ albumId: current.albumId }}
							className="truncate text-sm font-semibold text-ink hover:underline"
						>
							{current.title}
						</Link>
					) : (
						<p className="truncate text-sm font-semibold text-ink">
							{current.title}
						</p>
					)}
					{current.artistId ? (
						<Link
							to="/artists/$artistId"
							params={{ artistId: current.artistId }}
							className="truncate text-xs text-ink/65 hover:text-ink hover:underline"
						>
							{current.artist}
						</Link>
					) : (
						<p className="truncate text-xs text-ink/65">{current.artist}</p>
					)}
				</div>
			</div>

			<div className="flex flex-col items-center gap-1">
				<div className="flex items-center gap-1">
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
						className="inline-flex size-10 cursor-pointer items-center justify-center rounded-full bg-ink text-navy-deep transition-transform hover:scale-105 active:scale-95"
					>
						{isPlaying ? (
							<IoPause aria-hidden className="size-5" />
						) : (
							<IoPlay aria-hidden className="size-5 translate-x-[1px]" />
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
				</div>
				<ProgressBar />
			</div>

			<div className="hidden items-center justify-end gap-3 md:flex">
				<span className="eyebrow rounded-full px-2 py-1 ring-1 ring-ink/15">
					Preview
				</span>
				<button
					type="button"
					aria-label="Close player"
					onClick={close}
					className={controlClass}
				>
					<IoClose aria-hidden className="size-5" />
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
		<>
			{/* Hairline across the top edge on phones */}
			<div className="absolute inset-x-4 top-0 h-0.5 overflow-hidden rounded-full bg-ink/10 md:hidden">
				<div className="h-full bg-label" style={{ width: `${percent}%` }} />
			</div>
			<div className="hidden w-full max-w-md items-center gap-2 md:flex">
				<span className="w-8 text-right font-mono text-[10px] tabular-nums text-ink/50">
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
					className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-ink/15 accent-label"
					style={{
						background: `linear-gradient(to right, var(--color-label) ${percent}%, rgb(248 249 250 / 0.15) ${percent}%)`,
					}}
				/>
				<span className="w-8 font-mono text-[10px] tabular-nums text-ink/50">
					{formatDuration(max * 1000)}
				</span>
			</div>
		</>
	);
}
