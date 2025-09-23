import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { dummyAlbums } from '../data/dummyData';
import { getAlbums } from '../api/albums';

export const fetchAlbums = createAsyncThunk(
  'albums/fetchAlbums',
  async (_, { rejectWithValue }) => {
    try {
      const albums = await getAlbums();
      return albums;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  selectedAlbum: null,
  albums: dummyAlbums,
  status: 'idle',
  error: null,
};

const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {
    setSelectedAlbum(state, action) {
      state.selectedAlbum = action.payload;
    },
    // changeRating(state, action) {
    //   const { id, rating } = action.payload;
    //   const album = state.albums.find((album) => album.id === id);
    //   if (album) {
    //     album.rating = rating;
    //   }
    // },
    setAlbums(state, action) {
      state.albums = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.albums = action.payload;
      })
      .addCase(fetchAlbums.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch albums';
      });
  },
});

export const { setSelectedAlbum, changeRating, setAlbums } =
  albumsSlice.actions;

export default albumsSlice.reducer;

export const selectAlbumById = (state, albumId) =>
  state.albums.albums.find((album) => album.id === albumId);
