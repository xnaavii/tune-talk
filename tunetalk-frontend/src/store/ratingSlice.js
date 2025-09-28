import {
  createSlice,
  createSelector,
  createAsyncThunk,
  nanoid,
} from '@reduxjs/toolkit';
import { fetchRatings, deleteRating } from '../api/albums';

export const fetchRatingsThunk = createAsyncThunk(
  'ratings/fetchRatings',
  async () => {
    return await fetchRatings();
  }
);

export const deleteRatingThunk = createAsyncThunk(
  'ratings/deleteRating',
  async (ratingId) => {
    await deleteRating(ratingId);
    return ratingId;
  }
);

const ratingSlice = createSlice({
  name: 'ratings',
  initialState: {
    ratings: [],
    fetchStatus: 'idle',
    fetchError: null,
    deleteStatus: 'idle',
    deleteError: null,
  },
  reducers: {
    addOrUpdateRating(state, action) {
      const { albumId, rating, userId } = action.payload;
      const existingRating = state.ratings.find(
        (rating) => rating.userId === userId && rating.albumId === albumId
      );

      if (existingRating) {
        existingRating.rating = rating;
      } else {
        state.ratings.push({
          id: nanoid(),
          albumId,
          userId,
          rating,
          createdAt: new Date().toISOString(),
        });
      }
    },
    removeRating(state, action) {
      const { albumId, userId } = action.payload;
      state.ratings = state.ratings.filter(
        (rating) => !(rating.userId === userId && rating.albumId === albumId)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRatingsThunk.pending, (state) => {
        state.fetchStatus = 'loading';
        state.fetchError = null;
      })
      .addCase(fetchRatingsThunk.fulfilled, (state, action) => {
        state.fetchStatus = 'succeeded';
        state.ratings = action.payload;
      })
      .addCase(fetchRatingsThunk.rejected, (state, action) => {
        state.fetchStatus = 'failed';
        state.fetchError = action.error.message;
      })
      .addCase(deleteRatingThunk.pending, (state) => {
        state.deleteStatus = 'loading';
        state.deleteError = null;
      })
      .addCase(deleteRatingThunk.fulfilled, (state, action) => {
        state.deleteStatus = 'succeeded';
        state.ratings = state.ratings.filter((r) => r.id !== action.payload);
      })
      .addCase(deleteRatingThunk.rejected, (state, action) => {
        state.deleteStatus = 'failed';
        state.deleteError = action.error.message;
      });
  },
});

export default ratingSlice.reducer;
export const { addOrUpdateRating } = ratingSlice.actions;

export const selectAllRatings = (state) => state.ratings.ratings;

export const selectRatingsForAlbum = createSelector(
  [selectAllRatings, (_, albumId) => albumId],
  (ratings, albumId) => ratings.filter((rating) => rating.albumId === albumId)
);

export const selectAverageRatingForAlbum = createSelector(
  [selectRatingsForAlbum],
  (albumRatings) => {
    if (!albumRatings.length) return 0;
    const total = albumRatings.reduce((sum, r) => sum + r.rating, 0);
    return total / albumRatings.length;
  }
);
