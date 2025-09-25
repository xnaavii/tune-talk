import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAlbums } from '../api/albums';

export const fetchAlbumsThunk = createAsyncThunk(
  'albums/fetchAlbums',
  async () => {
    return await fetchAlbums(); // return the result
  }
);

const albumSlice = createSlice({
  name: 'albums',
  initialState: {
    albums: [],
    status: 'idle',
    error: null,
    selectedAlbum: null,
  },
  reducers: {
    setSelectedAlbum(state, action) {
      state.selectedAlbum = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbumsThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAlbumsThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.albums = action.payload;
      })
      .addCase(fetchAlbumsThunk.rejected, (state, action) => {
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

export const selectAllAlbums = (state) => state.albums.albums;
