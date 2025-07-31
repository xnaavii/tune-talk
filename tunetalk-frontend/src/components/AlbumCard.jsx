import Button from './Button';

export default function AlbumCard({ title, artist, year, image }) {
  return (
    <figure className='p-4 flex gap-4 bg-[#0F2E48]/40 rounded-xl hover:bg-[#0F2E48]/60'>
      <img
        src={image}
        alt={`Album cover for ${artist} - ${title}`}
        className='rounded-md object-cover w-30 h-30'
      />

      <div className='flex flex-col justify-between flex-1'>
        <div>
          <p className='font-semibold'>{title}</p>
          <p className='text-sm'>{artist}</p>
          <p className='text-xs text-stone-400'>{year}</p>

          <div className='flex gap-2 mt-4 self-end'>
            <Button label='Add Rating' icon={'star-outline'} />
            <Button label='See more' />
          </div>
        </div>
      </div>
    </figure>
  );
}
