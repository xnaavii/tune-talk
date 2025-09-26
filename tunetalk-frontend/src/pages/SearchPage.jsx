import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import AlbumList from '../components/AlbumList';
import Spinner from '../components/common/Spinner';
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
      <AlbumList albums={albums} />
    </>
  );
}
