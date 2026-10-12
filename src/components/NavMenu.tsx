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

// Page links plus the log in / log out button on the landing page.
export function NavMenu({ className }: { className?: string }) {
	const { data: session } = authClient.useSession();
	const queryClient = useQueryClient();
	const { pathname } = useLocation();

	async function handleLogOut() {
		await authClient.signOut();
		queryClient.removeQueries({ queryKey: reviewQueries.all() });
		toast.success("Logged out");
	}

	return (
		<nav className={className}>
			<ButtonLink to="/explore" label="Explore" icon={IoCompassOutline} />
			<ButtonLink to="/charts" label="Charts" icon={IoPodiumOutline} />
			<ButtonLink to="/popular" label="Popular" icon={IoStarOutline} />
			<ButtonLink to="/reviews" label="Your Reviews" icon={IoPersonOutline} />
			{session ? (
				<Button
					label="Log out"
					icon={IoLogOutOutline}
					onClick={handleLogOut}
					title={`Logged in as ${session.user.name}`}
				/>
			) : (
				<ButtonLink
					to="/auth/login"
					search={{ redirect: pathname }}
					label="Log in"
					icon={IoLogInOutline}
				/>
			)}
		</nav>
	);
}
