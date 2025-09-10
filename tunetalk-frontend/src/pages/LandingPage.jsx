import Logo from '../components/Logo';
import ButtonsMenu from '../components/ButtonsMenu';
import Button from '../components/Button';
import BackgroundLayer from '../components/BackgroundLayer';
import SearchBar from '../components/SearchBar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  function handleOnSubmit(event) {
    event.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?query=${encodeURIComponent(query)}`);
  }

  function handleOnChange(event) {
    setQuery(event.target.value);
  }
  return (
    <div className='h-dvh relative'>
      <BackgroundLayer />

      <div className='relative z-20 flex items-center justify-center h-full'>
        <div className='flex flex-col items-center gap-3'>
          <Logo />
          <div className='flex flex-col gap-3'>
            <SearchBar onChange={handleOnChange} onSubmit={handleOnSubmit} />
            <ButtonsMenu>
              <Button label='Popular' icon='star-outline' />
              <Button label='New' icon='sparkles-outline' />
              <Button label='Your Reviews' icon='person-outline' />
            </ButtonsMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
