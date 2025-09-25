import StarRating from '../components/StarRating';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectAlbumById } from '../store/albumSlice';

export default function AlbumDetails({ albumId }) {
  const album = useSelector((state) => selectAlbumById(state, albumId));

  return (
    <figure className='grid px-[14px] py-[6px] grid-cols-1 sm:grid-cols-[2fr_2fr] md:grid-cols-[1fr_3fr] gap-[10px] w-full shrink-0'>
      <img
        src={album.image}
        alt={`Cover of ${album.title}`}
        className='object-cover rounded-md shadow-lg w-full'
      />

      <figcaption className='flex flex-col justify-center p-[6px] gap-[12px]'>
        <div>
          <h2 className='text-[24px] font-bold text-[#FFFFFF]'>
            {album.title}
          </h2>
          <h3 className='text-[20px] font-medium text-stone-200 mb-2'>
            {album.artist}
          </h3>
          <p className='text-[16px] text-stone-400'>{album.year}</p>
        </div>

        <StarRating rating={album.rating} albumId={album.id} />
      </figcaption>
    </figure>
  );
}

AlbumDetails.propTypes = {
  albumId: PropTypes.number.isRequired,
};
