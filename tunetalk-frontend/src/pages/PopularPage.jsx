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
    // Compute average ratings
    const avgRatingA =
      reviews
        .filter((r) => r.albumId === a.id)
        .reduce((sum, r) => sum + r.rating, 0) / (a.reviewIds.length || 1);

    const avgRatingB =
      reviews
        .filter((r) => r.albumId === b.id)
        .reduce((sum, r) => sum + r.rating, 0) / (b.reviewIds.length || 1);

    // Sort by average rating descending
    if (avgRatingB !== avgRatingA) return avgRatingB - avgRatingA;

    // If ratings equal, sort by number of reviews
    return b.reviewIds.length - a.reviewIds.length;
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
