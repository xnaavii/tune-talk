import { Outlet } from 'react-router-dom';
import useAlbum from '../hooks/useAlbum';
import Navbar from '../components/common/Navbar';
import defaultBackground from '../assets/record-blue.jpg';

export default function MainLayout() {
  const { selectedAlbum } = useAlbum();

  let bgImg = defaultBackground;

  if (selectedAlbum?.image) {
    bgImg = selectedAlbum.image;
  }

  return (
    <div className='min-h-screen bg-[#0F2E48] text-white relative transition-all'>
      <div
        className='absolute inset-0 bg-cover bg-center filter opacity-40'
        style={{ backgroundImage: `url(${bgImg})` }}
      />

      <div className='h-dvh max-w-full mx-auto p-3 grid grid-rows-[auto_1fr] gap-3 overflow-hidden relative z-10'>
        <Navbar />
        <main className='flex-1 w-full md:flex-row p-3 gap-4 text-stone-100 border-stone-50 rounded-lg shadow-sm backdrop-blur-2xl bg-[#C2E1FA]/20 overflow-auto'>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
