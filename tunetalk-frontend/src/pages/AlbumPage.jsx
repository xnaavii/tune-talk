import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAlbum from '../hooks/useAlbum';
import { dummyAlbums } from '../data/dummyAlbums';
import Button from '../components/common/Button';
import Reviews from '../components/Reviews';
import AlbumDetails from '../components/AlbumDetails';

export default function AlbumPage() {
  const { album_id } = useParams();
  const { setSelectedAlbum } = useAlbum();

  const navigate = useNavigate();

  const album = dummyAlbums.find((album) => album.id === +album_id);

  useEffect(() => {
    setSelectedAlbum(album);
    return () => setSelectedAlbum(null);
  }, [album, setSelectedAlbum]);

  if (!album)
    return <p className='text-center text-stone-300 mt-8'>Album not found</p>;

  return (
    <>
      <div className='flex items-center justify-start shrink-0'>
        <Button icon='chevron-back' onClick={() => navigate(-1)} />
      </div>
      <AlbumDetails albumId={album.id} />
      <Reviews albumId={album.id} reviews={album.reviews} />
    </>
  );
}
