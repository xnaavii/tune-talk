import type { ComponentProps } from "react";
import defaultCover from "#/assets/record-blue.jpg";
import type { Album } from "../types";

// Some albums have no artwork, so fall back to the site background.
export function albumCoverUrl(album: Pick<Album, "image">) {
	return album.image ?? defaultCover;
}

export function AlbumCover({
	album,
	...props
}: { album: Pick<Album, "image" | "title"> } & ComponentProps<"img">) {
	return (
		<img
			src={albumCoverUrl(album)}
			alt={`Cover of ${album.title}`}
			{...props}
		/>
	);
}
