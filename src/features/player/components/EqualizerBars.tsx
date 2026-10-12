// Three bouncing bars marking the song that's playing.
export function EqualizerBars({ paused = false }: { paused?: boolean }) {
	return (
		<span aria-hidden className="inline-flex h-3.5 items-end gap-[2px]">
			{[0, 0.25, 0.5].map((delay) => (
				<span
					key={delay}
					className={`h-full w-[3px] origin-bottom rounded-full bg-label animate-eq ${
						paused ? "[animation-play-state:paused]" : ""
					}`}
					style={{ animationDelay: `${delay}s` }}
				/>
			))}
		</span>
	);
}
