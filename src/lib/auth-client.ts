import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	// The session is checked on page load and after sign in or out. Checking
	// again every time the tab gets focus only added server requests.
	sessionOptions: { refetchOnWindowFocus: false },
});
