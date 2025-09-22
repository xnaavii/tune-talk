import { createContext, useState } from 'react';

const AlbumContext = createContext({
  selectedAlbum: null,
  setSelectedAlbum: () => {},
  albums: [],
  setAlbums: () => [],
});

function AlbumProvider({ children }) {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [albums, setAlbums] = useState([]);

  return (
    <AlbumContext.Provider
      value={{
        selectedAlbum,
        setSelectedAlbum,
        albums,
        setAlbums,
      }}
    >
      {children}
    </AlbumContext.Provider>
  );
}

export { AlbumContext, AlbumProvider };
