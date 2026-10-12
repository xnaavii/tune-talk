import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { BackgroundImage } from "#/components/BackgroundImage";
import { Logo } from "#/components/Logo";

export const Route = createFileRoute("/auth")({
	component: AuthLayout,
});

function AuthLayout() {
	return (
		<div className="relative min-h-dvh bg-navy">
			<BackgroundImage />
			<div className="relative z-10 flex min-h-dvh flex-col items-center justify-center gap-6 px-4 py-10">
				<Link to="/" aria-label="Go to home page">
					<Logo size="md" />
				</Link>
				<div className="glass-panel w-full max-w-[380px] p-6 sm:p-8">
					<Outlet />
				</div>
			</div>
		</div>
	);
}
