import { Link, type LinkProps } from "@tanstack/react-router";
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

interface SectionProps {
	title: ReactNode;
	// "See all" link beside the heading.
	more?: LinkProps;
	children: ReactNode;
}

// A headed block of a page: a song list, an album grid.
export function Section({ title, more, children }: SectionProps) {
	return (
		<section className="flex flex-col gap-3">
			<div className="flex items-center justify-between gap-3">
				<SectionHeading>{title}</SectionHeading>
				{more && (
					<Link
						{...more}
						className="text-xs font-medium text-ink/70 hover:text-ink hover:underline underline-offset-4"
					>
						See all
					</Link>
				)}
			</div>
			{children}
		</section>
	);
}
