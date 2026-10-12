import { SectionHeading } from "#/components/PageHeader";
import { SongList } from "#/features/songs/components/SongList";
import { groupByDisc } from "#/features/songs/utils";
import type { AlbumWithTracks } from "../types";

// The album's songs, one list per disc, with the label's copyright line.
export function Tracklist({ album }: { album: AlbumWithTracks }) {
	if (album.tracks.length === 0) return null;
	const discs = groupByDisc(album.tracks);

	return (
		<section className="flex flex-col gap-3">
			{discs.map((disc) => (
				<div key={disc.label} className="flex flex-col gap-3">
					<SectionHeading>{disc.label}</SectionHeading>
					<SongList
						songs={disc.songs}
						queue={album.tracks}
						albumArtist={album.artist}
						numbering="track"
						showArtwork={false}
						showAlbum={false}
					/>
				</div>
			))}
			{album.copyright && (
				<p className="text-xs text-ink/50">{album.copyright}</p>
			)}
		</section>
	);
}
