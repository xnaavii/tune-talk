import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import type { Album } from "../types";
import { releaseYear } from "../utils";
import { AlbumCover, albumCoverUrl } from "./AlbumCover";

interface AlbumCardProps {
	album: Album;
	// Extra detail under the year, such as a rating.
	meta?: ReactNode;
}

export function AlbumCard({ album, meta }: AlbumCardProps) {
	return (
		<Link
			to="/albums/$albumId"
			params={{ albumId: album.id }}
			className="group block rounded-2xl focus-visible:outline-offset-2"
		>
			<figure className="relative overflow-hidden rounded-2xl ring-1 ring-ink/10 transition-all duration-300 group-hover:ring-ink/40 group-hover:-translate-y-0.5">
				{/* Blurred cover tints each card with its artwork */}
				<div
					aria-hidden
					className="absolute inset-0 scale-110 bg-cover bg-center blur-[32px]"
					style={{ backgroundImage: `url("${albumCoverUrl(album)}")` }}
				/>

				<div className="relative flex items-center gap-3 bg-navy/25 p-2.5">
					<AlbumCover
						album={album}
						loading="lazy"
						className="size-16 shrink-0 rounded-md object-cover shadow-soft"
					/>
					<figcaption className="flex min-w-0 flex-col gap-0.5">
						<p className="truncate text-[15px] font-semibold group-hover:underline">
							{album.title}
						</p>
						<p className="truncate text-sm text-ink/85">{album.artist}</p>
						<p className="text-xs text-ink/60">
							{releaseYear(album)}
							{meta}
						</p>
					</figcaption>
				</div>
			</figure>
		</Link>
	);
}

export function AlbumCardSkeleton() {
	return (
		<div className="flex items-center gap-3 rounded-2xl bg-glass/10 p-2.5 ring-1 ring-ink/10">
			<div className="size-16 shrink-0 rounded-md bg-glass/15" />
			<div className="flex flex-1 flex-col gap-2">
				<div className="h-3.5 w-2/3 rounded bg-glass/15" />
				<div className="h-3 w-1/2 rounded bg-glass/15" />
				<div className="h-2.5 w-1/5 rounded bg-glass/10" />
			</div>
		</div>
	);
}
