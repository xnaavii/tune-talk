import type { Album } from "../types";
import { AlbumCard } from "./AlbumCard";

// A row of sleeves that scrolls sideways, like flipping through a crate.
export function AlbumShelf({ albums }: { albums: Album[] }) {
	return (
		<div className="shelf -mx-4 px-4 sm:-mx-8 sm:px-8">
			{albums.map((album) => (
				<AlbumCard key={album.id} album={album} />
			))}
		</div>
	);
}
