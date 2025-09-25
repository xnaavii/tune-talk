import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../components/common/Navbar';
import defaultBackground from '../assets/record-blue.jpg';

export default function MainLayout() {
  const selectedAlbum = useSelector((state) => state.albums.selectedAlbum);

  const bgImg = selectedAlbum?.image ?? defaultBackground;

  return (
    <div className='min-h-screen bg-[#0F2E48] relative transition-all'>
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat'
        style={{
          backgroundImage: `url(${bgImg})`,
          opacity: selectedAlbum?.image ? 0.4 : 0.2,
        }}
      />

      <div
        className='h-dvh max-w-[942px] mx-auto flex flex-col gap-[18px] overflow-hidden relative z-10 transition-all
          py-[6px] px-[6px] md:py-[26px] md:px-[26px] lg:py-[49px] lg:px-[49px]'
      >
        <Navbar />
        <main className='flex-1 max-w-[942px] md:flex-row px-[32px] py-[24px] gap-4 text-stone-100 border-stone-50 rounded-lg shadow- backdrop-blur-[30px] bg-[#C2E1FA]/16 overflow-auto'>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
