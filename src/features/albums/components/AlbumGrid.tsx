import type { ReactNode } from "react";
import { AlbumCardSkeleton } from "./AlbumCard";

const gridClass =
	"grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5";

// The one album grid layout, used by every list page.
export function AlbumGrid({ children }: { children: ReactNode }) {
	return <div className={gridClass}>{children}</div>;
}

export function AlbumGridSkeleton({ count = 8 }: { count?: number }) {
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
