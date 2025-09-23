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
    addOrUpdateReview(state, action) {
      const {
        albumId,
        user = 'defaultUser',
        comment = '',
        rating = 0,
      } = action.payload;

      const existingReview = state.reviews.find(
        (r) => r.albumId === albumId && r.user === user
      );

      if (existingReview) {
        existingReview.comment = comment;
        existingReview.rating = rating;
      } else {
        state.reviews.push({
          id: nanoid(),
          albumId,
          user,
          comment,
          rating,
        });
      }
    },
  },
});

export default reviewSlice.reducer;
export const { addOrUpdateReview } = reviewSlice.actions;

// --- Selectors ---
export const selectAllReviews = (state) => state.reviews.reviews;

// Reviews for a specific album
export const selectReviewsForAlbum = createSelector(
  [selectAllReviews, (_, albumId) => albumId],
  (reviews, albumId) => reviews.filter((r) => r.albumId === albumId)
);

// Average rating for a specific album
export const selectAverageRatingForAlbum = createSelector(
  [selectReviewsForAlbum],
  (albumReviews) => {
    if (!albumReviews.length) return 0;
    const total = albumReviews.reduce((sum, r) => sum + r.rating, 0);
    return total / albumReviews.length;
  }
);
