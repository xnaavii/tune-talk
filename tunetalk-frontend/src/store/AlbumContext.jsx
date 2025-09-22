import { createContext, useState } from 'react';
import { dummyAlbums } from '../data/dummyAlbums';

const AlbumContext = createContext({
  selectedAlbum: null,
  setSelectedAlbum: () => {},
  albums: [],
  setAlbums: () => [],
});

function AlbumProvider({ children }) {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [albums, setAlbums] = useState(dummyAlbums);

  function getRating(id) {
    const album = albums.find((album) => album.id === id);
    return album.rating;
  }

  return (
    <AlbumContext.Provider
      value={{
        selectedAlbum,
        setSelectedAlbum,
        albums,
        setAlbums,
        getRating,
      }}
    >
      {children}
    </AlbumContext.Provider>
  );
}

export { AlbumContext, AlbumProvider };
