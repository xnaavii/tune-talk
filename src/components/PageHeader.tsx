import { Link, type LinkProps } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { IoChevronForward } from "react-icons/io5";

interface PageHeaderProps {
	title: ReactNode;
	description?: ReactNode;
	// Small mono label above the title, like a catalogue number.
	eyebrow?: ReactNode;
	actions?: ReactNode;
}

// Title block every page starts with.
export function PageHeader({
	title,
	description,
	eyebrow,
	actions,
}: PageHeaderProps) {
	return (
		<header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
			<div className="flex flex-col gap-2">
				{eyebrow && <p className="eyebrow">{eyebrow}</p>}
				<h1 className="display-title text-4xl text-ink sm:text-5xl">{title}</h1>
				{description && (
					<p className="max-w-prose text-[15px] text-ink/70">{description}</p>
				)}
			</div>
			{actions && <div className="flex shrink-0 gap-2">{actions}</div>}
		</header>
	);
}

// Section heading inside a page (rating groups, tracklist sides, reviews).
export function SectionHeading({ children }: { children: ReactNode }) {
	return <h3 className="eyebrow">{children}</h3>;
}

interface SectionProps {
	title: ReactNode;
	eyebrow?: ReactNode;
	// "See all" link in the section header.
	more?: LinkProps;
	children: ReactNode;
}

// A titled block of a page: a shelf, a song list, a grid.
export function Section({ title, eyebrow, more, children }: SectionProps) {
	return (
		<section className="flex flex-col gap-4">
			<header className="flex items-end justify-between gap-4">
				<div className="flex flex-col gap-1">
					{eyebrow && <p className="eyebrow">{eyebrow}</p>}
					<h2 className="display-title text-2xl text-ink sm:text-[28px]">
						{title}
					</h2>
				</div>
				{more && (
					<Link
						{...more}
						className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-ink/70 transition-colors hover:text-ink"
					>
						See all
						<IoChevronForward aria-hidden className="size-4" />
					</Link>
				)}
			</header>
			{children}
		</section>
	);
}
