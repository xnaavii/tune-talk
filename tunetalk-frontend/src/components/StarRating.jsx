import { useState } from 'react';
import Star from './Star';
import PropTypes from 'prop-types';
import { selectAlbumById } from '../store/albumSlice';
import { selectAverageRatingForAlbum } from '../store/reviewSlice';
import { useSelector } from 'react-redux';

export default function StarRating({ count = 5, albumId }) {
  const album = useSelector((state) => selectAlbumById(state, albumId));
  const averageRating = useSelector((state) =>
    selectAverageRatingForAlbum(state, album?.reviewIds || [])
  );

  const [currentRating, setCurrentRating] = useState(averageRating);
  const [hoveredStar, setHoveredStar] = useState(null);

  function handleOnClickStar(rating) {
    setCurrentRating(rating);
    // TODO: Add function to change rating
  }

  function handleOnHoverStar(index) {
    setHoveredStar(index);
  }

  return (
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
      <span className='text-sm text-stone-300'>{averageRating.toFixed(1)}</span>
    </div>
  );
}

StarRating.propTypes = {
  count: PropTypes.number,
  rating: PropTypes.number,
  albumId: PropTypes.number.isRequired,
};
