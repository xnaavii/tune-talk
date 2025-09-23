import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAlbums = createAsyncThunk('albums/fetchAlbums', async () => {
  const res = await fetch('http://localhost:3000/albums');
  if (!res.ok) {
    throw new Error('Failed to fetch albums');
  }
  return await res.json();
});

const albumSlice = createSlice({
  name: 'albums',
  initialState: {
    albums: [],
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
