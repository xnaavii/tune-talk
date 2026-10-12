import defaultCover from "#/assets/record-blue.jpg";

interface VinylProps {
	// Cover art printed on the centre label; plain label colour without one.
	image?: string | null;
	spinning?: boolean;
	className?: string;
}

// A record drawn in CSS: grooves and the centre label turn together, the
// light sheen stays put, the way it does on a real turntable. Callers pass
// its position (relative or absolute) in `className`.
export function Vinyl({ image, spinning = false, className = "" }: VinylProps) {
	return (
		<div
			aria-hidden
			className={`aspect-square rounded-full bg-vinyl shadow-sleeve ${className}`}
		>
			<div
				className={`absolute inset-0 rounded-full animate-record ${
					spinning ? "" : "[animation-play-state:paused]"
				}`}
				style={{
					background:
						"repeating-radial-gradient(circle at center, rgb(255 255 255 / 0.045) 0 1px, transparent 1px 3px), radial-gradient(circle at center, #1d1f25 0%, #0d0e12 68%, #050507 100%)",
				}}
			>
				{/* Run-out groove around the label */}
				<div className="absolute inset-[30%] rounded-full ring-1 ring-white/10" />
				<div className="absolute inset-[34%] overflow-hidden rounded-full bg-label">
					<img
						src={image ?? defaultCover}
						alt=""
						loading="lazy"
						className="size-full object-cover"
					/>
				</div>
				{/* Spindle hole */}
				<div className="absolute inset-[48.5%] rounded-full bg-navy-deep ring-1 ring-black/40" />
			</div>
			<div
				className="pointer-events-none absolute inset-0 rounded-full"
				style={{
					background:
						"conic-gradient(from 35deg, transparent 0 8%, rgb(255 255 255 / 0.14) 13%, transparent 20% 50%, rgb(255 255 255 / 0.09) 60%, transparent 68%)",
				}}
			/>
		</div>
	);
}
