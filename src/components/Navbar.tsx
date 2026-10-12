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
		<nav className="h-fit flex flex-col sm:flex-row sm:px-[20px] py-[4px] sm:gap-[18px] items-center justify-center rounded-[6px] backdrop-blur-[32.6px] bg-[#C2E1FA]/20">
			<Link to="/" aria-label="Go to home page">
				<Logo size="md" />
			</Link>
			<div className="flex flex-col sm:flex-row grow-1 gap-[12px] md:[gap-0] items-center w-[90%]">
				<SearchBar
					value={query}
					onChange={handleChange}
					onSubmit={() => goToSearch(query)}
				/>
				<NavMenu className="shrink-0 flex gap-[12px] py-[6px] sm:py-0 flex-wrap" />
			</div>
		</nav>
	);
}
