import Button from './Button';
import Star from './Star';

export default function StarRating({ count = 5, onAddRating }) {
  return (
    <div className='flex items-center gap-2'>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} />
      ))}
      <Button icon='checkmark-outline' onClick={onAddRating} />
    </div>
  );
}
