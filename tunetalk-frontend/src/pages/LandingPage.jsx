import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../components/common/Logo';
import ButtonsMenu from '../components/common/ButtonsMenu';
import Button from '../components/common/Button';
import BackgroundLayer from '../components/common/BackgroundLayer';
import SearchBar from '../components/common/SearchBar';

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
    <div className='h-dvh relative'>
      <BackgroundLayer />

      <div className='relative z-20 flex items-center justify-center h-full'>
        <div className='flex flex-col items-center gap-3'>
          <Logo />
          <div className='flex flex-col gap-3'>
            <SearchBar onChange={handleOnChange} onSubmit={handleOnSubmit} />
            <ButtonsMenu>
              <Link to={'/popular'}>
                <Button label='Popular' icon='star-outline' />
              </Link>
              <Button label='New' icon='sparkles-outline' />
              <Button label='Your Reviews' icon='person-outline' />
            </ButtonsMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
