const sizes = {
	sm: "text-[24px] sm:text-[28px] font-bold",
	md: "text-[36px] sm:text-[48px] font-bold",
	lg: "text-[64px] sm:text-[96px] font-semibold",
};

export function Logo({ size }: { size: keyof typeof sizes }) {
	return (
		<h1 className={`tracking-[-0.06em] leading-none ${sizes[size]} text-ink`}>
			Tunetalk
		</h1>
	);
}
