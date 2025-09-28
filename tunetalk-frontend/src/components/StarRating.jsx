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
import { IoRemoveCircle } from 'react-icons/io5';

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

  function handleRemoveRating(reviewId) {
    dispatch(deleteReviewThunk(reviewId));
  }

  return (
    <div className='flex flex-col gap-[2px]'>
      <div className='flex items-center gap-[4px]'>
        {Array.from({ length: count }).map((_, i) => {
          const index = i + 1;

          const fullStars = Math.floor(averageRating);
          const fraction = averageRating - fullStars;
          const hasHalfStar = fraction >= 0.5;
          let half = hasHalfStar && index === fullStars + 1;

          return (
            <button
              key={i}
              onClick={() => handleOnClickStar(index)}
              onMouseOver={() => setHoveredStar(index)}
              onMouseLeave={() => setHoveredStar(null)}
            >
              <Star
                size='20'
                color={
                  hoveredStar !== null || userRating > 0
                    ? 'rgba(250,204,21)'
                    : '#FFFFFF'
                }
                filled={
                  hoveredStar !== null
                    ? index <= hoveredStar
                    : userRating > 0
                    ? index <= userRating
                    : index <= fullStars
                }
                half={hoveredStar === null && userRating === 0 ? half : false}
              />
            </button>
          );
        })}
        <span className='text-[10px] sm:text-[12px]'>{averageRating.toFixed(1)}</span>
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            userRating > 0 ? 'opacity-100 py-1' : 'opacity-0 py-0'
          }`}
        >
          <span className='flex flex-wrap items-center gap-1 sm:gap-2 text-[10px] sm:text-[14px] text-stone-300'>
            <button
              className='ml-1 sm:ml-2 p-1 rounded-full hover:bg-red-200 active:bg-red-300 transition-colors'
              onClick={() => handleRemoveRating(existingReview.id)}
            >
              <IoRemoveCircle
                className='w-4 h-4 sm:w-5 sm:h-5'
                color='#ffe3e3'
              />
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}

StarRating.propTypes = {
  count: PropTypes.number,
  albumId: PropTypes.number.isRequired,
};
