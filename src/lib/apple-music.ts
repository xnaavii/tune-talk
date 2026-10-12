// Apple's public iTunes Search API and Apple Music RSS feeds. Both are free
// and need no API key. Server-only: import it from server functions, never
// from components.

const SEARCH_API_URL = "https://itunes.apple.com";
const RSS_API_URL = "https://rss.marketingtools.apple.com/api/v2";
const COUNTRY = "us";

export class AppleMusicError extends Error {
	constructor(
		message: string,
		readonly status: number,
	) {
		super(message);
	}
}

// Apple's edge sometimes answers with a 5xx (often a 504) that succeeds
// when asked again, so server errors get one quick retry.
const RETRY_DELAY_MS = 250;

async function fetchWithRetry(url: URL) {
	const res = await fetch(url);
	if (res.status < 500) return res;
	await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
	return fetch(url);
}

async function getJson<T>(
	url: URL,
	params: Record<string, string | number> = {},
): Promise<T> {
	for (const [key, value] of Object.entries(params)) {
		url.searchParams.set(key, String(value));
	}

	const res = await fetchWithRetry(url);

	// Apple answers rate-limited requests with 403 or 429.
	if (res.status === 403 || res.status === 429) {
		throw new AppleMusicError(
			"Apple Music rate limit reached, try again later",
			res.status,
		);
	}
	if (!res.ok) {
		throw new AppleMusicError(
			`Apple Music request failed (${res.status})`,
			res.status,
		);
	}

	return res.json();
}

// `path` is "/search" or "/lookup".
export function catalogGet<T>(
	path: string,
	params: Record<string, string | number>,
) {
	return getJson<T>(new URL(`${SEARCH_API_URL}${path}`), {
		country: COUNTRY,
		...params,
	});
}

const CHART_CACHE_MS = 1000 * 60 * 30;
const chartCache = new Map<string, { data: unknown; fetchedAt: number }>();

// `path` is relative to the storefront, e.g. "/music/most-played/50/albums.json".
// Charts change daily, so each server instance keeps them for half an hour
// and falls back to its last copy when Apple fails.
export async function chartGet<T>(path: string, country = COUNTRY) {
	const url = `${RSS_API_URL}/${country}${path}`;
	const cached = chartCache.get(url);
	if (cached && Date.now() - cached.fetchedAt < CHART_CACHE_MS) {
		return cached.data as T;
	}
	try {
		const data = await getJson<T>(new URL(url));
		chartCache.set(url, { data, fetchedAt: Date.now() });
		return data;
	} catch (error) {
		if (cached) return cached.data as T;
		throw error;
	}
}

// Server functions rethrow with this so the client sees Apple's message (like
// the rate limit) but never an internal error.
export function toAppleMusicError(error: unknown, fallback: string) {
	return new Error(error instanceof AppleMusicError ? error.message : fallback);
}
