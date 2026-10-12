import { Link } from "@tanstack/react-router";
import { Vinyl } from "#/components/Vinyl";
import type { Artist } from "../types";

// An artist as a record: the catalog has no artist photos, so one of their
// covers sits on the label.
export function ArtistCard({ artist }: { artist: Artist }) {
	return (
		<Link
			to="/artists/$artistId"
			params={{ artistId: artist.id }}
			className="group flex flex-col items-center gap-3 rounded-lg text-center"
		>
			<Vinyl
				image={artist.image}
				className="relative w-full transition-transform duration-700 ease-out group-hover:rotate-[160deg]"
			/>
			<div className="flex w-full min-w-0 flex-col">
				<p className="truncate text-[15px] font-semibold text-ink group-hover:underline">
					{artist.name}
				</p>
				<p className="truncate font-mono text-[11px] uppercase tracking-wider text-ink/50">
					{artist.genre ?? "Artist"}
				</p>
			</div>
		</Link>
	);
}
