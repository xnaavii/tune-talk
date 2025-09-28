import PropTypes from 'prop-types';

export default function ReviewCard({ review, onDelete }) {
  return (
    <div className='bg-[#C2E1FA]/10 rounded-xl p-3 flex flex-col gap-2 shadow-sm'>
      <div className='flex justify-between items-start'>
        <p className='whitespace-pre-line text-stone-100 text-sm leading-relaxed'>
          {review.comment}
        </p>

        {review.userId === 'user1' && review.comment !== '' && (
          <button
            onClick={() => onDelete(review.id)}
            className='text-xs text-red-400 hover:text-red-300 transition-colors'
          >
            ✕ Remove
          </button>
        )}
      </div>

      {/* Stars */}
      <div className='flex items-center gap-1'>
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={i < review.rating ? 'text-yellow-400' : 'text-stone-600'}
          >
            ★
          </span>
        ))}
      </div>

      <span className='text-xs text-stone-400 italic'>— {review.userId}</span>
    </div>
  );
}

ReviewCard.propTypes = {
  review: PropTypes.shape({
    albumId: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    edited: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    userId: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};
