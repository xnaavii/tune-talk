import { Link } from "@tanstack/react-router";
import defaultCover from "#/assets/record-blue.webp";
import type { Artist } from "../types";

// Artist row card, matching AlbumCard: the catalog has no artist photos, so
// one of their covers stands in, cropped round.
export function ArtistCard({ artist }: { artist: Artist }) {
	const image = artist.image ?? defaultCover;

	return (
		<Link
			to="/artists/$artistId"
			params={{ artistId: artist.id }}
			className="group block rounded-2xl focus-visible:outline-offset-2"
		>
			<figure className="relative overflow-hidden rounded-2xl ring-1 ring-ink/10 transition-all duration-300 group-hover:ring-ink/40 group-hover:-translate-y-0.5">
				<div
					aria-hidden
					className="absolute inset-0 scale-110 bg-cover bg-center blur-[32px]"
					style={{ backgroundImage: `url("${image}")` }}
				/>
				<div className="relative flex items-center gap-3 bg-navy/25 p-2.5">
					<img
						src={image}
						alt=""
						loading="lazy"
						className="size-16 shrink-0 rounded-full object-cover shadow-soft"
					/>
					<figcaption className="flex min-w-0 flex-col gap-0.5">
						<p className="truncate text-[15px] font-semibold group-hover:underline">
							{artist.name}
						</p>
						<p className="truncate text-sm text-ink/85">Artist</p>
						{artist.genre && (
							<p className="text-xs text-ink/60">{artist.genre}</p>
						)}
					</figcaption>
				</div>
			</figure>
		</Link>
	);
}
