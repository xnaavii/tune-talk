import { useQueryClient } from "@tanstack/react-query";
import { useLocation } from "@tanstack/react-router";
import {
	IoLogInOutline,
	IoLogOutOutline,
	IoPersonOutline,
	IoStarOutline,
	IoTrendingUpOutline,
} from "react-icons/io5";
import { toast } from "sonner";
import { reviewQueries } from "#/features/reviews/queries";
import { authClient } from "#/lib/auth-client";
import { Button, ButtonLink } from "./Button";

// Page links plus the log in / log out button, shared by the navbar and
// the landing page.
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
			<ButtonLink to="/popular" label="Popular" icon={IoStarOutline} />
			<ButtonLink to="/top" label="Top" icon={IoTrendingUpOutline} />
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
