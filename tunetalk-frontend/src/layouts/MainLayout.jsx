import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function MainLayout() {
  return (
    <div className='min-h-screen bg-[#0F2E48] text-white'>
      <div className='h-dvh max-w-[1100px] mx-auto p-4 flex flex-col gap-3 overflow-hidden'>
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}
