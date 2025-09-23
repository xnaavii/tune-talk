import { createSlice, createSelector, nanoid } from '@reduxjs/toolkit';
import { dummyReviews } from '../data/dummyData';

const initialState = {
  reviews: dummyReviews,
  status: 'idle',
  error: null,
};

const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    addReview(state, action) {
      const { albumId, user = 'defaultUser', comment, rating } = action.payload;
      const exists = state.reviews.some(
        (review) => review.albumId === albumId && review.user === user
      );

      if (!exists) {
        const newReview = {
          id: nanoid(),
          albumId,
          user,
          comment,
          rating,
        };
        state.reviews.push(newReview);
      }
    },
  },
});

export default reviewSlice.reducer;

// Select all reviews from the store
const selectAllReviews = (state) => state.reviews.reviews;

// Get reviews for a specific album by its reviewIds
export const selectReviewsByIds = createSelector(
  [selectAllReviews, (_, reviewIds) => reviewIds || []],
  (reviews, reviewIds) =>
    reviewIds.map((id) => reviews.find((r) => r.id === id))
);

// Calculate the average rating for a specific album
export const selectAverageRatingForAlbum = createSelector(
  [selectReviewsByIds],
  (albumReviews) => {
    if (!albumReviews.length) return 0; // no reviews, rating is 0
    const total = albumReviews.reduce((sum, r) => sum + r.rating, 0);
    return total / albumReviews.length;
  }
);
