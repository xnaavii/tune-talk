import Logo from './components/Logo';

function App() {
  return (
    <div className='relative h-dvh'>
      {/* Background image */}
      <div className="absolute inset-0 bg-[url('./assets/record-blue.jpg')] bg-cover bg-center z-0" />

      {/* Semi-transparent color overlay */}
      <div className='absolute inset-0 bg-[#0F2E48] opacity-70 z-10' />

      {/* Main content */}
      <div className='relative z-20'>
        <Logo />
      </div>
    </div>
  );
}

export default App;
