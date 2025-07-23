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
        <div className='flex flex-col items-center'>
          <Logo />
          <div className='mt-2 flex gap-2 justify-center'>
            <Button label={'Popular'} icon={'star-outline'} />
            <Button label={'New'} icon={'sparkles-outline'} />
            <Button label={'Your Reviews'} icon={'person-outline'} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
