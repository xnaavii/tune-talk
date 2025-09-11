import { useState } from 'react';
import useAlbum from '../hooks/useAlbum';
import PropTypes from 'prop-types';

export default function Reviews({ albumId, reviews = [] }) {
  const { reviewAlbum } = useAlbum();
  const [reviewText, setReviewText] = useState('');

  function handleAddReview() {
    if (!reviewText.trim()) return;
    reviewAlbum(albumId, reviewText.trim());
    setReviewText('');
  }

  return (
    <div className='flex-1 flex flex-col gap-2 p-2'>
      <div className='flex items-center justify-between bg-[#C2E1FA]/10 rounded-xl gap-1 h-25 p-2 shrink-0'>
        <textarea
          name='review'
          id='review'
          placeholder='Write a review'
          maxLength={150}
          value={reviewText}
          onChange={(event) => setReviewText(event.target.value)}
          className='w-full h-full resize-none text-stone-50 p-2 outline-none focus:ring-1 focus:ring-stone-200 focus:ring-inset focus:bg-[#C2E1FA]/30 border border-stone-300 rounded-lg text-md bg-[#C2E1FA]/20'
        ></textarea>
        <button className='hover:cursor-pointer' onClick={handleAddReview}>
          Add
        </button>
      </div>

      <div className='flex flex-col gap-2'>
        {reviews.length === 0 ? (
          <p className='text-stone-400 italic'>No reviews yet.</p>
        ) : (
          reviews.map((review, i) => (
            <div
              key={i}
              className='bg-[#C2E1FA]/10 rounded-lg p-2 text-stone-100'
            >
              {review}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

Reviews.propTypes = {
  albumId: PropTypes.string.isRequired,
  reviews: PropTypes.array,
};
