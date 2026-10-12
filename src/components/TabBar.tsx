import { Link } from "@tanstack/react-router";
import { COMMUNITY_ITEMS, DISCOVER_ITEMS } from "./navigation";

const TAB_LABELS: Record<string, string> = { "/reviews": "You" };

// Phone navigation along the bottom, like a native app.
export function TabBar() {
	return (
		<nav
			aria-label="Main"
			className="grid grid-cols-5 border-t border-ink/10 bg-navy-deep/85 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden"
		>
			{[...DISCOVER_ITEMS, ...COMMUNITY_ITEMS].map((item) => (
				<Link
					key={item.to}
					to={item.to}
					search={item.to === "/search" ? { q: "" } : undefined}
					className="flex flex-col items-center gap-1 py-2 text-[10px] font-medium text-ink/55"
					activeProps={{ className: "!text-ink" }}
				>
					{({ isActive }) => {
						const Icon = isActive ? item.activeIcon : item.icon;
						return (
							<>
								<Icon
									aria-hidden
									className={`size-[22px] ${isActive ? "text-label" : ""}`}
								/>
								{TAB_LABELS[item.to] ?? item.label}
							</>
						);
					}}
				</Link>
			))}
		</nav>
	);
}
