import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AlbumList from '../../components/AlbumList';
import { dummyAlbums } from '../../data/dummyAlbums';


export default function ResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

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
    }, 1000);

    return () => clearTimeout(timeout);
  }, [query]);

  return <AlbumList query={query} results={results} isLoading={loading} />;
}
