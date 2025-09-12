import { useNavigate } from 'react-router-dom';

export default function Logo() {
  const navigate = useNavigate();

  function handleOnClick() {
    navigate('/');
  }

  return (
    <h1 className={'tracking-tighter text-7xl font-extrabold text-stone-50'}>
      <button onClick={handleOnClick} className=' hover:cursor-pointer'>
        Tunetalk
      </button>
    </h1>
  );
}
