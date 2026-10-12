import { Link } from "@tanstack/react-router";
import { GENRES } from "../genres";

// Genre crates as coloured tiles, each with a record tucked in the corner.
export function GenreGrid() {
	return (
		<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
			{GENRES.map((genre) => (
				<Link
					key={genre.slug}
					to="/genres/$genre"
					params={{ genre: genre.slug }}
					className="group relative flex h-24 overflow-hidden rounded-xl p-4 shadow-sleeve sm:h-28"
					style={{
						background: `linear-gradient(135deg, oklch(0.55 0.16 ${genre.hue}), oklch(0.32 0.1 ${genre.hue + 30}))`,
					}}
				>
					<span className="display-title relative z-10 text-xl text-white sm:text-2xl">
						{genre.name}
					</span>
					<span
						aria-hidden
						className="absolute -right-6 -bottom-8 size-24 rounded-full bg-vinyl shadow-sleeve transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-90 sm:size-28"
						style={{
							background: `radial-gradient(circle, var(--color-navy-deep) 0 5%, oklch(0.75 0.14 ${genre.hue}) 6% 30%, transparent 31%), repeating-radial-gradient(circle, rgb(255 255 255 / 0.06) 0 1px, transparent 1px 3px), #0d0e12`,
						}}
					/>
				</Link>
			))}
		</div>
	);
}
