import type { ReactNode } from "react";

interface AlbumGroupsProps<T> {
	items: T[];
	groupBy: (item: T) => string | number;
	// Group keys in display order.
	sortKeys: (a: string, b: string) => number;
	heading: (key: string) => string;
	renderItem: (item: T) => ReactNode;
	itemsClassName?: (count: number) => string;
}

// Renders items under a heading per group, used by the New and Your Reviews pages.
export function AlbumGroups<T>({
	items,
	groupBy,
	sortKeys,
	heading,
	renderItem,
	itemsClassName = () => "flex flex-col gap-2",
}: AlbumGroupsProps<T>) {
	const groups = Map.groupBy(items, (item) => String(groupBy(item)));
	const keys = [...groups.keys()].sort(sortKeys);

	return (
		<div className="flex flex-col gap-4">
			{keys.map((key) => {
				const group = groups.get(key) ?? [];
				return (
					<section key={key} className="flex flex-col gap-2">
						<h3 className="text-xl font-medium text-stone-200 mt-4 mb-2">
							{heading(key)}
						</h3>
						<div className={itemsClassName(group.length)}>
							{group.map(renderItem)}
						</div>
					</section>
				);
			})}
		</div>
	);
}
