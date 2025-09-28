import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
import { fetchAlbums, searchAlbums } from '../api/albums';

export const fetchAlbumsThunk = createAsyncThunk(
  'albums/fetchAlbums',
  async () => {
    return await fetchAlbums();
  }
);

export const searchAlbumsThunk = createAsyncThunk(
  'albums/searchAlbums',
  async (query) => {
    return await searchAlbums(query);
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
        state.error = null;
      })
      .addCase(fetchAlbumsThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.albums = action.payload;
      })
      .addCase(fetchAlbumsThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(searchAlbumsThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(searchAlbumsThunk.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.albums = action.payload;
      })
      .addCase(searchAlbumsThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setSelectedAlbum } = albumSlice.actions;
export default albumSlice.reducer;

export const selectAllAlbums = (state) => state.albums.albums;

// Selector to get album by ID
export const selectAlbumById = createSelector(
  [selectAllAlbums, (_, albumId) => albumId],
  (albums, albumId) => albums.find((album) => album.id === albumId)
);
