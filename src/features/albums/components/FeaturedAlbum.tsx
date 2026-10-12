import { Link } from "@tanstack/react-router";
import { IoChevronForward } from "react-icons/io5";
import { Vinyl } from "#/components/Vinyl";
import type { Album } from "../types";
import { displayTitle, releaseYear } from "../utils";
import { albumCoverUrl } from "./AlbumCover";

// Explore page hero: the day's number one album, sleeve and record side by
// side on a wash of its own colours.
export function FeaturedAlbum({
	album,
	eyebrow,
}: {
	album: Album;
	eyebrow: string;
}) {
	return (
		<Link
			to="/albums/$albumId"
			params={{ albumId: album.id }}
			className="group relative isolate flex flex-col-reverse gap-6 overflow-hidden rounded-2xl p-6 shadow-sleeve ring-1 ring-ink/10 sm:flex-row sm:items-center sm:justify-between sm:p-10"
		>
			<div
				aria-hidden
				className="absolute inset-0 -z-10 scale-125 bg-cover bg-center opacity-70 blur-3xl"
				style={{ backgroundImage: `url("${albumCoverUrl(album)}")` }}
			/>
			<div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-deep/90 via-navy-deep/60 to-navy-deep/10" />

			<div className="flex max-w-md flex-col gap-3">
				<p className="eyebrow !text-label">{eyebrow}</p>
				<h2 className="display-title text-4xl text-ink sm:text-6xl">
					{displayTitle(album)}
				</h2>
				<p className="text-lg text-ink/80">
					{album.artist}
					<span className="text-ink/50">
						{" "}
						· {[album.genre, releaseYear(album)].filter(Boolean).join(" · ")}
					</span>
				</p>
				<span className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-navy-deep transition-colors group-hover:bg-glass">
					Open album
					<IoChevronForward aria-hidden className="size-4" />
				</span>
			</div>

			<div className="relative h-40 w-56 shrink-0 self-center sm:h-56 sm:w-80">
				<Vinyl
					image={album.image}
					spinning
					className="absolute top-0 right-0 h-full"
				/>
				<img
					src={albumCoverUrl(album)}
					alt={`Cover of ${album.title}`}
					className="absolute top-0 left-0 aspect-square h-full rounded-[4px] object-cover shadow-sleeve transition-transform duration-500 group-hover:-translate-x-2 group-hover:-rotate-2"
				/>
			</div>
		</Link>
	);
}
