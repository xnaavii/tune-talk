import StarRating from '../components/StarRating';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectAlbumById } from '../store/albumSlice';
import { selectReviewsForAlbum } from '../store/reviewSlice';

export default function AlbumDetails({ albumId }) {
  const album = useSelector((state) => selectAlbumById(state, albumId));
  const reviews = useSelector((state) => selectReviewsForAlbum(state, albumId));

  return (
    <figure className='grid grid-cols-1 sm:grid-cols-[2fr_2fr] md:grid-cols-[1fr_3fr] gap-4 p-4 w-full shrink-0'>
      <img
        src={album.image}
        alt={`Cover of ${album.title}`}
        className='object-cover rounded-md shadow-lg w-full'
      />

      <figcaption className='flex flex-col justify-center text-stone-200'>
        <h2 className='text-2xl font-bold mb-1'>{album.title}</h2>
        <h3 className='text-lg font-medium text-stone-300 mb-2'>
          {album.artist}
        </h3>
        <p className='text-sm text-stone-400'>{album.year}</p>

        <div className='mt-2'>
          <StarRating rating={album.rating} albumId={album.id} />
          {reviews ? (
            <span className='text-sm text-stone-300'>
              {reviews.filter((review) => review.comment !== '').length} reviews
            </span>
          ) : null}
        </div>
      </figcaption>
    </figure>
  );
}

AlbumDetails.propTypes = {
  albumId: PropTypes.number.isRequired,
};
