import type { ReactNode } from "react";
import type { Album } from "../types";
import { AlbumCard } from "./AlbumCard";

interface RankedAlbumListProps<T extends Album> {
	albums: T[];
	// Extra detail under each album's year, such as its rating.
	meta?: (album: T) => ReactNode;
}

// Numbered album list, used by the Popular and Top pages.
export function RankedAlbumList<T extends Album>({
	albums,
	meta,
}: RankedAlbumListProps<T>) {
	return (
		<ol className="flex flex-col gap-2">
			{albums.map((album, index) => (
				<li key={album.id} className="flex items-center gap-3">
					<span className="w-6 shrink-0 text-right text-lg font-semibold tabular-nums text-ink/60">
						{index + 1}
					</span>
					<div className="min-w-0 flex-1">
						<AlbumCard album={album} meta={meta?.(album)} />
					</div>
				</li>
			))}
		</ol>
	);
}
