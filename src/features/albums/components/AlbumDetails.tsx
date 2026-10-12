import { StarRating } from "#/features/reviews/components/StarRating";
import type { Album } from "../types";
import { releaseYear } from "../utils";
import { AlbumCover } from "./AlbumCover";

export function AlbumDetails({ album }: { album: Album }) {
	return (
		<figure className="grid px-[14px] py-[6px] grid-cols-1 sm:grid-cols-[2fr_2fr] md:grid-cols-[1fr_3fr] gap-[10px] w-full shrink-0">
			<AlbumCover
				album={album}
				className="object-cover rounded-md shadow-lg w-full"
			/>

			<figcaption className="flex flex-col justify-center p-[6px] gap-[12px]">
				<div>
					<h2 className="text-[24px] font-bold text-[#FFFFFF]">
						{album.title}
					</h2>
					<h3 className="text-[20px] font-medium text-stone-200 mb-2">
						{album.artist}
					</h3>
					<p className="text-[16px] text-stone-400">{releaseYear(album)}</p>
					{album.spotifyUrl && (
						<a
							href={album.spotifyUrl}
							target="_blank"
							rel="noreferrer"
							className="text-[12px] text-[#1ED760] hover:underline"
						>
							Listen on Spotify
						</a>
					)}
				</div>

				<StarRating albumId={album.id} />
			</figcaption>
		</figure>
	);
}
