import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../components/common/Logo';
import Button from '../components/common/Button';
import SearchBar from '../components/common/SearchBar';
import {
  IoStarOutline,
  IoSparklesOutline,
  IoPersonOutline,
} from 'react-icons/io5';
import bgImg from '../assets/record-blue.jpg';

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
    <div className='min-h-screen bg-[#0F2E48] relative transition-all'>
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat'
        style={{
          backgroundImage: `url(${bgImg})`,
          opacity: 0.2,
        }}
      />

      <div className='relative z-20 h-dvh flex justify-center items-center'>
        <main className='flex flex-col justify-center items-center max-w-[404px] w-full px-4'>
          <Link to={'/'} aria-label='Go to home page'>
            <Logo size={'lg'} />
          </Link>
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
    </div>
  );
}
