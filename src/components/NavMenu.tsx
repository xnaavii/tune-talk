import { useQueryClient } from "@tanstack/react-query";
import { useLocation } from "@tanstack/react-router";
import {
	IoCompassOutline,
	IoLogInOutline,
	IoLogOutOutline,
	IoPersonOutline,
	IoPodiumOutline,
	IoStarOutline,
} from "react-icons/io5";
import { toast } from "sonner";
import { reviewQueries } from "#/features/reviews/queries";
import { authClient } from "#/lib/auth-client";
import { Button, ButtonLink } from "./Button";

// Page links plus the log in / log out button. `compact` shows icons only
// below the lg breakpoint, so the app navbar stays on one line.
export function NavMenu({
	className,
	compact = false,
}: {
	className?: string;
	compact?: boolean;
}) {
	const { data: session } = authClient.useSession();
	const queryClient = useQueryClient();
	const { pathname } = useLocation();

	async function handleLogOut() {
		await authClient.signOut();
		queryClient.removeQueries({ queryKey: reviewQueries.all() });
		toast.success("Logged out");
	}

	const labelClassName = compact ? "max-lg:sr-only" : undefined;

	return (
		<nav className={className}>
			<ButtonLink
				to="/explore"
				label="Explore"
				labelClassName={labelClassName}
				icon={IoCompassOutline}
			/>
			<ButtonLink
				to="/charts"
				label="Charts"
				labelClassName={labelClassName}
				icon={IoPodiumOutline}
			/>
			<ButtonLink
				to="/popular"
				label="Popular"
				labelClassName={labelClassName}
				icon={IoStarOutline}
			/>
			<ButtonLink
				to="/reviews"
				label="Your Reviews"
				labelClassName={labelClassName}
				icon={IoPersonOutline}
			/>
			{session ? (
				<Button
					label="Log out"
					labelClassName={labelClassName}
					icon={IoLogOutOutline}
					onClick={handleLogOut}
					title={`Logged in as ${session.user.name}`}
				/>
			) : (
				<ButtonLink
					to="/auth/login"
					search={{ redirect: pathname }}
					label="Log in"
					labelClassName={labelClassName}
					icon={IoLogInOutline}
				/>
			)}
		</nav>
	);
}
