import type { ReactNode } from "react";

interface PageHeaderProps {
	title: ReactNode;
	description?: ReactNode;
}

// Title block every page inside the main panel starts with.
export function PageHeader({ title, description }: PageHeaderProps) {
	return (
		<header className="flex flex-col gap-1 mb-5">
			<h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink">
				{title}
			</h2>
			{description && <p className="text-sm text-ink/70">{description}</p>}
		</header>
	);
}

// Section heading inside a page (rating groups, release dates, reviews).
export function SectionHeading({ children }: { children: ReactNode }) {
	return (
		<h3 className="text-sm font-semibold uppercase tracking-wider text-ink/60">
			{children}
		</h3>
	);
}
