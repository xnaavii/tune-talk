import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { AlbumProvider } from './store/AlbumContext';
import { RatingProvider } from './store/RatingContext';
import { ReviewProvider } from './store/ReviewContext';

export default function App() {
  return (
    <AlbumProvider>
      <RatingProvider>
        <ReviewProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </ReviewProvider>
      </RatingProvider>
    </AlbumProvider>
  );
}
