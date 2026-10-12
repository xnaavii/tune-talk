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
		<div className="min-h-screen bg-[#0F2E48] relative transition-all">
			<BackgroundImage />

			<div className="relative z-20 h-dvh flex justify-center items-center">
				<main className="flex flex-col justify-center items-center max-w-[404px] w-full px-4">
					<Link to="/" aria-label="Go to home page">
						<Logo size="lg" />
					</Link>
					<div className="w-full flex flex-col items-center gap-[18px]">
						<SearchBar
							value={query}
							onChange={setQuery}
							onSubmit={() => query.trim() && goToSearch(query)}
						/>
						<NavMenu className="flex flex-row flex-wrap justify-center gap-[12px]" />
					</div>
				</main>
			</div>
		</div>
	);
}
