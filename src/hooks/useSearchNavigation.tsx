import { useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

const DEBOUNCE_MS = 300;

// Navigates to the search page as the user types (debounced), or right away
// on submit. Typing on the search page replaces the history entry.
export function useSearchNavigation() {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

	useEffect(() => () => clearTimeout(timer.current), []);

	function goToSearch(query: string) {
		clearTimeout(timer.current);
		navigate({
			to: "/search",
			search: { q: query },
			replace: pathname === "/search",
		});
	}

	function searchAsYouType(query: string) {
		clearTimeout(timer.current);
		timer.current = setTimeout(() => goToSearch(query), DEBOUNCE_MS);
	}

	return { goToSearch, searchAsYouType };
}
