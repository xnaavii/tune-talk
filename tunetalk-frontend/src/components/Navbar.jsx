import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Logo from './Logo';
import ButtonsMenu from './ButtonsMenu';
import Button from './Button';
import SearchBar from './SearchBar';

export default function Navbar() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const isLandingPage = location.pathname === '/';

  useEffect(() => {
    const queryParam = searchParams.get('q');
    if (location.pathname === '/search' && queryParam) {
      setQuery(queryParam);
    }
  }, [location, searchParams]);

  function handleOnSubmit(event) {
    event.preventDefault();

    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query)}`);
  }

  function handleOnChange(event) {
    setQuery(event.target.value);

    // Handle instant search without submit only when not on landing page
    if (!isLandingPage) {
      navigate(`/search?q=${encodeURIComponent(event.target.value)}`);
    }
  }

  return (
    <nav
      className={
        'flex flex-col lg:flex-row py-2 px-4 gap-4 items-center justify-center text-stone-100 border-stone-50 rounded-lg shadow-sm backdrop-blur-2xl bg-[#C2E1FA]/20'
      }
    >
      <Logo />
      <div className='flex flex-col gap-3 lg:flex-row flex-1 lg:items-center'>
        <SearchBar
          onSubmit={handleOnSubmit}
          onChange={handleOnChange}
          query={query}
        />
        <ButtonsMenu>
          <Button label='Popular' icon='star-outline' />
          <Button label='New' icon='sparkles-outline' />
          <Button label='Reviews' icon='person-outline' />
        </ButtonsMenu>
      </div>
    </nav>
  );
}
