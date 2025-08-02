import { useParams } from 'react-router-dom';

export default function AlbumPage() {
  const { album_id } = useParams();

  return <h1>Album Id: {album_id}</h1>;
}
