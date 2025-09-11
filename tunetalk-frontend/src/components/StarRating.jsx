import { useState } from 'react';
import useAlbum from '../hooks/useAlbum';
import Star from './Star';
import PropTypes from 'prop-types';

export default function StarRating({ count = 5, rating = null, albumId }) {
  const { ratings, rateAlbum } = useAlbum();
  const [currentRating, setCurrentRating] = useState(
    rating || ratings[albumId] || 0
  );
  const [hoveredStar, setHoveredStar] = useState(null);

  function handleOnClickStar(index) {
    setCurrentRating(index);
    rateAlbum(albumId, index); // update context
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
