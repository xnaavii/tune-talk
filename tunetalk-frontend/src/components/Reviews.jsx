import { useState } from 'react';
import PropTypes from 'prop-types';
import ReviewInput from './ReviewInput';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectReviewsForAlbum,
  addOrUpdateReview,
  fetchReviewsThunk,
  deleteReviewThunk,
} from '../store/reviewSlice';
import { selectRatingsForAlbum } from '../store/ratingSlice';
import { postReview } from '../api/albums';
import ReviewCard from './ReviewCard';

export default function Reviews({ albumId }) {
  const dispatch = useDispatch();
  const [reviewText, setReviewText] = useState('');

  const reviews = useSelector((state) => selectReviewsForAlbum(state, albumId));
  const ratings = useSelector((state) => selectRatingsForAlbum(state, albumId));

  console.log(ratings);

  async function handleAddReview() {
    if (!reviewText.trim()) return;

    const reviewObj = {
      albumId,
      userId: 'user1',
      comment: reviewText,
    };

    dispatch(addOrUpdateReview(reviewObj));

    try {
      await postReview(albumId, reviewObj);
      dispatch(fetchReviewsThunk());
    } catch (error) {
      console.error('Failed to save review', error);
    }

    setReviewText('');
  }

  function handleDeleteReview(reviewId) {
    dispatch(deleteReviewThunk(reviewId));
  }

  function handleOnChange(e) {
    setReviewText(e.target.value);
  }

  return (
    <section className='grid grid-cols-1'>
      <h2 className='text-2xl mb-1 shrink-0'>Reviews</h2>
      <div className='flex-1 flex flex-col gap-2 p-2'>
        <ReviewInput
          onChange={handleOnChange}
          onAddReview={handleAddReview}
          value={reviewText}
        />
        <div className='flex flex-col gap-2'>
          {reviews.length > 0 ? (
            reviews.map((review) => {
              const userRating =
                ratings.find((rating) => rating.userId === review.userId)
                  ?.rating || 0;

              return (
                <ReviewCard
                  key={review.id}
                  review={review}
                  onDelete={handleDeleteReview}
                  rating={userRating}
                />
              );
            })
          ) : (
            <p className='text-stone-400 text-sm italic'>No reviews yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}

Reviews.propTypes = {
  albumId: PropTypes.number.isRequired,
};
