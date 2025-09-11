import PropTypes from 'prop-types';

export default function Star({ filled, onClick, onMouseOver, onMouseLeave }) {
  return (
    <button
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      <ion-icon
        name={filled ? 'star' : 'star-outline'}
        className='text-3xl text-stone-50 transition-all duration-150'
      />
    </button>
  );
}

Star.propTypes = {
  filled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  onMouseOver: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
};
