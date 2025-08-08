import { useState, useContext } from 'react';
import Star from './Star';
import { AlbumContext } from '../store/AlbumContext';

export default function StarRating({ count = 5, rating = null, albumId }) {
  const { ratings, rateAlbum } = useContext(AlbumContext);
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