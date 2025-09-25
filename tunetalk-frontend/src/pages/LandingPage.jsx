import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../components/common/Logo';
import Button from '../components/common/Button';
import BackgroundLayer from '../components/common/BackgroundLayer';
import SearchBar from '../components/common/SearchBar';
import {
  IoStarOutline,
  IoSparklesOutline,
  IoPersonOutline,
} from 'react-icons/io5';

export default function LandingPage() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  function handleOnSubmit(event) {
    event.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query)}`);
  }

  function handleOnChange(event) {
    setQuery(event.target.value);
  }
  return (
    <div className='h-dvh flex justify-center items-center '>
      <BackgroundLayer />

      <main className='z-20 flex flex-col justify-center items-center max-w-[404px] w-full px-4'>
        <Logo size={96} />
        <div className='w-full flex flex-col items-center gap-[18px]'>
          <SearchBar onChange={handleOnChange} onSubmit={handleOnSubmit} />
          <nav className='flex flex-row gap-[12px]'>
            <Link to='/popular'>
              <Button label='Popular' icon={IoStarOutline} />
            </Link>
            <Link to='/new'>
              <Button label='New' icon={IoSparklesOutline} />
            </Link>
            <Link to='/reviews'>
              <Button label='Your Reviews' icon={IoPersonOutline} />
            </Link>
          </nav>
        </div>
      </main>
    </div>
  );
}
