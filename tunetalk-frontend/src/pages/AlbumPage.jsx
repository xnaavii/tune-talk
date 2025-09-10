import { useParams, useNavigate } from 'react-router-dom';
import { dummyAlbums } from '../data/dummyAlbums';
import { useContext, useEffect } from 'react';
import Button from '../components/Button';
import { AlbumContext } from '../store/AlbumContext';
import Reviews from '../components/Reviews';
import AlbumDetails from '../components/AlbumDetails';

export default function AlbumPage() {
  const { album_id } = useParams();
  const { setSelectedAlbum, reviews, selectedAlbum } = useContext(AlbumContext);

  const navigate = useNavigate();

  function navigateBack() {
    navigate(-1);
  }

  const album = dummyAlbums.find((album) => album.id === +album_id);

  useEffect(() => {
    setSelectedAlbum(album);
    return () => setSelectedAlbum(null);
  }, [album, setSelectedAlbum]);

  const albumReviews = reviews[selectedAlbum?.id] || [];

  if (!album)
    return <p className='text-center text-stone-300 mt-8'>Album not found</p>;

  return (
    <div className=''>
      {/* Back Button */}
      <div className='flex items-center justify-start shrink-0'>
        <Button icon='chevron-back' onClick={() => navigateBack()} />
      </div>

      {/* Album Details */}
      <AlbumDetails album={album} />

      {/* Review Section */}
      <section className='grid grid-cols-1'>
        <h2 className='text-2xl mb-1 shrink-0'>Reviews</h2>

        <Reviews albumId={album.id} reviews={albumReviews} />
      </section>
    </div>
  );
}
