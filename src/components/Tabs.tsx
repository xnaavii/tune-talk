import { Link, type LinkProps } from "@tanstack/react-router";

export interface Tab {
	label: string;
	link: LinkProps;
	isActive: boolean;
}

// Segmented control that switches a page's view through its URL.
export function Tabs({ tabs, label }: { tabs: Tab[]; label: string }) {
	return (
		<nav
			aria-label={label}
			className="inline-flex w-fit gap-1 rounded-full bg-glass/10 p-1 ring-1 ring-ink/10"
		>
			{tabs.map((tab) => (
				<Link
					key={tab.label}
					{...tab.link}
					aria-current={tab.isActive ? "page" : undefined}
					className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
						tab.isActive
							? "bg-ink text-navy-deep"
							: "text-ink/70 hover:text-ink"
					}`}
				>
					{tab.label}
				</Link>
			))}
		</nav>
	);
}
