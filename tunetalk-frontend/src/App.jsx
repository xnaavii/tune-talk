import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchAlbumsThunk } from './store/albumSlice';
import { fetchReviewsThunk } from './store/reviewSlice';
import { fetchRatingsThunk } from './store/ratingSlice';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAlbumsThunk());
    dispatch(fetchReviewsThunk());
    dispatch(fetchRatingsThunk());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
