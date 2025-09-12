import { useContext } from 'react';
import { ReviewContext } from '../store/ReviewContext';

export default function useReviews() {
  const context = useContext(ReviewContext);

  if (!context) {
    throw new Error('useReview must be used within an ReviewProvider');
  }

  return context;
}
