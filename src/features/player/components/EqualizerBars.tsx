// Three bouncing bars marking the song that's playing.
export function EqualizerBars() {
	return (
		<span aria-hidden className="inline-flex h-3.5 items-end gap-[2px]">
			{[0, 0.25, 0.5].map((delay) => (
				<span
					key={delay}
					className="h-full w-[3px] origin-bottom rounded-full bg-ink animate-eq"
					style={{ animationDelay: `${delay}s` }}
				/>
			))}
		</span>
	);
}
