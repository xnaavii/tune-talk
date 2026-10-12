export interface Album {
	id: string;
	title: string;
	artist: string;
	releaseDate: string;
	image: string | null;
	spotifyUrl: string | null;
}

export interface RankedAlbum extends Album {
	averageRating: number;
	reviewCount: number;
}

// The subset of Spotify's album object Tune Talk reads.
export interface SpotifyAlbum {
	id: string;
	name: string;
	artists: { name: string }[];
	release_date?: string;
	images?: { url: string }[];
	external_urls?: { spotify?: string };
}
