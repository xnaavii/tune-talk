import type { ReactNode } from "react";
import { SectionHeading } from "#/components/PageHeader";
import { AlbumGrid } from "./AlbumGrid";

interface AlbumGroupsProps<T> {
	items: T[];
	groupBy: (item: T) => string | number;
	// Group keys in display order.
	sortKeys: (a: string, b: string) => number;
	heading: (key: string) => string;
	renderItem: (item: T) => ReactNode;
}

// Album grids under a heading per group, used by the Your Reviews page.
export function AlbumGroups<T>({
	items,
	groupBy,
	sortKeys,
	heading,
	renderItem,
}: AlbumGroupsProps<T>) {
	const groups = Map.groupBy(items, (item) => String(groupBy(item)));
	const keys = [...groups.keys()].sort(sortKeys);

	return (
		<div className="flex flex-col gap-6">
			{keys.map((key) => (
				<section key={key} className="flex flex-col gap-3">
					<SectionHeading>{heading(key)}</SectionHeading>
					<AlbumGrid>{groups.get(key)?.map(renderItem)}</AlbumGrid>
				</section>
			))}
		</div>
	);
}
