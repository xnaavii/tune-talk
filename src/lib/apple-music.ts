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

async function getJson<T>(
	url: URL,
	params: Record<string, string | number> = {},
): Promise<T> {
	for (const [key, value] of Object.entries(params)) {
		url.searchParams.set(key, String(value));
	}

	const res = await fetch(url);

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

// `path` is relative to the storefront, e.g. "/music/most-played/50/albums.json".
export function chartGet<T>(path: string) {
	return getJson<T>(new URL(`${RSS_API_URL}/${COUNTRY}${path}`));
}
