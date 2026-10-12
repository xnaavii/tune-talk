import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { BackgroundImage } from "#/components/BackgroundImage";
import { Logo } from "#/components/Logo";

export const Route = createFileRoute("/auth")({
	component: AuthLayout,
});

function AuthLayout() {
	return (
		<div className="min-h-dvh bg-[#0F2E48] relative text-stone-100">
			<BackgroundImage />
			<div className="relative z-10 min-h-dvh flex flex-col items-center justify-center gap-6 px-4">
				<Link to="/" aria-label="Go to home page">
					<Logo size="md" />
				</Link>
				<div className="w-full max-w-[360px] rounded-lg p-6 backdrop-blur-[30px] bg-[#C2E1FA]/16 shadow">
					<Outlet />
				</div>
			</div>
		</div>
	);
}
