import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import type { Album } from "../types";
import { displayTitle, releaseYear } from "../utils";
import { AlbumCover } from "./AlbumCover";

interface RankedAlbumListProps<T extends Album> {
	albums: T[];
	// Extra detail on each row, such as its rating.
	meta?: (album: T) => ReactNode;
}

// Numbered chart of albums, used by the Popular and Charts pages.
export function RankedAlbumList<T extends Album>({
	albums,
	meta,
}: RankedAlbumListProps<T>) {
	return (
		<ol className="flex flex-col">
			{albums.map((album, index) => (
				<li key={album.id}>
					<Link
						to="/albums/$albumId"
						params={{ albumId: album.id }}
						className="group grid grid-cols-[2.25rem_3.5rem_1fr] items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-glass/10 sm:grid-cols-[3rem_4rem_1fr_auto] sm:gap-4"
					>
						<span
							className={`text-right font-display text-2xl font-semibold tabular-nums italic ${
								index < 3 ? "text-label" : "text-ink/45"
							}`}
						>
							{index + 1}
						</span>
						<AlbumCover
							album={album}
							loading="lazy"
							className="aspect-square w-full rounded-[3px] object-cover shadow-sleeve"
						/>
						<div className="flex min-w-0 flex-col gap-0.5">
							<p className="truncate font-semibold text-ink group-hover:underline">
								{displayTitle(album)}
							</p>
							<p className="truncate text-sm text-ink/70">{album.artist}</p>
							{meta && (
								<div className="text-xs text-ink/60 sm:hidden">
									{meta(album)}
								</div>
							)}
						</div>
						<div className="hidden flex-col items-end gap-1 text-xs text-ink/60 sm:flex">
							{meta?.(album)}
							<span className="font-mono uppercase tracking-wider">
								{[album.genre, releaseYear(album)].filter(Boolean).join(" · ")}
							</span>
						</div>
					</Link>
				</li>
			))}
		</ol>
	);
}

export function RankedListSkeleton({ count = 8 }: { count?: number }) {
	return (
		<output aria-label="Loading" className="flex flex-col gap-1">
			{Array.from({ length: count }, (_, i) => (
				<div
					// biome-ignore lint/suspicious/noArrayIndexKey: static placeholders
					key={i}
					className="grid animate-pulse grid-cols-[2.25rem_3.5rem_1fr] items-center gap-3 px-2 py-2 sm:grid-cols-[3rem_4rem_1fr] sm:gap-4"
				>
					<div className="ml-auto h-5 w-4 rounded bg-glass/10" />
					<div className="aspect-square rounded-[3px] bg-glass/15" />
					<div className="flex flex-col gap-2">
						<div className="h-3.5 w-1/2 rounded bg-glass/15" />
						<div className="h-3 w-1/3 rounded bg-glass/10" />
					</div>
				</div>
			))}
		</output>
	);
}
