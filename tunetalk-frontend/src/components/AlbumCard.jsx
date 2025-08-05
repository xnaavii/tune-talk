import { Link } from 'react-router-dom';
import { useState } from 'react';
import Button from './Button';
import Star from './Star';

export default function AlbumCard({ album }) {
  const [isRating, setIsRating] = useState(null);

  function handleOnAddRating() {
    setIsRating(true);
  }

  return (
    <figure className='p-2 flex gap-4 bg-[#0F2E48]/40 rounded-xl active:bg-[#0F2E48]/60'>
      <Link to={`/results/${album.id}`} className='flex-1/4'>
        <img
          src={album.image}
          alt={`Album cover for ${album.artist} - ${album.title}`}
          className='rounded-md object-cover w-full'
        />
      </Link>

      <div className='flex flex-col justify-between flex-1/2'>
        <figcaption className='flex-1/2'>
          <p className='text-lg font-semibold'>{album.title}</p>
          <p className='text-md'>{album.artist}</p>
          <p className='text-sm text-stone-400'>{album.year}</p>
        </figcaption>

        <div className='self-end'>
          {isRating && <Star />}
          {!isRating && (
            <Button
              icon={'star-outline'}
              label={'Add rating'}
              onClick={handleOnAddRating}
            />
          )}
        </div>
      </div>
    </figure>
  );
}
