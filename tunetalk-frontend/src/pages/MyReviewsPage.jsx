import { useSelector } from 'react-redux';
import AlbumCard from '../components/AlbumCard';
import { selectAllReviews } from '../store/reviewSlice';
import { selectAllAlbums } from '../store/albumSlice';

export default function MyReviewsPage() {
  const reviews = useSelector(selectAllReviews);
  const albums = useSelector(selectAllAlbums);

  // Only reviews by current user
  const myReviews = reviews.filter((r) => r.user === 'defaultUser');

  // Group album IDs by rating
  const reviewsByRating = myReviews.reduce((acc, review) => {
    if (!acc[review.rating]) acc[review.rating] = new Set();
    acc[review.rating].add(review.albumId);
    return acc;
  }, {});

  // Sort ratings descending (5 stars first)
  const sortedRatings = Object.keys(reviewsByRating)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <>
      <h2 className='text-3xl font-semibold text-stone-100 mb-4'>My Reviews</h2>
      <div className='flex flex-col gap-6'>
        {myReviews.length === 0 ? (
          <p className='text-stone-300'>You haven't reviewed any albums yet.</p>
        ) : (
          sortedRatings.map((rating) => {
            const albumList = [...reviewsByRating[rating]];

            return (
              <div key={rating} className='flex flex-col gap-2'>
                <h3 className='text-xl font-medium text-stone-200 mt-4 mb-2'>
                  {rating} Star Reviews
                </h3>
                <div
                  className={`grid grid-flow-col auto-cols-[220px] gap-[6px] overflow-x-auto py-2 ${
                    albumList.length > 2 ? 'grid-rows-2' : 'grid-rows-1'
                  }`}
                >
                  {albumList.map((albumId) => {
                    const album = albums.find((a) => a.id === albumId);
                    return (
                        <div
                          key={albumId}
                          className='w-full flex flex-col gap-1'
                        >
                          <AlbumCard album={album} />
                        </div>
                        
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
