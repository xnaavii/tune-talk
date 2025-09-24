import { useSelector } from 'react-redux';
import AlbumCard from '../components/AlbumCard';
import { selectAllReviews } from '../store/reviewSlice';

export default function MyReviewsPage() {
  const reviews = useSelector(selectAllReviews);

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
      <div className='flex flex-col gap-4 p-4'>
        <h2 className='text-3xl font-semibold text-stone-100 mb-4'>
          Your Reviews
        </h2>
        {myReviews.length === 0 ? (
          <p className='text-stone-300'>You haven't reviewed any albums yet.</p>
        ) : (
          sortedRatings.map((rating) => (
            <div key={rating}>
              <h3 className='text-xl font-medium text-stone-200 mt-4 mb-2'>
                {rating} Star Reviews
              </h3>
              <div className='flex flex-col gap-4'>
                {[...reviewsByRating[rating]].map((albumId) => (
                  <AlbumCard key={albumId} albumId={albumId} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
