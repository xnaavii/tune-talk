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
