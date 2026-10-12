import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { IoArrowForward } from "react-icons/io5";
import { BackgroundImage } from "#/components/BackgroundImage";
import { Logo } from "#/components/Logo";
import { NavMenu } from "#/components/NavMenu";
import { SearchBar } from "#/components/SearchBar";
import { Vinyl } from "#/components/Vinyl";
import { useSearchNavigation } from "#/hooks/useSearchNavigation";

export const Route = createFileRoute("/")({
	component: LandingPage,
});

function LandingPage() {
	const [query, setQuery] = useState("");
	const { goToSearch } = useSearchNavigation();

	return (
		<div className="relative min-h-dvh overflow-hidden bg-navy-deep">
			<BackgroundImage />

			{/* A record turning slowly behind the title */}
			<Vinyl
				spinning
				className="pointer-events-none absolute top-1/2 left-1/2 w-[min(150vw,900px)] -translate-x-1/2 -translate-y-1/2 opacity-35"
			/>

			<main className="relative z-10 mx-auto flex min-h-dvh w-full max-w-[460px] flex-col items-center justify-center gap-6 px-4">
				<div className="flex flex-col items-center gap-3 text-center">
					<h1>
						<Link to="/" aria-label="Tunetalk home">
							<Logo size="lg" />
						</Link>
					</h1>
					<p className="text-[17px] text-ink/80">
						Dig through the charts, preview any song, and rate the albums you
						love.
					</p>
				</div>
				<SearchBar
					value={query}
					onChange={setQuery}
					onSubmit={() => query.trim() && goToSearch(query)}
					autoFocus
				/>
				<Link
					to="/explore"
					className="inline-flex items-center gap-2 rounded-full bg-label px-6 py-3 text-[15px] font-semibold text-navy-deep shadow-sleeve transition-transform hover:scale-[1.03] active:scale-[0.98]"
				>
					Start exploring
					<IoArrowForward aria-hidden className="size-4" />
				</Link>
				<NavMenu className="flex flex-wrap justify-center gap-2" />
			</main>
		</div>
	);
}
