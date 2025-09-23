import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { dummyAlbums } from '../data/dummyData';

export const fetchAlbums = createAsyncThunk('albums/fetchAlbums', async () => {
  // Simulate API fetch
  return dummyAlbums;
});

const albumSlice = createSlice({
  name: 'albums',
  initialState: {
    albums: dummyAlbums,
    status: 'idle',
    error: null,
    selectedAlbum: null,
  },
  reducers: {
    setSelectedAlbum(state, album) {
      state.selectedAlbum = album;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.albums = action.payload;
      })
      .addCase(fetchAlbums.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setSelectedAlbum } = albumSlice.actions;
export default albumSlice.reducer;

// Selector to get album by ID
export const selectAlbumById = (state, albumId) =>
  state.albums.albums.find((a) => a.id === albumId);
