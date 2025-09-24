import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReviewInput from './ReviewInput';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectReviewsForAlbum,
  addOrUpdateReview,
  fetchReviewsThunk,
  deleteReviewThunk,
} from '../store/reviewSlice';
import { postReview } from '../api/albums';
import ReviewCard from './ReviewCard';

export default function Reviews({ albumId }) {
  const dispatch = useDispatch();
  const [reviewText, setReviewText] = useState('');

  useEffect(() => {
    dispatch(fetchReviewsThunk());
  }, [dispatch]);

  const reviews = useSelector((state) => selectReviewsForAlbum(state, albumId));

  const existingReview = reviews.find((r) => r.user === 'defaultUser');
  const currentRating = existingReview?.rating || 0;

  async function handleAddReview() {
    if (!reviewText.trim()) return; // don't add empty reviews

    const reviewObj = {
      albumId,
      user: 'defaultUser',
      comment: reviewText,
      rating: currentRating,
    };

    dispatch(addOrUpdateReview(reviewObj));

    try {
      await postReview(albumId, reviewObj);
      dispatch(fetchReviewsThunk());
    } catch (error) {
      console.error('Failed to save rating', error);
    }

    setReviewText('');
  }

  function handleDeleteReview() {
    dispatch(deleteReviewThunk(existingReview.id));
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
            reviews
              .filter(
                (review) => review.comment && review.comment.trim() !== ''
              )
              .map((review) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  onDelete={handleDeleteReview}
                />
              ))
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
