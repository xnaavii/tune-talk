import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Outlet, useMatch } from "@tanstack/react-router";
import { BackgroundImage } from "#/components/BackgroundImage";
import { Navbar } from "#/components/Navbar";
import { albumQueries } from "#/features/albums/queries";

export const Route = createFileRoute("/_app")({
	component: AppLayout,
});

function AppLayout() {
	// On an album page, use its cover as the background. The query is shared
	// with the album page, so this never triggers a second request.
	const albumMatch = useMatch({
		from: "/_app/albums/$albumId",
		shouldThrow: false,
	});
	const albumId = albumMatch?.params.albumId;
	const { data: album } = useQuery({
		...albumQueries.details(albumId ?? ""),
		enabled: !!albumId,
	});

	return (
		<div className="relative min-h-dvh bg-navy">
			<BackgroundImage image={albumId ? album?.image : undefined} />

			<div className="relative z-10 mx-auto flex h-dvh max-w-[960px] flex-col gap-2 p-2 sm:gap-4 sm:p-6 lg:py-12">
				<Navbar />
				<main className="glass-panel flex-1 overflow-auto px-4 py-5 sm:px-8 sm:py-6">
					<Outlet />
				</main>
			</div>
		</div>
	);
}
