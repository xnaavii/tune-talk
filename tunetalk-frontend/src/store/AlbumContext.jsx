import { createContext, useState } from 'react';

const AlbumContext = createContext({
  selectedAlbum: null,
  setSelectedAlbum: () => {},
});

function AlbumProvider({ children }) {
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  return (
    <AlbumContext.Provider
      value={{
        selectedAlbum,
        setSelectedAlbum,
      }}
    >
      {children}
    </AlbumContext.Provider>
  );
}

export { AlbumContext, AlbumProvider };
