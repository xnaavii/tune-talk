import BackgroundLayer from './components/BackgroundLayer';
import LandingContent from './components/LandingContent';

function App() {
  return (
    <div className='h-dvh relative'>
      <BackgroundLayer />
      <div className='relative z-20 flex items-center justify-center h-full'>
        <LandingContent />
      </div>
    </div>
  );
}

export default App;
