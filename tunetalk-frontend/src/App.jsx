import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { AlbumProvider } from './store/AlbumContext';

export default function App() {
  return (
    <AlbumProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AlbumProvider>
  );
}
