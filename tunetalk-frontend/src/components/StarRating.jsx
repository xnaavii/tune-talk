import { useState, useEffect } from 'react';
import Star from './Star';
import PropTypes from 'prop-types';
import {
  selectAverageRatingForAlbum,
  selectReviewsForAlbum,
  addOrUpdateReview,
} from '../store/reviewSlice';
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

  const [currentRating, setCurrentRating] = useState(userRating);
  const [hoveredStar, setHoveredStar] = useState(null);

  useEffect(() => {
    setCurrentRating(userRating);
  }, [userRating]);

  function handleOnClickStar(rating) {
    setCurrentRating(rating);

    dispatch(
      addOrUpdateReview({
        albumId,
        user: 'defaultUser',
        comment: existingReview?.comment || '',
        rating,
      })
    );
  }

  function handleOnHoverStar(index) {
    setHoveredStar(index);
  }

  return (
    <div className='flex flex-col gap-1'>
      <div className='flex items-center gap-2'>
        {Array.from({ length: count }).map((_, i) => {
          const index = i + 1;
          const isFilled = hoveredStar
            ? index <= hoveredStar
            : index <= currentRating;

          return (
            <Star
              key={i}
              filled={isFilled}
              onClick={() => handleOnClickStar(index)}
              onMouseOver={() => handleOnHoverStar(index)}
              onMouseLeave={() => setHoveredStar(null)}
            />
          );
        })}
        <span className='text-sm text-stone-300'>
          {averageRating.toFixed(1)}
        </span>
      </div>

      {userRating > 0 ? (
        <span className='text-xs text-stone-400'>
          You rated {userRating} star{userRating > 1 ? 's' : ''}
        </span>
      ) : (
        <span className='text-xs text-stone-400'>
          You didn't rate this.
        </span>
      )}
    </div>
  );
}

StarRating.propTypes = {
  count: PropTypes.number,
  albumId: PropTypes.number.isRequired,
};
