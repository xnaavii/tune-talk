import { useState, createContext } from 'react';

const ReviewContext = createContext({
  reviews: [],
  setReviews: () => {},
  addReview: () => {},
});

function ReviewProvider({ children }) {
  const [reviews, setReviews] = useState([]);

  console.log(reviews)

  function addReview(albumId, review) {
    const newReview = { id: crypto.randomUUID(), albumId, review };
    setReviews((currentReviews) => [...currentReviews, newReview]);
  }

  const value = {
    reviews,
    setReviews,
    addReview,
  };

  return (
    <ReviewContext.Provider value={value}>{children}</ReviewContext.Provider>
  );
}

export { ReviewProvider, ReviewContext };
