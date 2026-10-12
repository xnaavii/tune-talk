import { createFileRoute, redirect } from "@tanstack/react-router";

// The old Top page lives on as the albums tab of Charts.
export const Route = createFileRoute("/_app/top")({
	beforeLoad: () => {
		throw redirect({
			to: "/charts",
			search: { type: "albums", country: "us" },
		});
	},
});
