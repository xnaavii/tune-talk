import { Link, useLocation, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useSearchNavigation } from "#/hooks/useSearchNavigation";
import { Logo } from "./Logo";
import { NavMenu } from "./NavMenu";
import { SearchBar } from "./SearchBar";

export function Navbar() {
	const { pathname } = useLocation();
	const { q } = useSearch({ strict: false });
	const [query, setQuery] = useState(q ?? "");
	const { goToSearch, searchAsYouType } = useSearchNavigation();

	// Keep the input in sync when the search URL changes (back/forward).
	useEffect(() => {
		if (pathname === "/search") setQuery(q ?? "");
	}, [pathname, q]);

	function handleChange(value: string) {
		setQuery(value);
		searchAsYouType(value);
	}

	return (
		<header className="glass-panel shrink-0 flex flex-col md:flex-row items-center gap-3 md:gap-5 px-4 md:px-5 py-3">
			<Link to="/" aria-label="Go to home page" className="shrink-0">
				<Logo size="md" />
			</Link>
			<div className="flex flex-col lg:flex-row items-center gap-3 w-full min-w-0">
				<SearchBar
					value={query}
					onChange={handleChange}
					onSubmit={() => goToSearch(query)}
				/>
				<NavMenu className="shrink-0 flex flex-wrap justify-center gap-2" />
			</div>
		</header>
	);
}
