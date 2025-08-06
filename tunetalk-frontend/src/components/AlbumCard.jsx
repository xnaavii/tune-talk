import { Link } from 'react-router-dom';
import { useState } from 'react';
import Button from './Button';
import StarRating from './StarRating';

export default function AlbumCard({ album }) {
  const [isRating, setIsRating] = useState(false);

  function handleOnAddRating() {
    setIsRating(!isRating);
  }

  return (
    <figure className='relative flex gap-4 rounded-2xl overflow-hidden h-36'>
      {/* Blurred background when rating */}
      {isRating && (
        <div
          className='absolute inset-0 z-0 bg-cover bg-center blur-lg scale-110 transition-all duration-300'
          style={{ backgroundImage: `url(${album.image})` }}
        />
      )}

      <div className='relative z-10 flex gap-3 w-full bg-[#0F2E48]/40 rounded-2xl p-3 items-center h-full'>
        {/* Image wrapper with fixed width */}
        <div className='w-28 h-full overflow-hidden flex items-center justify-center'>
          <Link to={`/results/${album.id}`}>
            <img
              src={album.image}
              alt={`Album cover for ${album.artist} - ${album.title}`}
              className={`rounded-md object-cover h-full transition-all duration-300 ease-in-out ${
                isRating ? 'scale-90 opacity-70' : 'scale-100 opacity-100'
              }`}
            />
          </Link>
        </div>

        {/* Content stays fixed in its area */}
        <div className='flex flex-col justify-between flex-1 h-full'>
          <figcaption className='flex flex-col gap-1'>
            <p className='text-lg font-semibold'>{album.title}</p>
            <p className='text-md'>{album.artist}</p>
            <p className='text-sm text-stone-400'>{album.year}</p>
          </figcaption>

          <div className='self-end'>
            {isRating ? (
              <StarRating onAddRating={handleOnAddRating} />
            ) : (
              <Button
                icon={'star-outline'}
                label={'Add rating'}
                onClick={handleOnAddRating}
              />
            )}
          </div>
        </div>
      </div>
    </figure>
  );
}
