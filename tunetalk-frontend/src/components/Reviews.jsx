import { useState } from 'react';
import PropTypes from 'prop-types';
import ReviewInput from './ReviewInput';
import { useSelector } from 'react-redux';
import { selectAlbumById } from '../store/albumSlice';
import { selectReviewsByIds } from '../store/reviewSlice';

export default function Reviews({ albumId }) {
  const [reviewText, setReviewText] = useState('');
  const album = useSelector((state) => selectAlbumById(state, albumId));
  const reviews = useSelector((state) =>
    selectReviewsByIds(state, album?.reviewIds)
  );

  function handleAddReview() {
    setReviewText('');
  }

  function handleOnChange(e) {
    setReviewText(e.target.value);
  }

  return (
    <section className='grid grid-cols-1'>
      <h2 className='text-2xl mb-1 shrink-0'>Reviews</h2>
      <div className='flex-1 flex flex-col gap-2 p-2'>
        <ReviewInput
          onChange={handleOnChange}
          onAddReview={handleAddReview}
          value={reviewText}
        />
        <div className='flex flex-col gap-2'>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className='bg-[#C2E1FA]/10 rounded-lg p-2'>
                <p className='whitespace-pre-line text-stone-100'>
                  {review.comment}
                </p>
              </div>
            ))
          ) : (
            <p className='text-stone-400 italic'>No reviews yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}

Reviews.propTypes = {
  albumId: PropTypes.number.isRequired,
};
