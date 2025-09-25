import AlbumCard from './AlbumCard';
import PropTypes from 'prop-types';

export default function AlbumList({ albums }) {
  return (
    <section className='flex-1 overflow-auto'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-[10px]'>
        {albums.map((album) => (
          <AlbumCard key={album.id} albumId={album.id} />
        ))}
      </div>
    </section>
  );
}

AlbumList.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object).isRequired,
};
