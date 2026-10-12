import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Outlet, useMatch } from "@tanstack/react-router";
import { BackgroundImage } from "#/components/BackgroundImage";
import { Sidebar } from "#/components/Sidebar";
import { TabBar } from "#/components/TabBar";
import { TopBar } from "#/components/TopBar";
import { albumQueries } from "#/features/albums/queries";
import { NowPlayingBar } from "#/features/player/components/NowPlayingBar";
import { PlayerProvider } from "#/features/player/PlayerProvider";

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
		<PlayerProvider>
			<div className="relative flex h-dvh flex-col overflow-hidden bg-navy-deep">
				<BackgroundImage image={albumId ? album?.image : undefined} />

				<div className="relative z-10 flex min-h-0 flex-1 flex-col gap-2 md:p-3 lg:gap-3">
					<div className="flex min-h-0 flex-1 gap-3">
						<Sidebar />
						<div className="flex min-w-0 flex-1 flex-col overflow-hidden md:glass-panel md:rounded-2xl">
							<TopBar />
							<main className="flex-1 overflow-y-auto px-4 pt-4 pb-10 sm:px-8">
								<Outlet />
							</main>
						</div>
					</div>
					<NowPlayingBar />
				</div>
				<div className="relative z-10">
					<TabBar />
				</div>
			</div>
		</PlayerProvider>
	);
}
