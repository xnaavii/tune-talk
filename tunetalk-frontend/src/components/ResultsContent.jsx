import Logo from './Logo';
import Input from './Input';
import ButtonsMenu from './ButtonsMenu';
import Button from './Button';

export default function Results() {
  return (
    <div className='flex flex-col lg:flex-row py-2 px-4 lg:px-3 gap-1 lg:gap-4 items-center lg:justify-center text-stone-100 border-stone-50 rounded-lg shadow-sm backdrop-blur-md bg-[#C2E1FA]/20 mt-6 lg:max-w-[1100px] mx-auto'>
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
