import { useState, useEffect } from 'react';
import Star from './Star';
import PropTypes from 'prop-types';
import {
  selectAverageRatingForAlbum,
  selectReviewsForAlbum,
  addOrUpdateReview,
  fetchReviewsThunk,
  deleteReviewThunk,
} from '../store/reviewSlice';
import { postReview } from '../api/albums';
import { useSelector, useDispatch } from 'react-redux';

export default function StarRating({ count = 5, albumId }) {
  const dispatch = useDispatch();

  const averageRating = useSelector((state) =>
    selectAverageRatingForAlbum(state, albumId || [])
  );

  const reviews = useSelector((state) => selectReviewsForAlbum(state, albumId));

  // Find current user's review
  const existingReview = reviews.find((r) => r.user === 'defaultUser');
  const userRating = existingReview?.rating || 0;

  const [_, setCurrentRating] = useState(userRating);
  const [hoveredStar, setHoveredStar] = useState(null);

  useEffect(() => {
    setCurrentRating(userRating);
  }, [userRating]);

  async function handleOnClickStar(rating) {
    setCurrentRating(rating);

    const reviewObj = {
      albumId,
      user: 'defaultUser',
      comment: existingReview?.comment || '',
      rating,
    };

    dispatch(addOrUpdateReview(reviewObj));

    try {
      await postReview(albumId, reviewObj);
      dispatch(fetchReviewsThunk());
    } catch (error) {
      console.error('Failed to save rating', error);
    }
  }

  function handleOnHoverStar(index) {
    setHoveredStar(index);
  }

  function handleRemoveRating(reviewId) {
    dispatch(deleteReviewThunk(reviewId));
  }

  return (
    <div className='flex flex-col gap-[6px]'>
      <div className='flex items-center gap-[6px]'>
        {Array.from({ length: count }).map((_, i) => {
          const index = i + 1;
          const isFilled = hoveredStar
            ? index <= hoveredStar
            : index <= (userRating || averageRating);

          const isUserRated = userRating > 0 && index <= userRating;

          return (
            <Star
              key={i}
              filled={isFilled}
              onClick={() => handleOnClickStar(index)}
              onMouseOver={() => handleOnHoverStar(index)}
              onMouseLeave={() => setHoveredStar(null)}
              isUserRated={isUserRated}
            />
          );
        })}
        <span className='text-sm text-stone-300'>
          {averageRating.toFixed(1)}
        </span>
      </div>

      {userRating > 0 ? (
        <span className='text-xs text-stone-300'>
          You rated {userRating} star{userRating > 1 ? 's' : ''}
          <button
            className='ml-2 text-red-400 hover:underline'
            onClick={() => handleRemoveRating(existingReview.id)}
          >
            Remove
          </button>
        </span>
      ) : (
        <span className='text-xs text-stone-400'>You didn't rate this.</span>
      )}
    </div>
  );
}

StarRating.propTypes = {
  count: PropTypes.number,
  albumId: PropTypes.number.isRequired,
};
