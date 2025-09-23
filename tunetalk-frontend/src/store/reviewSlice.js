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

const selectAllReviews = (state) => state.reviews.reviews;

export const selectReviewsForAlbum = createSelector(
  [selectAllReviews, (_, albumId) => albumId],
  (reviews, albumId) => reviews.filter((review) => review.albumId === albumId)
);
