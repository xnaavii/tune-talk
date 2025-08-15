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
    <div className='w-full h-full p-2 flex flex-col gap-2'>
      {/* Back Button */}
      <div className='flex items-center justify-start shrink-0'>
        <Button icon='chevron-back' onClick={() => navigateBack()} />
      </div>

      {/* Album Details */}
      <figure className='grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 p-4 w-full shrink-0'>
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

      {/* Review Section */}
      <section className='flex-1 flex flex-col min-h-0'>
        <h2 className='text-2xl mb-1 shrink-0'>Reviews</h2>

        <div className='flex-1 overflow-y-auto backdrop-blur-sm bg-[#C2E1FA]/20 p-2 rounded-xl flex flex-col gap-2'>
          <div className='flex items-center justify-between bg-[#C2E1FA]/10 rounded-lg gap-1 h-20 p-2 shrink-0'>
            <textarea
              name='review'
              id='review'
              placeholder='Write a review'
              maxLength={150}
              className='w-full h-full resize-none text-stone-50 p-2 outline-none focus:ring-1 focus:ring-stone-200 focus:ring-inset focus:bg-[#C2E1FA]/30 border border-stone-300 rounded-md text-sm bg-[#C2E1FA]/20'
            ></textarea>
            <Button icon='add' />
          </div>

          <p className='text-sm text-stone-200 self-center'>
            No reviews yet for this album
          </p>
        </div>
      </section>
    </div>
  );
}
