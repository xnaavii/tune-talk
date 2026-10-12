import type { Album } from "#/features/albums/types";
import type { Song } from "#/features/songs/types";

export interface Artist {
	id: string;
	name: string;
	genre: string | null;
	// The catalog has no artist photos, so this is one of their album covers.
	image: string | null;
	appleMusicUrl: string | null;
}

export interface ArtistWithMusic extends Artist {
	albums: Album[];
	singles: Album[];
	topSongs: Song[];
}

// The subset of an iTunes Search API artist Tune Talk reads.
export interface CatalogArtist {
	wrapperType?: string;
	artistId: number;
	artistName: string;
	primaryGenreName?: string;
	artistLinkUrl?: string;
}
