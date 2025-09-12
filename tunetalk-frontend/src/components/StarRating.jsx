import { useState } from 'react';
import useRatings from '../hooks/useRatings';
import Star from './Star';
import PropTypes from 'prop-types';

export default function StarRating({ count = 5, rating = null, albumId }) {
  const { ratings, addRating } = useRatings();
  const albumRating = ratings[albumId];
  const [currentRating, setCurrentRating] = useState(albumRating || rating);
  const [hoveredStar, setHoveredStar] = useState(null);

  function handleOnClickStar(rating) {
    setCurrentRating(rating);
    addRating(albumId, rating);
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
    </div>
  );
}

StarRating.propTypes = {
  count: PropTypes.number,
  rating: PropTypes.number,
  albumId: PropTypes.string.isRequired,
};
