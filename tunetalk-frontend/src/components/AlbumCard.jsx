export default function AlbumCard({ title, artist, year, image }) {
  return (
    <figure className='p-4 flex gap-4 bg-[#0F2E48]/40 rounded-xl hover:cursor-pointer hover:bg-[#0F2E48]/60'>
      <img
        src={image}
        alt={`Album cover for ${artist} - ${title}`}
        className='rounded-md object-cover w-30 h-30'
      />
      <div className='flex flex-col justify-center'>
        <p className='font-semibold'>{title}</p>
        <p className='text-sm'>{artist}</p>
        <p className='text-xs text-stone-400'>{year}</p>
      </div>
    </figure>
  );
}
