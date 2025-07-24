import Logo from './Logo';
import Input from './Input';
import ButtonsMenu from './ButtonsMenu';
import Button from './Button';

export default function LandingContent() {
  return (
    <div className='flex flex-col items-center gap-3 sm:w-sm'>
      <Logo />
      <Input placeholder='Search for an artist, album or a song' />
      <ButtonsMenu>
        <Button label='Popular' icon='star-outline' />
        <Button label='New' icon='sparkles-outline' />
        <Button label='Your Reviews' icon='person-outline' />
      </ButtonsMenu>
    </div>
  );
}
