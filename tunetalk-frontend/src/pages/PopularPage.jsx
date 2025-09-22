import { useEffect } from 'react';
import { getAlbums } from '../api/albums';
import useAlbum from '../hooks/useAlbum';
import AlbumList from '../components/AlbumList';

export default function PopularPage() {
  const { albums, setAlbums } = useAlbum();

  const sortedAlbums = [...albums].sort((a, b) => b.rating - a.rating);

  useEffect(() => {
    getAlbums()
      .then((albums) => setAlbums(albums))
      .catch((error) => console.log(error));
  }, [setAlbums]);

  return (
    <>
      <h2 className='text-3xl p-4'>Popular Music</h2>
      {sortedAlbums?.length > 0 ? <AlbumList albums={sortedAlbums} /> : null}
    </>
  );
}
