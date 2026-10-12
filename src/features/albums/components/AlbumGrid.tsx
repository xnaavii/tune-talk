import type { ReactNode } from "react";
import { AlbumCardSkeleton } from "./AlbumCard";

const gridClass = "grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3";

// The one album grid layout, used by every list page.
export function AlbumGrid({ children }: { children: ReactNode }) {
	return <div className={gridClass}>{children}</div>;
}

export function AlbumGridSkeleton({ count = 6 }: { count?: number }) {
	return (
		<output aria-label="Loading albums" className={gridClass}>
			{Array.from({ length: count }, (_, i) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: static placeholders
				<div key={i} className="animate-pulse">
					<AlbumCardSkeleton />
				</div>
			))}
		</output>
	);
}
