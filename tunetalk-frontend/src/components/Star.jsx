import { IoStar, IoStarOutline } from 'react-icons/io5';
import PropTypes from 'prop-types';

export default function Star({
  filled,
  onClick,
  onMouseOver,
  onMouseLeave,
  isUserRated,
}) {
  const Icon = filled ? IoStar : IoStarOutline;

  return (
    <button
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      className='focus:outline-none'
    >
      <Icon
        className={`text-3xl transition-all duration-200
          text-stone-200
          ${
            isUserRated
              ? 'text-yellow-200 drop-shadow-[0_0_4px_rgba(250,204,21,0.5)]'
              : ''
          }
          ${filled && !isUserRated ? 'text-yellow-50' : ''}
          hover:text-yellow-300
        `}
      />
    </button>
  );
}

Star.propTypes = {
  filled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  onMouseOver: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  isUserRated: PropTypes.bool,
};
