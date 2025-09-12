import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAlbum from '../hooks/useAlbum';
import useReviews from '../hooks/useReviews';
import { dummyAlbums } from '../data/dummyAlbums';
import Button from '../components/Button';
import Reviews from '../components/Reviews';
import AlbumDetails from '../components/AlbumDetails';

export default function AlbumPage() {
  const { album_id } = useParams();
  const { setSelectedAlbum } = useAlbum();
  const { reviews } = useReviews();

  const navigate = useNavigate();

  const album = dummyAlbums.find((album) => album.id === +album_id);

  const albumReviews = reviews.filter((r) => r.albumId === album?.id);

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
      <AlbumDetails album={album} />
      <Reviews albumId={album.id} reviews={albumReviews} />
    </>
  );
}
