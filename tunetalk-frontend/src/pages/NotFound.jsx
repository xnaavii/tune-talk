import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center h-full p-4 text-center'>
      <h3 className='text-3xl font-bold text-stone-100 mb-2'>
        404 - Page Not Found
      </h3>
      <p className='text-stone-300 mb-4'>
        The page you are looking for does not exist.
      </p>
      <Link to='/' className='text-blue-400 hover:underline font-medium'>
        Go back to Home
      </Link>
    </div>
  );
}
