export interface Song {
	id: string;
	title: string;
	artist: string;
	artistId: string | null;
	albumId: string | null;
	albumTitle: string;
	image: string | null;
	// Apple's 30 second preview clip.
	previewUrl: string | null;
	durationMs: number | null;
	trackNumber: number | null;
	discNumber: number | null;
	explicit: boolean;
	appleMusicUrl: string | null;
}

// The subset of an iTunes Search API song ("track") Tune Talk reads.
export interface CatalogSong {
	wrapperType?: string;
	kind?: string;
	trackId: number;
	trackName: string;
	artistId?: number;
	artistName: string;
	collectionId?: number;
	collectionName?: string;
	artworkUrl100?: string;
	previewUrl?: string;
	trackTimeMillis?: number;
	trackNumber?: number;
	discNumber?: number;
	trackExplicitness?: string;
	trackViewUrl?: string;
}

// The subset of an Apple Music RSS song chart entry Tune Talk reads. Charts
// carry no preview, so entries are looked up in the catalog by id.
export interface ChartSong {
	id: string;
}
