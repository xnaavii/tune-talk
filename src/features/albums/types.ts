import type { Song } from "#/features/songs/types";

export interface Album {
	id: string;
	title: string;
	artist: string;
	releaseDate: string;
	image: string | null;
	appleMusicUrl: string | null;
	// Catalog-only fields: albums snapshotted in the database don't have them.
	artistId?: string;
	genre?: string;
}

export interface RankedAlbum extends Album {
	averageRating: number;
	reviewCount: number;
}

// An album page: the album, its tracklist and a few liner-note details.
export interface AlbumWithTracks extends Album {
	trackCount: number;
	copyright: string | null;
	tracks: Song[];
}

// The subset of an iTunes Search API album ("collection") Tune Talk reads.
export interface CatalogAlbum {
	wrapperType?: string;
	collectionId: number;
	collectionName: string;
	artistId?: number;
	artistName: string;
	releaseDate?: string;
	artworkUrl100?: string;
	collectionViewUrl?: string;
	primaryGenreName?: string;
	trackCount?: number;
	copyright?: string;
}

// The subset of an Apple Music RSS chart entry Tune Talk reads.
export interface ChartAlbum {
	id: string;
	name: string;
	artistId?: string;
	artistName: string;
	releaseDate?: string;
	artworkUrl100?: string;
	url?: string;
	genres?: { name: string }[];
}
