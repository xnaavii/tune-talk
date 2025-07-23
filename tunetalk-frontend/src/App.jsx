import Logo from './components/Logo';
import Button from './components/Button';

function App() {
  return (
    <div className='h-dvh relative'>
      {/* Background image */}
      <div className="absolute inset-0 bg-[url('./assets/record-blue.jpg')] bg-cover bg-center z-0" />

      {/* Semi-transparent color overlay */}
      <div className='absolute inset-0 bg-[#0F2E48] opacity-70 z-10' />

      {/* Main content (centered) */}
      <div className='relative z-22 flex items-center justify-center h-full'>
        <div className='flex flex-col'>
          <Logo />
          <div className='mt-2'>
            <Button label={'Popular'} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
