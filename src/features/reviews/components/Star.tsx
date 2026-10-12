import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";

interface StarProps {
	filled?: boolean;
	half?: boolean;
	size?: number;
	// Gold for the user's own or hovered rating, white for the average.
	highlighted?: boolean;
}

export function Star({
	filled = false,
	half = false,
	size = 16,
	highlighted = false,
}: StarProps) {
	const Icon = filled ? IoStar : half ? IoStarHalf : IoStarOutline;
	return (
		<Icon
			aria-hidden
			size={size}
			className={`pointer-events-none transition-colors duration-200 ${
				highlighted ? "text-star" : "text-ink"
			}`}
		/>
	);
}

// Read-only star row for showing a rating.
export function StarRow({
	rating,
	size = 14,
}: {
	rating: number;
	size?: number;
}) {
	const full = Math.floor(rating);
	const half = rating - full >= 0.5;

	return (
		<span
			role="img"
			aria-label={`${rating.toFixed(1)} out of 5 stars`}
			className="inline-flex items-center gap-0.5"
		>
			{Array.from({ length: 5 }, (_, i) => (
				<Star
					// biome-ignore lint/suspicious/noArrayIndexKey: fixed-length star list
					key={i}
					size={size}
					filled={i < full}
					half={i === full && half}
					highlighted
				/>
			))}
		</span>
	);
}
