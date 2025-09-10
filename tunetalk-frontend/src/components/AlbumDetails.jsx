import StarRating from '../components/StarRating';
import useAlbum from '../hooks/useAlbum';

export default function AlbumDetails({ album }) {
  const { ratings } = useAlbum();
  const albumRating = ratings[album.id] || 0;

  return (
    <figure className='grid grid-cols-1 sm:grid-cols-[2fr_2fr] md:grid-cols-[1fr_3fr] gap-4 p-4 w-full shrink-0'>
      <img
        src={album.image}
        alt={`Cover of ${album.title}`}
        className='object-cover rounded-md shadow-lg w-full'
      />

      <figcaption className='flex flex-col justify-center text-stone-200'>
        <h2 className='text-2xl font-bold mb-1'>{album.title}</h2>
        <h3 className='text-lg font-medium text-stone-300 mb-2'>
          {album.artist}
        </h3>
        <p className='text-sm text-stone-400'>{album.year}</p>

        <div className='mt-2'>
          <StarRating rating={albumRating} albumId={album.id} />
        </div>
      </figcaption>
    </figure>
  );
}
