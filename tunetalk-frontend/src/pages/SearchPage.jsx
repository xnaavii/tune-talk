import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Spinner from '../components/common/Spinner';
import AlbumCard from '../components/AlbumCard';
import { searchAlbumsThunk } from '../store/albumSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function SearchPage() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  const { albums, error, status } = useSelector((state) => state.albums);

  useEffect(() => {
    if (!query) return;

    const timer = setTimeout(() => {
      dispatch(searchAlbumsThunk(query));
    }, 500);

    return () => clearTimeout(timer);
  }, [dispatch, query]);

  if (!query) {
    return (
      <h2 className='text-md text-stone-200'>Try searching for an album...</h2>
    );
  }

  if (status === 'loading') {
    return <Spinner />;
  }

  if (status === 'failed') {
    return <p className='text-red-400'>{error}</p>;
  }

  if (albums.length === 0) {
    return (
      <h2 className='text-md text-stone-200'>No albums found for "{query}"</h2>
    );
  }

  return (
    <>
      <h2 className='text-md mb-2 text-stone-200'>
        Showing {albums.length} results for "{query}"
      </h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 py-2'>
        {albums.map((album) => (
          <AlbumCard album={album} key={album.id} />
        ))}
      </div>
    </>
  );
}
