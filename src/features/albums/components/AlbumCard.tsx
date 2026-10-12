import { Link } from "@tanstack/react-router";
import type { Album } from "../types";
import { releaseYear } from "../utils";
import { AlbumCover, albumCoverUrl } from "./AlbumCover";

export function AlbumCard({ album }: { album: Album }) {
	return (
		<Link to="/albums/$albumId" params={{ albumId: album.id }}>
			<figure className="relative rounded-[16px] overflow-hidden transition-all duration-300 ease-in-out grid grid-cols-[auto] grid-rows-[auto] gap-2 hover:outline-lime-100">
				{/* Background image */}
				<div
					className="absolute inset-0 z-0 bg-cover bg-center blur-[32px] scale-110"
					style={{ backgroundImage: `url("${albumCoverUrl(album)}")` }}
				/>

				{/* Overlay for all content */}
				<div className="relative z-10 bg-[#0F2E48]/20 flex flex-row">
					<div className="flex items-center justify-center p-[10px] max-w-[80px] shrink-0">
						<AlbumCover
							album={album}
							loading="lazy"
							className="rounded-md object-cover transition-all duration-300 ease-in-out"
						/>
					</div>

					<div className="flex-1 flex flex-col justify-center p-[10px] gap-[8px] min-w-0">
						<figcaption className="flex flex-col gap-[2px]">
							<p className="text-[14px] sm:text-[16px] font-semibold hover:underline truncate">
								{album.title}
							</p>
							<p className="text-[14px] sm:text-[16px] truncate">
								{album.artist}
							</p>
							<p className="text-[10px] sm:text-[12px] text-stone-400">
								{releaseYear(album)}
							</p>
						</figcaption>
					</div>
				</div>
			</figure>
		</Link>
	);
}
