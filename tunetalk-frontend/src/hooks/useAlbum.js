import { useContext } from 'react';
import { AlbumContext } from '../store/AlbumContext';

export default function useAlbum() {
  const context = useContext(AlbumContext);

  if (!context) {
    throw new Error('useAlbum must be used within an AlbumProvider');
  }

  return context;
}
