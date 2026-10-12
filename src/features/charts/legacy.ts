import type { Album } from "#/features/albums/types";
import { artworkUrl } from "#/features/albums/utils";

type Label = { label: string };

// One entry of the iTunes Store RSS feeds (topalbums and topsongs).
export interface LegacyChartEntry {
	"im:name": Label;
	"im:image"?: Label[];
	"im:artist": Label & { attributes?: { href?: string } };
	"im:releaseDate"?: Label;
	id: { attributes: { "im:id": string } };
	link?:
		| { attributes: { href?: string } }
		| { attributes: { href?: string } }[];
	category?: { attributes: { label?: string } };
}

// A feed with a single entry returns it as an object, not an array.
export type LegacyChartResponse = {
	feed: { entry?: LegacyChartEntry | LegacyChartEntry[] };
};

export function legacyEntries(data: LegacyChartResponse) {
	const entry = data.feed?.entry;
	if (!entry) return [];
	return Array.isArray(entry) ? entry : [entry];
}

// Artist links look like https://music.apple.com/us/artist/skillet/1750802?uo=2
function artistIdFromUrl(url: string | undefined) {
	return url?.match(/\/(\d+)(?:\?|$)/)?.[1];
}

// The last image is the largest (170px); artworkUrl swaps in a bigger size.
function largestImage(images: Label[] | undefined) {
	return artworkUrl(images?.at(-1)?.label);
}

export function normalizeLegacyChartAlbum(entry: LegacyChartEntry): Album {
	const link = Array.isArray(entry.link) ? entry.link[0] : entry.link;
	return {
		id: entry.id.attributes["im:id"],
		title: entry["im:name"].label,
		artist: entry["im:artist"].label,
		releaseDate: entry["im:releaseDate"]?.label.slice(0, 10) ?? "",
		image: largestImage(entry["im:image"]),
		appleMusicUrl: link?.attributes.href ?? null,
		artistId: artistIdFromUrl(entry["im:artist"].attributes?.href),
		genre: entry.category?.attributes.label,
	};
}
