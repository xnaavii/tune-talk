import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { BackgroundImage } from "#/components/BackgroundImage";
import { Logo } from "#/components/Logo";
import { NavMenu } from "#/components/NavMenu";
import { SearchBar } from "#/components/SearchBar";
import { useSearchNavigation } from "#/hooks/useSearchNavigation";

export const Route = createFileRoute("/")({
	component: LandingPage,
});

function LandingPage() {
	const [query, setQuery] = useState("");
	const { goToSearch } = useSearchNavigation();

	return (
		<div className="relative min-h-dvh bg-navy">
			<BackgroundImage />

			<main className="relative z-10 mx-auto flex min-h-dvh w-full max-w-[420px] flex-col items-center justify-center gap-5 px-4">
				<div className="flex flex-col items-center gap-2 text-center">
					<Link to="/" aria-label="Go to home page">
						<Logo size="lg" />
					</Link>
					<p className="text-sm text-ink/75">
						Find an album, rate it, and see what everyone else thinks.
					</p>
				</div>
				<SearchBar
					value={query}
					onChange={setQuery}
					onSubmit={() => query.trim() && goToSearch(query)}
					autoFocus
				/>
				<NavMenu className="flex flex-wrap justify-center gap-2" />
			</main>
		</div>
	);
}
