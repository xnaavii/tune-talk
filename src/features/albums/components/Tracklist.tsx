import { SectionHeading } from "#/components/PageHeader";
import { SongList } from "#/features/songs/components/SongList";
import { splitIntoSides } from "#/features/songs/utils";
import type { AlbumWithTracks } from "../types";

// The album's songs laid out like the back of the sleeve: Side A, Side B,
// with the label's copyright line at the bottom.
export function Tracklist({ album }: { album: AlbumWithTracks }) {
	if (album.tracks.length === 0) return null;
	const sides = splitIntoSides(album.tracks);

	return (
		<section className="flex flex-col gap-6">
			{sides.map((side) => (
				<div key={side.label} className="flex flex-col gap-2">
					<SectionHeading>{side.label}</SectionHeading>
					<SongList
						songs={side.songs}
						queue={album.tracks}
						albumArtist={album.artist}
						numbering="track"
						showArtwork={false}
						showAlbum={false}
					/>
				</div>
			))}
			{album.copyright && (
				<p className="font-mono text-[11px] text-ink/40">{album.copyright}</p>
			)}
		</section>
	);
}
