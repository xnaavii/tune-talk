import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function AlbumCard({ album }) {
  if (!album) return <p>There is no such album</p>;

  return (
    <Link to={`/search/${album.id}`}>
      <figure className='relative rounded-[16px] overflow-hidden transition-all duration-300 ease-in-out grid grid-cols-[auto] grid-rows-[auto] gap-2 hover:outline-lime-100'>
        {/* Background image */}
        <div
          className='absolute inset-0 z-0 bg-cover bg-center blur-[32px] scale-110'
          style={{ backgroundImage: `url(${album.image})` }}
        />

        {/* Overlay for all content */}
        <div className='relative z-10 bg-[#0F2E48]/20 flex flex-row'>
          {/* Album image */}
          <div className='flex items-center justify-center p-[10px] max-w-[80px]'>
            <img
              src={album.image}
              alt={`Album cover`}
              className='rounded-md object-cover transition-all duration-300 ease-in-out'
            />
          </div>

          {/* Info & Star rating */}
          <div className='flex-1 flex flex-col justify-center p-[10px] gap-[8px]'>
            <figcaption className='flex flex-col gap-[2px]'>
              <p className='text-[14px] sm:text-[16px] font-semibold hover:underline'>
                {album.title}
              </p>
              <p className='text-[14px] sm:text-[16px]'>{album.artist}</p>
              <p className='text-[10px] sm:text-[12px] text-stone-400'>
                {album.year}
              </p>
            </figcaption>
          </div>
        </div>
      </figure>
    </Link>
  );
}

AlbumCard.propTypes = {
  albumId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
