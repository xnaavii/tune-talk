import Logo from '../../components/Logo';
import ButtonsMenu from '../../components/ButtonsMenu';
import Button from '../../components/Button';
import BackgroundLayer from '../../components/BackgroundLayer';
import SearchBar from '../../components/SearchBar';

export default function LandingPage() {
  return (
    <div className='h-dvh relative'>
      <BackgroundLayer />

      <div className='relative z-20 flex items-center justify-center h-full'>
        <div className='flex flex-col items-center gap-3'>
          <Logo />
          <div className='flex flex-col gap-3'>
            <SearchBar placeholder='Search for an artist, album or a song' />
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
