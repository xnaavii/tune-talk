import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import AlbumList from '../components/AlbumList';
import Spinner from '../components/Spinner';
import { searchAlbums } from '../api/albums';

export default function SearchPage() {
  const [loading, setLoading] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  useEffect(() => {
    async function fetchAlbums() {
      setLoading(true);
      setError(null);
      try {
        const q = query.toLowerCase().trim();
        const response = await searchAlbums(q);
        setAlbums(response);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAlbums();
  }, [query]);

  return (
    <>
      {loading ? <Spinner /> : null}
      {error ? <p>{error.message}</p> : null}
      {!query && (
        <h2 className='text-md p-4'>
          Try searching for an album, artist or a song.
        </h2>
      )}
      {query && albums.length > 0 && <AlbumList albums={albums} />}
      {query && albums.length === 0 && (
        <p className='text-md p-4'>No albums found.</p>
      )}
    </>
  );
}
