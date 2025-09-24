import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchAlbumsThunk,
  selectAlbumById,
  setSelectedAlbum,
} from '../store/albumSlice';
import Button from '../components/common/Button';
import Reviews from '../components/Reviews';
import AlbumDetails from '../components/AlbumDetails';

export default function AlbumPage() {
  const dispatch = useDispatch();
  const { album_id } = useParams();
  const navigate = useNavigate();

  const status = useSelector((state) => state.albums.status);
  const album = useSelector((state) => selectAlbumById(state, +album_id));

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAlbumsThunk());
    }
  }, [status, dispatch]);

  useEffect(() => {
    dispatch(setSelectedAlbum(album || null));
    return () => dispatch(setSelectedAlbum(null));
  }, [dispatch, album]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error loading albums.</p>;
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
