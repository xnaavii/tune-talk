import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Spinner from '../components/common/Spinner';
import AlbumCard from '../components/AlbumCard';
import { searchAlbums } from '../api/albums';

export default function SearchPage() {
  const [loading, setLoading] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  useEffect(() => {
    if (!query || query.trim() === '') {
      setAlbums([]);
      setLoading(false);
      return;
    }
    setLoading(true);

    const timer = setTimeout(async () => {
      setError(null);
      try {
        const q = query.toLowerCase().trim();
        const response = await searchAlbums(q);
        setAlbums(response);
      } catch (error) {
        setError(error.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p className='text-red-400'>{error}</p>;
  }

  if (query === '') {
    return (
      <h2 className='text-md text-stone-200'>Try searching for an album...</h2>
    );
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
      <div className='grid grid-rows-1 grid-cols-1 sm:grid-rows-2 sm:grid-cols-2 md:grid-cols-3 gap-[6px] overflow-x-auto py-2'>
        {albums.map((album) => (
          <AlbumCard album={album} key={album.id} />
        ))}
      </div>
    </>
  );
}
