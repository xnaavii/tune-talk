import { useState, useEffect } from 'react';
import Star from './Star';
import PropTypes from 'prop-types';
import {
  selectRatingsForAlbum,
  addOrUpdateRating,
  fetchRatingsThunk,
  selectAverageRatingForAlbum,
  deleteRatingThunk,
} from '../store/ratingSlice';
import { useSelector, useDispatch } from 'react-redux';
import { IoRemoveCircle } from 'react-icons/io5';
import { postRating } from '../api/albums';

export default function StarRating({ count = 5, albumId }) {
  const dispatch = useDispatch();

  const averageRating = useSelector((state) =>
    selectAverageRatingForAlbum(state, albumId)
  );

  const ratings = useSelector((state) => selectRatingsForAlbum(state, albumId));

  const existingRating = ratings.find((r) => r.userId === 'user1');

  const [currentRating, setCurrentRating] = useState(
    existingRating?.rating || 0
  );

  const [hoveredStar, setHoveredStar] = useState(null);

  useEffect(() => {
    setCurrentRating(existingRating?.rating || 0);
  }, [existingRating]);

  async function handleOnClickStar(rating) {
    setCurrentRating(rating);

    const ratingobj = {
      albumId,
      userId: 'user1',
      rating,
    };

    dispatch(addOrUpdateRating(ratingobj));

    try {
      await postRating(albumId, ratingobj);
      dispatch(fetchRatingsThunk());
    } catch (error) {
      console.error('Failed to save rating', error);
    }
  }

  function handleRemoveRating(ratingId) {
    dispatch(deleteRatingThunk(ratingId));
    setCurrentRating(0);
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
                  hoveredStar !== null || currentRating > 0
                    ? 'rgba(250,204,21)'
                    : '#FFFFFF'
                }
                filled={
                  hoveredStar !== null
                    ? index <= hoveredStar
                    : currentRating > 0
                    ? index <= currentRating
                    : index <= fullStars
                }
                half={
                  hoveredStar === null && currentRating === 0 ? half : false
                }
              />
            </button>
          );
        })}
        {averageRating > 0 ? (
          <span className='text-[10px] sm:text-[12px]'>
            {averageRating.toFixed(1)}
          </span>
        ) : null}
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            currentRating > 0 ? 'opacity-100 py-1' : 'opacity-0 py-0'
          }`}
        >
          <span className='flex flex-wrap items-center gap-1 sm:gap-2 text-[10px] sm:text-[14px] text-stone-300'>
            <button
              className='ml-1 sm:ml-2 p-1 rounded-full hover:bg-red-200 active:bg-red-300 transition-colors'
              onClick={() =>
                existingRating && handleRemoveRating(existingRating.id)
              }
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
