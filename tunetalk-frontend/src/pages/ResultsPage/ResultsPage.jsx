import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AlbumList from '../../components/AlbumList';

const dummyData = [
  {
    title: 'Greedy',
    artist: 'Tate Mcrae',
    year: '2023',
    image:
      'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/23/07/92/23079247-25be-3098-ef53-78e7d0fe7406/196871341653.jpg/1200x1200bf-60.jpg',
  },
  {
    title: 'Think Later',
    artist: 'Tate Mcrae',
    year: '2023',
    image:
      'https://upload.wikimedia.org/wikipedia/en/1/16/Tate_McRae_-_Think_Later.png',
  },
];

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

      const filtered = dummyData.filter(
        (album) =>
          album.artist.toLowerCase().includes(lowerQuery) ||
          album.title.toLowerCase().includes(lowerQuery)
      );

      setResults(filtered);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    
      <AlbumList query={query} results={results} isLoading={loading} />
  );
}
