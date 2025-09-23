import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectAlbumById, setSelectedAlbum } from '../store/albumSlice';
import Button from '../components/common/Button';
import Reviews from '../components/Reviews';
import AlbumDetails from '../components/AlbumDetails';

export default function AlbumPage() {
  const dispatch = useDispatch();
  const { album_id } = useParams();
  const navigate = useNavigate();

  const album = useSelector((state) => selectAlbumById(state, +album_id));

  useEffect(() => {
    dispatch(setSelectedAlbum(album || null));
    return () => dispatch(setSelectedAlbum(null));
  }, [dispatch, album]);

  if (!album)
    return <p className='text-center text-stone-300 mt-8'>Album not found</p>;

  return (
    <>
      <div className='flex items-center justify-start shrink-0'>
        <Button icon='chevron-back' onClick={() => navigate(-1)} />
      </div>
      <AlbumDetails albumId={album.id} />
      <Reviews albumId={album.id} />
    </>
  );
}
