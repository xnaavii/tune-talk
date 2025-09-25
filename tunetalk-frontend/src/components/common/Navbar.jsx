import {
  useLocation,
  useNavigate,
  useSearchParams,
  Link,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import Logo from '../common/Logo';
import Button from '../common/Button';
import SearchBar from '../common/SearchBar';
import {
  IoStarOutline,
  IoSparklesOutline,
  IoPersonOutline,
} from 'react-icons/io5';

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
      className='h-fit flex flex-col sm:flex-row sm:px-[20px] py-[4px] sm:gap-[18px] 
             items-center justify-center rounded-[6px] backdrop-blur-[32.6px] bg-[#C2E1FA]/20'
    >
      <Link to={'/'} aria-label='Go to home page'>
        <Logo size={'md'} />
      </Link>
      <div className='flex flex-col sm:flex-row grow-1 gap-[12px] md:[gap-0] items-center w-[90%]'>
        <SearchBar
          onSubmit={handleOnSubmit}
          onChange={handleOnChange}
          query={query}
        />
        <menu className='shrink-0 flex gap-[12px] py-[6px] sm:py-0 flex-wrap'>
          <Link to={'/popular'}>
            <Button label='Popular' icon={IoStarOutline} />
          </Link>
          <Link to={'/new'}>
            <Button label='New' icon={IoSparklesOutline} />
          </Link>
          <Link to={'/reviews'}>
            <Button label='Your Reviews' icon={IoPersonOutline} />
          </Link>
        </menu>
      </div>
    </nav>
  );
}
