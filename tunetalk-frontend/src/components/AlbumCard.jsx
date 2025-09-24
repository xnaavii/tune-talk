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
    <figure className='relative flex gap-2 rounded-2xl overflow-hidden h-fit'>
      <div
        className='absolute inset-0 z-0 bg-cover bg-center blur-lg scale-110 transition-all duration-300'
        style={{ backgroundImage: `url(${album.image})` }}
      />

      <div className='relative z-10 flex gap-3 w-full bg-[#0F2E48]/40 rounded-2xl p-3 items-center h-full'>
        <div className='w-40 h-full overflow-hidden flex items-center justify-center'>
          <Link to={`/search/${album.id}`}>
            <img
              src={album.image}
              alt={`Album cover for ${album.artist} - ${album.title}`}
              className='rounded-md object-cover h-full transition-all duration-300 ease-in-out'
            />
          </Link>
        </div>

        <div className='flex flex-col justify-between flex-1 h-full gap-2'>
          <figcaption className='flex flex-col gap-1'>
            <p className='text-lg font-semibold'>{album.title}</p>
            <p className='text-md'>{album.artist}</p>
            <p className='text-sm text-stone-400'>{album.year}</p>
            <span className='text-sm text-stone-300'>
              {reviews?.filter((review) => review.comment !== '').length || 0}{' '}
              {reviews?.length > 1 ? 'reviews' : 'review'}
            </span>
          </figcaption>

          <StarRating albumId={album.id} />
        </div>
      </div>
    </figure>
  );
}

AlbumCard.propTypes = {
  albumId: PropTypes.number.isRequired,
};
