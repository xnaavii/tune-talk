import { z } from "zod";

// Crates on the Explore page. `term` is matched against Apple's genre index.
export const GENRES = [
	{ slug: "pop", name: "Pop", term: "pop", hue: 330 },
	{ slug: "hip-hop", name: "Hip-Hop/Rap", term: "hip-hop/rap", hue: 25 },
	{ slug: "rnb", name: "R&B/Soul", term: "r&b/soul", hue: 280 },
	{ slug: "rock", name: "Rock", term: "rock", hue: 0 },
	{ slug: "alternative", name: "Alternative", term: "alternative", hue: 200 },
	{ slug: "electronic", name: "Electronic", term: "electronic", hue: 170 },
	{ slug: "jazz", name: "Jazz", term: "jazz", hue: 45 },
	{ slug: "country", name: "Country", term: "country", hue: 35 },
	{ slug: "latin", name: "Latin", term: "latin", hue: 10 },
	{ slug: "k-pop", name: "K-Pop", term: "k-pop", hue: 300 },
	{ slug: "classical", name: "Classical", term: "classical", hue: 220 },
	{ slug: "metal", name: "Metal", term: "metal", hue: 240 },
] as const;

export type Genre = (typeof GENRES)[number];
export type GenreSlug = Genre["slug"];

export const genreSlugSchema = z.enum(
	GENRES.map((genre) => genre.slug) as [GenreSlug, ...GenreSlug[]],
);

export function findGenre(slug: string) {
	return GENRES.find((genre) => genre.slug === slug);
}
