import { useParams, useNavigate } from 'react-router-dom';
import { dummyAlbums } from '../../data/dummyAlbums';
import Button from '../../components/Button';

export default function AlbumPage() {
  const { album_id } = useParams();
  const navigate = useNavigate();
  const album = dummyAlbums.find((album) => album.id === +album_id);

  if (!album)
    return <p className='text-center text-stone-300 mt-8'>Album not found</p>;

  return (
    <div className='p-3'>
      <Button icon='chevron-back' onClick={() => navigate(-1)} />
      <div className='flex gap-6 mb-6 mt-2'>
        <figure className='flex flex-col md:flex-row gap-6 p-4 '>
          <img
            src={album.image}
            alt={`Cover of ${album.title}`}
            className='object-cover rounded-md shadow-sm w-full flex-1/3'
          />

          <figcaption className='flex flex-col justify-center text-stone-200 flex-1/2'>
            <h2 className='text-2xl font-bold mb-1'>{album.title}</h2>
            <h3 className='text-lg font-medium text-stone-300 mb-2'>
              {album.artist}
            </h3>
            <p className='text-sm text-stone-400'>{album.year}</p>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
