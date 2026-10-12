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
		<div className="relative min-h-dvh bg-[#0F2E48] transition-all">
			<BackgroundImage image={albumId ? album?.image : undefined} />

			<div className="h-dvh max-w-[942px] mx-auto flex flex-col gap-[6px] md:gap-[18px] overflow-hidden relative z-10 transition-all py-[6px] md:py-[26px] lg:py-[49px] px-[6px] md:px-[26px] lg:px-[49px]">
				<Navbar />
				<main className="flex-1 max-w-[942px] md:flex-row px-[32px] py-[24px] gap-4 text-stone-100 border-stone-50 rounded-lg shadow backdrop-blur-[30px] bg-[#C2E1FA]/16 overflow-auto">
					<Outlet />
				</main>
			</div>
		</div>
	);
}
