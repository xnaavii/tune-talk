import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectAlbumById } from '../store/albumSlice';
import { selectReviewsForAlbum } from '../store/reviewSlice';

export default function AlbumCard({ albumId }) {
  // Get album and reviews from the store
  const album = useSelector((state) => selectAlbumById(state, albumId));
  const reviews = useSelector((state) => selectReviewsForAlbum(state, albumId));

  if (!album) {
    return <p>Loading album...</p>; // show temporary loading while fetching
  }

  return (
    <figure className='relative rounded-[16px] overflow-hidden h-fit grid grid-cols-[auto_1fr]'>
      <div
        className='absolute inset-0 z-0 bg-cover bg-center blur-[32.6px] scale-110 transition-all duration-300'
        style={{ backgroundImage: `url(${album.image})` }}
      />

      <div className='max-w-[140px] relative z-10 bg-[#0F2E48]/40 flex items-center justify-center p-[10px]'>
        <img
          src={album.image}
          alt={`Album cover for ${album.artist} - ${album.title}`}
          className='rounded-md object-cover transition-all duration-300 ease-in-out'
        />
      </div>

      <div className='relative z-10 bg-[#0F2E48]/40 flex flex-col justify-center p-[10px]'>
        <Link to={`/search/${album.id}`}>
          <figcaption className='flex flex-col gap-[2px]'>
            <div className='hover:underline'>
              <p className='text-[14px] sm:text-[16px] font-semibold'>
                {album.title}
              </p>
              <p className='text-[14px] sm:text-[16px]'>{album.artist}</p>
              <p className='text-[10px] sm:text-[12px] text-stone-'>{album.year}</p>
            </div>

            <span className='text-[10px] text-stone-400'>
              {reviews?.length || 0}{' '}
              {reviews?.length > 1 ? 'reviews' : 'review'}
            </span>
          </figcaption>
        </Link>
          <StarRating albumId={album.id} />
      </div>
    </figure>
  );
}

AlbumCard.propTypes = {
  albumId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
