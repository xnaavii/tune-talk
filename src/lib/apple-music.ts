// Apple's public iTunes Search API and Apple Music RSS feeds. Both are free
// and need no API key. Server-only: import it from server functions, never
// from components.

import { getCache, waitUntil } from "@vercel/functions";

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
// when asked again, so server errors get one quick retry. A request that
// hangs is cut off, so a slow feed can't hold up the page.
const RETRY_DELAY_MS = 250;
const TIMEOUT_MS = 4000;

async function fetchWithRetry(url: URL) {
	const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS) });
	if (res.status < 500) return res;
	await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
	return fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS) });
}

async function getJson<T>(url: URL): Promise<T> {
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

const CATALOG_CACHE_MS = 1000 * 60 * 60;
const CHART_CACHE_MS = 1000 * 60 * 30;
// How long an old copy is kept around to fall back on when Apple fails.
const STALE_TTL_SECONDS = 60 * 60 * 24;

type CacheEntry = { data: unknown; fetchedAt: number };

// Responses go in Vercel's Runtime Cache, which every server instance in the
// region shares, so a cold instance doesn't have to wait on Apple. Outside
// Vercel it is an in-memory cache. Apple's answer is reused while fresh, and
// its last copy stands in when Apple fails.
async function cachedGet<T>(url: URL, freshMs: number): Promise<T> {
	const key = url.toString();
	const cache = getCache({ namespace: "apple-music" });
	const cached = (await cache.get(key).catch(() => null)) as CacheEntry | null;
	if (cached && Date.now() - cached.fetchedAt < freshMs) {
		return cached.data as T;
	}
	try {
		const data = await getJson<T>(url);
		const entry: CacheEntry = { data, fetchedAt: Date.now() };
		const saved = cache
			.set(key, entry, { ttl: STALE_TTL_SECONDS })
			.catch((error) => console.warn("Apple Music cache write failed", error));
		// Don't make the response wait for the cache write.
		waitUntil(saved);
		return data;
	} catch (error) {
		if (cached) return cached.data as T;
		throw error;
	}
}

// `path` is "/search" or "/lookup".
export function catalogGet<T>(
	path: string,
	params: Record<string, string | number>,
) {
	const url = new URL(`${SEARCH_API_URL}${path}`);
	for (const [key, value] of Object.entries({ country: COUNTRY, ...params })) {
		url.searchParams.set(key, String(value));
	}
	return cachedGet<T>(url, CATALOG_CACHE_MS);
}

// `path` is relative to the storefront, e.g. "/music/most-played/50/albums.json".
export function chartGet<T>(path: string, country = COUNTRY) {
	return cachedGet<T>(
		new URL(`${RSS_API_URL}/${country}${path}`),
		CHART_CACHE_MS,
	);
}

// The older iTunes Store feeds, e.g. "/rss/topalbums/limit=50/json". They are
// served from a different host, so they still answer when the Apple Music
// feeds time out.
export function legacyChartGet<T>(path: string, country = COUNTRY) {
	return cachedGet<T>(
		new URL(`${SEARCH_API_URL}/${country}${path}`),
		CHART_CACHE_MS,
	);
}

// Server functions rethrow with this so the client sees Apple's message (like
// the rate limit) but never an internal error.
export function toAppleMusicError(error: unknown, fallback: string) {
	return new Error(error instanceof AppleMusicError ? error.message : fallback);
}
