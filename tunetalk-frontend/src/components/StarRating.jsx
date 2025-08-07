import { useState } from 'react';
import Star from './Star';

export default function StarRating({ count = 5 }) {
  const [currentRating, setCurrentRating] = useState(null);
  const [hoveredStar, setHoveredStar] = useState(null);

  function handleOnClickStar(index) {
    setCurrentRating(index);
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
            onMouseLeave={() => handleOnHoverStar(null)}
          />
        );
      })}
    </div>
  );
}
