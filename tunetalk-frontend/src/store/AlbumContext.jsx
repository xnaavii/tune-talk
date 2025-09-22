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

  function getAlbum(id) {
    const album = albums.find((album) => album.id === id);
    return album;
  }

  function changeRating(id, rating) {
    setAlbums((currAlbums) =>
      currAlbums.map((album) =>
        album.id === id ? { ...album, rating: rating } : album
      )
    );
  }

  return (
    <AlbumContext.Provider
      value={{
        selectedAlbum,
        setSelectedAlbum,
        albums,
        setAlbums,
        getAlbum,
        changeRating,
      }}
    >
      {children}
    </AlbumContext.Provider>
  );
}

export { AlbumContext, AlbumProvider };
