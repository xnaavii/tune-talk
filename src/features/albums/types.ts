export interface Album {
	id: string;
	title: string;
	artist: string;
	releaseDate: string;
	image: string | null;
	appleMusicUrl: string | null;
}

export interface RankedAlbum extends Album {
	averageRating: number;
	reviewCount: number;
}

// The subset of an iTunes Search API album ("collection") Tune Talk reads.
export interface CatalogAlbum {
	wrapperType?: string;
	collectionId: number;
	collectionName: string;
	artistName: string;
	releaseDate?: string;
	artworkUrl100?: string;
	collectionViewUrl?: string;
}

// The subset of an Apple Music RSS chart entry Tune Talk reads.
export interface ChartAlbum {
	id: string;
	name: string;
	artistName: string;
	releaseDate?: string;
	artworkUrl100?: string;
	url?: string;
}
