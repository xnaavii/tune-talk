import { configureStore } from '@reduxjs/toolkit';
import albumsReducer from './albumSlice';
import reviewsReducer from './reviewSlice';

export const store = configureStore({
  reducer: {
    // TODO: Slicers
    albums: albumsReducer,
    reviews: reviewsReducer,
  },
});
