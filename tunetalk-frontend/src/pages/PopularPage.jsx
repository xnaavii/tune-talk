import { useEffect } from 'react';
import { fetchAlbums } from '../store/albumSlice';
import { useSelector, useDispatch } from 'react-redux';
import AlbumCard from '../components/AlbumCard';

export default function PopularPage() {
  const dispatch = useDispatch();
  const { albums, status, error } = useSelector((state) => state.albums);
  const reviews = useSelector((state) => state.reviews.reviews);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAlbums());
    }
  }, [status, dispatch]);

  const sortedAlbums = [...albums].sort((a, b) => {
    const ratingDifference = b.rating - a.rating;
    if (ratingDifference !== 0) return ratingDifference;

    const bReviewsCount = reviews.filter((r) => r.albumId === b.id).length;
    const aReviewsCount = reviews.filter((r) => r.albumId === a.id).length;

    return bReviewsCount - aReviewsCount;
  });

  if (status === 'loading') return <p>Loading ...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

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
