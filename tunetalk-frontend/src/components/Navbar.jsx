import Logo from './Logo';
import ButtonsMenu from './ButtonsMenu';
import Button from './Button';
import SearchBar from './SearchBar';

export default function Navbar() {
  return (
    <nav
      className={
        'flex flex-col lg:flex-row py-2 px-4 gap-4 items-center justify-center text-stone-100 border-stone-50 rounded-lg shadow-sm backdrop-blur-2xl bg-[#C2E1FA]/20'
      }
    >
      <Logo />
      <div className='flex flex-col gap-3 lg:flex-row flex-1 lg:items-center'>
        <SearchBar/>
        <ButtonsMenu>
          <Button label='Popular' icon='star-outline' />
          <Button label='New' icon='sparkles-outline' />
          <Button label='Reviews' icon='person-outline' />
        </ButtonsMenu>
      </div>
    </nav>
  );
}
