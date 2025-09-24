import AlbumCard from '../components/AlbumCard';
import { useSelector } from 'react-redux';
import { selectAllAlbums } from '../store/albumSlice';

export default function NewAlbumsPage() {
  const albums = useSelector(selectAllAlbums);

  // Group albums by year
  const albumsByYear = albums.reduce((acc, album) => {
    if (!acc[album.year]) acc[album.year] = [];
    acc[album.year].push(album);
    return acc;
  }, {});

  const sortedYears = Object.keys(albumsByYear).sort((a, b) => b - a);

  return (
    <div className='flex flex-col gap-4 p-4'>
      <h2 className='text-3xl font-semibold text-stone-100 mb-4'>
        Newly Released Albums
      </h2>

      {sortedYears.length === 0 ? (
        <p className='text-stone-300'>No albums available.</p>
      ) : (
        sortedYears.map((year) => (
          <div key={year} className='flex flex-col gap-2'>
            <h3 className='text-xl font-medium text-stone-200 mt-4 mb-2'>
              {year}
            </h3>
            <div className='flex flex-col gap-2'>
              {albumsByYear[year].map((album) => (
                <AlbumCard key={album.id} albumId={album.id} />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
