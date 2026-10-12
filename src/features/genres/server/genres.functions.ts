import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { toAppleMusicError } from "#/lib/apple-music";
import { findGenre, genreSlugSchema } from "../genres";
import { fetchGenre } from "./genres.server";

export const getGenre = createServerFn({ method: "GET" })
	.validator(z.object({ slug: genreSlugSchema }))
	.handler(async ({ data }) => {
		const genre = findGenre(data.slug);
		if (!genre) throw notFound();
		try {
			return await fetchGenre(genre);
		} catch (error) {
			throw toAppleMusicError(error, "Failed to get the genre");
		}
	});
