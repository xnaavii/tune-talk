import { configureStore } from '@reduxjs/toolkit';
import albumsReducer from './albumSlice';

export const store = configureStore({
  reducer: {
    // TODO: Slicers
    albums: albumsReducer,
  },
});
