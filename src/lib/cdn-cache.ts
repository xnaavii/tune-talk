// Lets Vercel's CDN answer repeat requests for public catalog data, so they
// never start a server function. Server-only: call it from server function
// handlers, after the data is fetched, so errors are never cached.

import { getRequestUrl, setResponseHeader } from "@tanstack/react-start/server";

const SERVER_FN_PATH = "/_serverFn/";

export function cacheOnCdn(maxAgeSeconds: number) {
	// During SSR the server function runs inside the page request. Only the
	// client's own server function requests are cached, never whole pages.
	if (!getRequestUrl().pathname.includes(SERVER_FN_PATH)) return;
	setResponseHeader(
		"Cache-Control",
		`public, max-age=0, s-maxage=${maxAgeSeconds}, stale-while-revalidate=${maxAgeSeconds * 24}`,
	);
}

export const CATALOG_CDN_SECONDS = 60 * 60;
export const CHART_CDN_SECONDS = 60 * 30;
