import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage/LandingPage';
import MainLayout from '../layouts/MainLayout';
import ResultsPage from '../pages/ResultsPage/ResultsPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />

      <Route element={<MainLayout />}>
        <Route path='/results' element={<ResultsPage />} />
      </Route>
    </Routes>
  );
}
