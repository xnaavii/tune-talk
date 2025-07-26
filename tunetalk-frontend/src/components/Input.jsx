import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Input({ type = 'text', ...props }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  useEffect(() => {
    const queryParam = searchParams.get('query');
    if (location.pathname === '/results' && queryParam) {
      setQuery(queryParam);
    }
  }, [location, searchParams]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!query.trim()) return;
    navigate(`/results?query=${encodeURIComponent(query)}`);
  }

  function handleOnChange(event) {
    setQuery(event.target.value);

    if (!isLandingPage) {
      navigate(`/results?query=${encodeURIComponent(event.target.value)}`);
    }
  }

  return (
    <form className='relative grow-1' onSubmit={handleSubmit}>
      <input
        type={type}
        {...props}
        value={query}
        onChange={handleOnChange}
        className='w-full py-3 pr-10 pl-4 text-stone-100 border-stone-50 rounded-3xl shadow-sm backdrop-blur-md bg-[#C2E1FA]/20 outline-none focus:ring-2 focus:ring-stone-100 focus:ring-inset placeholder:text-stone-300'
        placeholder='Search for an artist, album or a song'
      />
      <ion-icon
        name='search-outline'
        class='absolute right-3 top-1/2 -translate-y-1/2 text-xl text-stone-100 pointer-events-none'
      />
    </form>
  );
}
