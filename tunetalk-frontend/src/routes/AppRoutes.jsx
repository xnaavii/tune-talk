import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import MainLayout from '../layouts/MainLayout';
import SearchPage from '../pages/SearchPage';
import AlbumPage from '../pages/AlbumPage';
import PopularPage from '../pages/PopularPage';
import ReviewsPage from '../pages/MyReviewsPage';
import NewAlbumsPage from '../pages/NewAlbumsPage';
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route element={<MainLayout />}>
        <Route path='/search' element={<SearchPage />} />
        <Route path='/search/:album_id' element={<AlbumPage />} />
        <Route path='/popular' element={<PopularPage />} />
        <Route path='/reviews' element={<ReviewsPage />} />
        <Route path='/new' element={<NewAlbumsPage />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}
