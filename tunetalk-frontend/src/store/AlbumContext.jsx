import { createContext, useState } from 'react';

export const AlbumContext = createContext({
  selectedAlbum: null,
  setSelectedAlbum: () => {},
  ratings: {},
  rateAlbum: () => {},
});

export function AlbumProvider({ children }) {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [ratings, setRatings] = useState({});

  function rateAlbum(albumId, rating) {
    setRatings((prev) => ({
      ...prev,
      [albumId]: rating, // Store rating for that albumId
    }));
  }

  return (
    <AlbumContext.Provider
      value={{
        selectedAlbum,
        setSelectedAlbum,
        ratings,
        rateAlbum,
      }}
    >
      {children}
    </AlbumContext.Provider>
  );
}