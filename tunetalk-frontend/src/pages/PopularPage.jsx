import { useEffect } from 'react';
import { fetchAlbumsThunk } from '../store/albumSlice';
import { useSelector, useDispatch } from 'react-redux';
import AlbumCard from '../components/AlbumCard';
import { IoStar } from 'react-icons/io5';

export default function PopularPage() {
  const dispatch = useDispatch();
  const { albums, status, error } = useSelector((state) => state.albums);
  const reviews = useSelector((state) => state.reviews.reviews);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAlbumsThunk());
    }
  }, [status, dispatch]);

  const sortedAlbums = [...albums].sort((a, b) => {
    // Filter actual reviews for each album
    const reviewsA = reviews.filter((r) => r.albumId === a.id);
    const reviewsB = reviews.filter((r) => r.albumId === b.id);

    const avgRatingA =
      reviewsA.length > 0
        ? reviewsA.reduce((sum, r) => sum + r.rating, 0) / reviewsA.length
        : 0;

    const avgRatingB =
      reviewsB.length > 0
        ? reviewsB.reduce((sum, r) => sum + r.rating, 0) / reviewsB.length
        : 0;

    // Sort by average rating descending
    if (avgRatingB !== avgRatingA) return avgRatingB - avgRatingA;

    // If ratings equal, sort by number of reviews
    return reviewsB.length - reviewsA.length;
  });

  if (status === 'loading') return <p>Loading ...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <>
      <h2 className='text-3xl font-semibold text-stone-100 mb-4'>
        Popular Music
      </h2>

      {sortedAlbums.length > 0 ? (
        <div className='flex flex-col gap-[12px] w-full'>
          {sortedAlbums.map((album) => {
            const albumReviews = reviews.filter((r) => r.albumId === album.id);
            const avgRating =
              albumReviews.length > 0
                ? albumReviews.reduce((sum, r) => sum + r.rating, 0) /
                  albumReviews.length
                : 0;

            return (
              <div key={album.id} className='flex flex-row gap-3 items-center'>
                <span className='flex items-center gap-[6px] text-stone-200'>
                  {avgRating.toFixed(1)} <IoStar size={12} />
                </span>
                <div className='flex-1'>
                  <AlbumCard album={album} />
                </div>

                {/* <span className='text-[12px]'>
                  {albumReviews.length} reviews
                </span> */}
              </div>
            );
          })}
        </div>
      ) : (
        <p className='text-stone-300'>No popular albums available.</p>
      )}
    </>
  );
}
