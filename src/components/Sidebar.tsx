import { Link } from "@tanstack/react-router";
import { GENRES } from "#/features/genres/genres";
import { AccountMenu } from "./AccountMenu";
import { Logo } from "./Logo";
import { COMMUNITY_ITEMS, DISCOVER_ITEMS, type NavItem } from "./navigation";

function SidebarLink({ item }: { item: NavItem }) {
	return (
		<Link
			to={item.to}
			search={item.to === "/search" ? { q: "" } : undefined}
			className="group relative flex items-center gap-3 rounded-lg px-3 py-2 text-[15px] font-medium text-ink/70 transition-colors hover:bg-glass/10 hover:text-ink"
			activeProps={{ className: "bg-glass/15 !text-ink" }}
		>
			{({ isActive }) => {
				const Icon = isActive ? item.activeIcon : item.icon;
				return (
					<>
						{isActive && (
							<span className="absolute top-2 bottom-2 left-0 w-[3px] rounded-full bg-label" />
						)}
						<Icon aria-hidden className="size-5" />
						{item.label}
					</>
				);
			}}
		</Link>
	);
}

// Desktop navigation down the left edge.
export function Sidebar() {
	return (
		<aside className="glass-panel hidden w-60 shrink-0 flex-col gap-8 overflow-y-auto px-3 py-6 md:flex">
			<Link to="/" aria-label="Go to home page" className="px-3">
				<Logo size="sm" />
			</Link>

			<nav aria-label="Discover" className="flex flex-col gap-1">
				<p className="eyebrow px-3 pb-2">Discover</p>
				{DISCOVER_ITEMS.map((item) => (
					<SidebarLink key={item.to} item={item} />
				))}
			</nav>

			<nav aria-label="Tunetalk" className="flex flex-col gap-1">
				<p className="eyebrow px-3 pb-2">Tunetalk</p>
				{COMMUNITY_ITEMS.map((item) => (
					<SidebarLink key={item.to} item={item} />
				))}
			</nav>

			<nav aria-label="Genres" className="flex flex-col gap-1">
				<p className="eyebrow px-3 pb-2">Crates</p>
				{GENRES.slice(0, 6).map((genre) => (
					<Link
						key={genre.slug}
						to="/genres/$genre"
						params={{ genre: genre.slug }}
						className="flex items-center gap-3 rounded-lg px-3 py-1.5 text-sm text-ink/65 transition-colors hover:bg-glass/10 hover:text-ink"
						activeProps={{ className: "bg-glass/15 !text-ink" }}
					>
						<span
							aria-hidden
							className="size-2.5 rounded-full"
							style={{ background: `oklch(0.72 0.15 ${genre.hue})` }}
						/>
						{genre.name}
					</Link>
				))}
			</nav>

			<div className="mt-auto">
				<AccountMenu variant="sidebar" />
			</div>
		</aside>
	);
}
