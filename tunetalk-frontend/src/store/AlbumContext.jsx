import { createContext, useState } from 'react';

const AlbumContext = createContext({
  selectedAlbum: null,
  setSelectedAlbum: () => {},
  ratings: {},
  rateAlbum: () => {},
  reviews: {},
  setReviews: () => {},
});

function AlbumProvider({ children }) {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [ratings, setRatings] = useState({});
  const [reviews, setReviews] = useState({});

  function rateAlbum(albumId, rating) {
    setRatings((prev) => ({
      ...prev,
      [albumId]: rating, // Store rating for that albumId
    }));
  }

  function reviewAlbum(albumId, review) {
    setReviews((prev) => ({
      ...prev,
      [albumId]: [...(prev[albumId] || []), review],
    }));
  }

  return (
    <AlbumContext.Provider
      value={{
        selectedAlbum,
        setSelectedAlbum,
        ratings,
        rateAlbum,
        reviews,
        reviewAlbum,
      }}
    >
      {children}
    </AlbumContext.Provider>
  );
}



export { AlbumContext, AlbumProvider };
