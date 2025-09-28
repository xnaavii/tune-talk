import {
  createSlice,
  createSelector,
  createAsyncThunk,
  nanoid,
} from '@reduxjs/toolkit';
import { fetchReviews, deleteReview } from '../api/albums';

export const fetchReviewsThunk = createAsyncThunk(
  'reviews/fetchReviews',
  async () => {
    return await fetchReviews();
  }
);

export const deleteReviewThunk = createAsyncThunk(
  'reviews/deleteReview',
  async (reviewId) => {
    await deleteReview(reviewId);
    return reviewId;
  }
);

const reviewSlice = createSlice({
  name: 'reviews',
  initialState: {
    reviews: [],
    fetchStatus: 'idle',
    fetchError: null,
    deleteStatus: 'idle',
    deleteError: null,
  },
  reducers: {
    addOrUpdateReview(state, action) {
      const { albumId, userId, comment } = action.payload;

      const existingReview = state.reviews.find(
        (r) => r.albumId === albumId && r.userId === userId
      );

      if (existingReview) {
        existingReview.comment = comment;
        existingReview.edited = true;
      } else {
        state.reviews.push({
          id: nanoid(),
          albumId,
          userId,
          comment,
          createdAt: new Date().toISOString(),
          edited: false,
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewsThunk.pending, (state) => {
        state.fetchStatus = 'loading';
        state.fetchError = null;
      })
      .addCase(fetchReviewsThunk.fulfilled, (state, action) => {
        state.fetchStatus = 'succeeded';
        state.reviews = action.payload;
      })
      .addCase(fetchReviewsThunk.rejected, (state, action) => {
        state.fetchStatus = 'failed';
        state.fetchError = action.error.message;
      })
      .addCase(deleteReviewThunk.pending, (state) => {
        state.deleteStatus = 'loading';
        state.deleteError = null;
      })
      .addCase(deleteReviewThunk.fulfilled, (state, action) => {
        state.deleteStatus = 'succeeded';
        state.reviews = state.reviews.filter((r) => r.id !== action.payload);
      })
      .addCase(deleteReviewThunk.rejected, (state, action) => {
        state.deleteStatus = 'failed';
        state.deleteError = action.error.message;
      });
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

