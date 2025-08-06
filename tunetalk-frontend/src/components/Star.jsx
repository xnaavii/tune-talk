export default function Star({ empty = true }) {
  return (
    <ion-icon name={empty ? 'star-outline' : 'star'} className='text-3xl' />
  );
}
