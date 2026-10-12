import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";

interface StarProps {
	filled?: boolean;
	half?: boolean;
	size?: number;
	color?: string;
}

export function Star({
	filled = false,
	half = false,
	size = 16,
	color = "#FFFFFF",
}: StarProps) {
	const styleClasses = "absolute top-0 left-0 transition-opacity duration-300";

	return (
		<div className="relative w-[1em] h-[1em] p-[10px]">
			<IoStarOutline
				className={styleClasses}
				style={{ fill: color, opacity: !filled && !half ? 1 : 0 }}
				size={size}
			/>
			<IoStarHalf
				className={styleClasses}
				style={{ fill: color, opacity: half ? 1 : 0 }}
				size={size}
			/>
			<IoStar
				className={styleClasses}
				style={{ fill: color, opacity: filled ? 1 : 0 }}
				size={size}
			/>
		</div>
	);
}
