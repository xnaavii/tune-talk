import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AlbumList from '../components/AlbumList';
import Spinner from '../components/Spinner';
import { dummyAlbums } from '../data/dummyAlbums';

export default function SearchPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  useEffect(() => {
    if (!query || !query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setResults([]);

    const timeout = setTimeout(() => {
      const lowerQuery = query.toLowerCase();

      const filtered = dummyAlbums.filter(
        (album) =>
          album.artist.toLowerCase().includes(lowerQuery) ||
          album.title.toLowerCase().includes(lowerQuery)
      );

      setResults(filtered);
      setLoading(false);
    }, 200);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <>
      {loading && <Spinner />}
      <AlbumList query={query} albums={results} isLoading={loading} />
    </>
  );
}
