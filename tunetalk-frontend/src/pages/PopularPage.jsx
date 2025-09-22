import { useEffect } from 'react';
import { getAlbums } from '../api/albums';
import useAlbum from '../hooks/useAlbum';
import AlbumCard from '../components/AlbumCard';

export default function PopularPage() {
  const { albums, setAlbums } = useAlbum();

  const sortedAlbums = [...albums].sort((a, b) => {
    const ratingDifference = b.rating - a.rating;
    if (ratingDifference !== 0) return ratingDifference;

    return b.reviews.length - a.reviews.length;
  });

  useEffect(() => {
    getAlbums()
      .then((albums) => setAlbums(albums))
      .catch((error) => console.log(error));
  }, [setAlbums]);

  return (
    <>
      <h2 className='text-3xl p-4 font-semibold'>Popular Music</h2>
      {sortedAlbums?.length > 0 ? (
        <div className='flex flex-col gap-2 items-center p-4'>
          {sortedAlbums.map((album, index) => (
            <div key={album.id} className='w-full flex flex-col gap-1 py-2'>
              <span className='text-xl text-stone-100'>{`${index + 1}. ${
                album.title
              }`}</span>
              <AlbumCard albumId={album.id} />
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
}
