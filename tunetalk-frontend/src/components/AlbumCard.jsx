import Button from './Button';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AlbumCard({ album }) {
  const [isRating, setIsRating] = useState(false);
  const [currentRating, setCurrentRating] = useState(null);
  const [hoverRating, setHoverRating] = useState(null);

  let hasRated;

  if (currentRating != null) {
    hasRated = currentRating;
  }

  function handleAddRating() {
    setIsRating(true);
  }

  function handleSetRating(rating) {
    setCurrentRating(rating);
  }

  function handleConfirmRating() {
    setIsRating(false);
  }

  function handleCancelRating() {
    setCurrentRating(null);
    setIsRating(false);
  }

  return (
    <figure className='p-4 flex gap-4 bg-[#0F2E48]/40 rounded-xl hover:bg-[#0F2E48]/60'>
      <img
        src={album.image}
        alt={`Album cover for ${album.artist} - ${album.title}`}
        className='rounded-md object-cover w-30 h-30'
      />

      <div className='flex flex-col justify-between flex-1'>
        <div>
          <p className='font-semibold'>{album.title}</p>
          <p className='text-sm'>{album.artist}</p>
          <p className='text-xs text-stone-400'>{album.year}</p>
        </div>

        <div className='flex gap-2 mt-4 self-end items-center'>
          {isRating ? (
            <>
              {/* Cancel Button  */}
              <button
                onClick={handleCancelRating}
                className='text-red-400 hover:text-red-600 transition-colors duration-150'
              >
                <ion-icon
                  name='close-circle-outline'
                  class='text-2xl'
                ></ion-icon>
              </button>

              {[...Array(5)].map((_, index) => {
                const starIndex = index + 1;
                return (
                  <button
                    key={index}
                    onMouseEnter={() => setHoverRating(starIndex)}
                    onMouseLeave={() => setHoverRating(null)}
                    onClick={() => handleSetRating(starIndex)}
                  >
                    <ion-icon
                      name={
                        (hoverRating || currentRating) >= starIndex
                          ? 'star'
                          : 'star-outline'
                      }
                      class='text-2xl text-stone-100 transition-colors duration-150'
                    ></ion-icon>
                  </button>
                );
              })}

              {/* Confirm Button */}
              <button
                onClick={handleConfirmRating}
                className='text-green-400 hover:text-green-600 transition-colors duration-150'
              >
                <ion-icon
                  name='checkmark-circle-outline'
                  class='text-2xl'
                ></ion-icon>
              </button>
            </>
          ) : (
            <>
              <Button
                label={hasRated ? 'Edit Rating' : 'Add Rating'}
                icon={hasRated ? 'star' : 'star-outline'}
                onClick={handleAddRating}
                hasRated={hasRated}
              />
              <Button
                label={<Link to={`/results/${album.id}`}>Go to Album</Link>}
              />
            </>
          )}
        </div>
      </div>
    </figure>
  );
}
