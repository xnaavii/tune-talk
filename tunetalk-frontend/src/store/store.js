import { configureStore } from '@reduxjs/toolkit';
import albumsReducer from './albumSlice';
import reviewsReducer from './reviewSlice';
import ratingsReducer from './ratingSlice';

export const store = configureStore({
  reducer: {
    albums: albumsReducer,
    reviews: reviewsReducer,
    ratings: ratingsReducer,
  },
});
