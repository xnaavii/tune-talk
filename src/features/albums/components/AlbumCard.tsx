import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Vinyl } from "#/components/Vinyl";
import type { Album } from "../types";
import { displayTitle, isSingleOrEp, releaseYear } from "../utils";
import { AlbumCover } from "./AlbumCover";

interface AlbumCardProps {
	album: Album;
	// Extra detail after the year, such as a rating.
	meta?: ReactNode;
}

// An album as a sleeve with its record peeking out; hovering pulls the
// record further out and gives it a turn.
export function AlbumCard({ album, meta }: AlbumCardProps) {
	return (
		<Link
			to="/albums/$albumId"
			params={{ albumId: album.id }}
			className="group flex flex-col gap-3 rounded-lg focus-visible:outline-offset-4"
		>
			<div className="relative aspect-square">
				<Vinyl
					image={album.image}
					className="absolute top-[6%] right-0 w-[88%] transition-transform duration-500 ease-out group-hover:translate-x-[14%] group-hover:rotate-90"
				/>
				<AlbumCover
					album={album}
					loading="lazy"
					className="relative aspect-square w-[88%] rounded-[4px] object-cover shadow-sleeve transition-transform duration-500 ease-out group-hover:-translate-y-1"
				/>
			</div>
			<div className="flex min-w-0 flex-col gap-0.5 pr-[12%]">
				<p className="truncate text-[15px] font-semibold leading-snug text-ink">
					{displayTitle(album)}
				</p>
				<p className="truncate text-sm text-ink/70">{album.artist}</p>
				<p className="font-mono text-[11px] uppercase tracking-wider text-ink/50">
					{isSingleOrEp(album) ? "Single" : "Album"} · {releaseYear(album)}
					{meta}
				</p>
			</div>
		</Link>
	);
}

export function AlbumCardSkeleton() {
	return (
		<div className="flex flex-col gap-3">
			<div className="aspect-square w-[88%] rounded-[4px] bg-glass/15" />
			<div className="flex flex-col gap-2 pr-[12%]">
				<div className="h-3.5 w-3/4 rounded bg-glass/15" />
				<div className="h-3 w-1/2 rounded bg-glass/10" />
			</div>
		</div>
	);
}
