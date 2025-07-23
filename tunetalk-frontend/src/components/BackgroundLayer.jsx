export default function BackgroundLayer() {
  return (
    <>
      {/* Background image */}
      <div className="absolute inset-0 bg-[url('./assets/record-blue.jpg')] bg-cover bg-center z-0" />

      {/* Semi-transparent color overlay */}
      <div className='absolute inset-0 bg-[#0F2E48] opacity-80 z-10' />
    </>
  );
}
