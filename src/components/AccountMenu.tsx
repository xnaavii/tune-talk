import { useQueryClient } from "@tanstack/react-query";
import { Link, useLocation } from "@tanstack/react-router";
import { IoLogInOutline, IoLogOutOutline } from "react-icons/io5";
import { toast } from "sonner";
import { reviewQueries } from "#/features/reviews/queries";
import { authClient } from "#/lib/auth-client";

// Who's logged in, with log in / log out. The sidebar shows a full row,
// the phone header just the avatar.
export function AccountMenu({ variant }: { variant: "sidebar" | "compact" }) {
	const { data: session } = authClient.useSession();
	const queryClient = useQueryClient();
	const { pathname } = useLocation();

	async function handleLogOut() {
		await authClient.signOut();
		queryClient.removeQueries({ queryKey: reviewQueries.all() });
		toast.success("Logged out");
	}

	if (!session) {
		return (
			<Link
				to="/auth/login"
				search={{ redirect: pathname }}
				className={
					variant === "sidebar"
						? "flex w-full items-center justify-center gap-2 rounded-full bg-ink py-2.5 text-sm font-semibold text-navy-deep transition-colors hover:bg-glass"
						: "inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-navy-deep"
				}
			>
				<IoLogInOutline aria-hidden className="size-4" />
				Log in
			</Link>
		);
	}

	const initial = session.user.name.charAt(0);

	if (variant === "compact") {
		return (
			<button
				type="button"
				onClick={handleLogOut}
				aria-label={`Log out ${session.user.name}`}
				title={`Logged in as ${session.user.name}. Tap to log out.`}
				className="flex size-8 cursor-pointer items-center justify-center rounded-full bg-label text-sm font-semibold uppercase text-navy-deep"
			>
				{initial}
			</button>
		);
	}

	return (
		<div className="flex items-center gap-3 rounded-xl bg-glass/10 p-2">
			<span
				aria-hidden
				className="flex size-9 shrink-0 items-center justify-center rounded-full bg-label text-sm font-semibold uppercase text-navy-deep"
			>
				{initial}
			</span>
			<div className="flex min-w-0 flex-1 flex-col">
				<span className="truncate text-sm font-medium">
					{session.user.name}
				</span>
				<span className="truncate text-xs text-ink/55">
					{session.user.email}
				</span>
			</div>
			<button
				type="button"
				onClick={handleLogOut}
				aria-label="Log out"
				title="Log out"
				className="inline-flex size-8 cursor-pointer items-center justify-center rounded-full text-ink/70 transition-colors hover:bg-glass/20 hover:text-ink"
			>
				<IoLogOutOutline aria-hidden className="size-[18px]" />
			</button>
		</div>
	);
}
