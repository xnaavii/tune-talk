import { Link } from "@tanstack/react-router";
import { GENRES } from "../genres";

// Genre shortcuts as glass tiles.
export function GenreGrid() {
	return (
		<div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
			{GENRES.map((genre) => (
				<Link
					key={genre.slug}
					to="/genres/$genre"
					params={{ genre: genre.slug }}
					className="glass-card px-4 py-3 text-sm font-semibold ring-1 ring-ink/10 transition-all hover:bg-glass/20 hover:ring-ink/40"
				>
					{genre.name}
				</Link>
			))}
		</div>
	);
}
