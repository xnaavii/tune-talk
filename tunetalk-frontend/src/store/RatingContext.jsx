import { useState, createContext } from 'react';

const RatingContext = createContext({
  ratings: {},
  setRatings: () => {},
  addRating: () => {},
});

function RatingProvider({ children }) {
  const [ratings, setRatings] = useState({});

  function addRating(albumId, rating) {
    setRatings((currentRatings) => ({
      ...currentRatings,
      [albumId]: rating,
    }));
  }

  console.log(ratings);

  const values = {
    ratings,
    setRatings,
    addRating,
  };

  return (
    <RatingContext.Provider value={values}>{children}</RatingContext.Provider>
  );
}

export { RatingContext, RatingProvider };
