import { Link, type LinkProps } from "@tanstack/react-router";
import { activeClass, buttonClass } from "./Button";

export interface Tab {
	label: string;
	link: LinkProps;
	isActive: boolean;
}

// Pill buttons that switch a page's view through its URL.
export function Tabs({ tabs, label }: { tabs: Tab[]; label: string }) {
	return (
		<nav aria-label={label} className="flex flex-wrap gap-2">
			{tabs.map((tab) => (
				<Link
					key={tab.label}
					{...tab.link}
					aria-current={tab.isActive ? "page" : undefined}
					className={`${buttonClass} ${tab.isActive ? activeClass : ""}`}
				>
					{tab.label}
				</Link>
			))}
		</nav>
	);
}
