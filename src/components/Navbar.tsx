import { Link, useLocation, useSearch } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { IoClose, IoSearch } from "react-icons/io5";
import { useSearchNavigation } from "#/hooks/useSearchNavigation";
import { Button, navIconClass } from "./Button";
import { Logo } from "./Logo";
import { NavMenu } from "./NavMenu";
import { SearchBar } from "./SearchBar";

export function Navbar() {
	const { pathname } = useLocation();
	const { q } = useSearch({ strict: false });
	const [query, setQuery] = useState(q ?? "");
	const { goToSearch, searchAsYouType } = useSearchNavigation();
	// On phones the search bar hides behind an icon until it's tapped.
	const [searchOpen, setSearchOpen] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	// Keep the input in sync when the search URL changes (back/forward).
	useEffect(() => {
		if (pathname === "/search") setQuery(q ?? "");
	}, [pathname, q]);

	function handleChange(value: string) {
		setQuery(value);
		searchAsYouType(value);
	}

	function openSearch() {
		// Render the input before focusing it, so phones open the keyboard
		// within the tap.
		flushSync(() => setSearchOpen(true));
		inputRef.current?.focus();
	}

	// Hidden on phones while the search bar is open.
	const hiddenWhileSearching = searchOpen ? "max-md:hidden" : "";

	return (
		<header className="glass-panel shrink-0 flex items-center gap-2 md:gap-4 px-3 md:px-4 py-2 min-h-14">
			<Link
				to="/"
				aria-label="Go to home page"
				className={`shrink-0 ${hiddenWhileSearching}`}
			>
				<Logo size="sm" />
			</Link>
			<div
				className={`flex-1 min-w-0 md:max-w-sm ${searchOpen ? "" : "max-md:hidden"}`}
			>
				<SearchBar
					compact
					inputRef={inputRef}
					value={query}
					onChange={handleChange}
					onSubmit={() => goToSearch(query)}
					onKeyDown={(event) => {
						if (event.key === "Escape") setSearchOpen(false);
					}}
				/>
			</div>
			{searchOpen && (
				<Button
					icon={IoClose}
					aria-label="Close search"
					className={`md:hidden shrink-0 ${navIconClass}`}
					onClick={() => setSearchOpen(false)}
				/>
			)}
			<div
				className={`ml-auto flex items-center gap-1 sm:gap-1.5 ${hiddenWhileSearching}`}
			>
				<Button
					icon={IoSearch}
					aria-label="Open search"
					className={`md:hidden ${navIconClass}`}
					onClick={openSearch}
				/>
				<NavMenu compact className="flex items-center gap-1 sm:gap-1.5" />
			</div>
		</header>
	);
}
