import { useParams, useNavigate } from 'react-router-dom';
import { dummyAlbums } from '../../data/dummyAlbums';
import { useContext, useEffect } from 'react';
import Button from '../../components/Button';
import StarRating from '../../components/StarRating';
import { AlbumContext } from '../../store/AlbumContext';

export default function AlbumPage() {
  const { album_id } = useParams();
  const { ratings, setSelectedAlbum } = useContext(AlbumContext);

  const navigate = useNavigate();

  function navigateBack() {
    navigate(-1);
  }

  const album = dummyAlbums.find((album) => album.id === +album_id);
  const albumRating = ratings[album.id] || 0;

  useEffect(() => {
    setSelectedAlbum(album);
    return () => setSelectedAlbum(null);
  }, [album, setSelectedAlbum]);

  if (!album)
    return <p className='text-center text-stone-300 mt-8'>Album not found</p>;

  return (
    <div className='p-3 w-full grid grid-rows-[auto_1fr_1fr]'>
      <div>
        <Button icon='chevron-back' onClick={() => navigateBack()} />
      </div>
      {/* Album Details */}
      <figure className='grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 p-4 w-full'>
        <img
          src={album.image}
          alt={`Cover of ${album.title}`}
          className='object-cover rounded-md shadow -lg w-full'
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

      {/* Review Section */}
      <section>
      <p>Review User</p>
      </section>
    </div>
  );
}
