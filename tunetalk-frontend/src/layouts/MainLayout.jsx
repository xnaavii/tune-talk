import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function MainLayout() {
  return (
    <div className='min-h-screen bg-[#0F2E48] text-white'>
      <div className='h-dvh max-w-[1100px] mx-auto p-4 flex flex-col gap-3 overflow-hidden'>
        <Navbar />
        <main className='flex-1 w-full flex flex-col md:flex-row p-4 gap-4 text-stone-100 border-stone-50 rounded-lg shadow-sm backdrop-blur-md bg-[#C2E1FA]/20 overflow-scroll'>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
