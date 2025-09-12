import { useContext } from 'react';
import { RatingContext } from '../store/RatingContext';

export default function useRatings() {
  const context = useContext(RatingContext);

  if (!context) {
    throw new Error('useRating must be used within an RatingProvider');
  }

  return context;
}
