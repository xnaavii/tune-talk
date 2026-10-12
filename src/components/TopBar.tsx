import { Link, useLocation, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useSearchNavigation } from "#/hooks/useSearchNavigation";
import { AccountMenu } from "./AccountMenu";
import { Logo } from "./Logo";
import { SearchBar } from "./SearchBar";

// Search across the top of the content area; on phones it also carries the
// logo and account button.
export function TopBar() {
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
		<header className="flex shrink-0 flex-col gap-3 px-4 pt-4 pb-2 sm:px-8 sm:pt-6">
			<div className="flex items-center justify-between md:hidden">
				<Link to="/" aria-label="Go to home page">
					<Logo size="sm" />
				</Link>
				<AccountMenu variant="compact" />
			</div>
			<div className="w-full max-w-xl">
				<SearchBar
					value={query}
					onChange={handleChange}
					onSubmit={() => goToSearch(query)}
				/>
			</div>
		</header>
	);
}
