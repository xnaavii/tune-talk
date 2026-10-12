const sizes = {
	sm: { text: "text-[26px]", disc: "size-6" },
	md: { text: "text-[32px] sm:text-[40px]", disc: "size-7 sm:size-9" },
	lg: { text: "text-[64px] sm:text-[96px]", disc: "size-14 sm:size-20" },
};

// Wordmark with a small record for the "o".
export function Logo({ size }: { size: keyof typeof sizes }) {
	return (
		<span
			className={`display-title inline-flex items-center gap-[0.18em] italic leading-none text-ink ${sizes[size].text}`}
		>
			<span
				aria-hidden
				className={`${sizes[size].disc} shrink-0 rounded-full not-italic`}
				style={{
					background:
						"radial-gradient(circle, var(--color-navy-deep) 0 7%, var(--color-label) 8% 30%, #15161b 31% 100%), repeating-radial-gradient(circle, rgb(255 255 255 / 0.08) 0 1px, transparent 1px 3px)",
					backgroundBlendMode: "screen",
				}}
			/>
			Tunetalk
		</span>
	);
}
