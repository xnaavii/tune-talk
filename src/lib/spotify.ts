// Spotify Web API client using the Client Credentials flow. Only public
// catalog data is needed, so no user-level Spotify auth is involved.
// Server-only: import it from server functions, never from components.

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const API_URL = "https://api.spotify.com/v1";

export class SpotifyError extends Error {
	constructor(
		message: string,
		readonly status: number,
	) {
		super(message);
	}
}

let token: { value: string; expiresAt: number } | null = null;
let pendingToken: Promise<string> | null = null;

async function requestToken() {
	const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;
	if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
		throw new SpotifyError("Spotify credentials are not configured", 500);
	}

	const credentials = btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`);
	const res = await fetch(TOKEN_URL, {
		method: "POST",
		headers: {
			Authorization: `Basic ${credentials}`,
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams({ grant_type: "client_credentials" }),
	});

	if (!res.ok) {
		throw new SpotifyError("Spotify token request failed", res.status);
	}

	const data: { access_token: string; expires_in: number } = await res.json();
	// Refresh a minute early so a token never expires mid-request.
	token = {
		value: data.access_token,
		expiresAt: Date.now() + (data.expires_in - 60) * 1000,
	};
	return token.value;
}

async function getToken() {
	if (token && Date.now() < token.expiresAt) return token.value;
	// Share one in-flight token request between concurrent callers.
	pendingToken ??= requestToken().finally(() => {
		pendingToken = null;
	});
	return pendingToken;
}

export async function spotifyGet<T>(
	path: string,
	params: Record<string, string | number> = {},
	retried = false,
): Promise<T> {
	const url = new URL(`${API_URL}${path}`);
	for (const [key, value] of Object.entries(params)) {
		url.searchParams.set(key, String(value));
	}

	const res = await fetch(url, {
		headers: { Authorization: `Bearer ${await getToken()}` },
	});

	if (res.status === 401 && !retried) {
		token = null;
		return spotifyGet(path, params, true);
	}
	if (res.status === 429) {
		throw new SpotifyError("Spotify rate limit reached, try again later", 429);
	}
	if (!res.ok) {
		throw new SpotifyError(
			`Spotify request failed (${res.status})`,
			res.status,
		);
	}

	return res.json();
}
