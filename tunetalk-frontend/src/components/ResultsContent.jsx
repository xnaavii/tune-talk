import Navbar from './Navbar';

export default function ResultsContent() {
  return (
    <div className='h-dvh max-w-[1100px] mx-auto p-4 my-6 flex flex-col gap-6 overflow-hidden'>
      {/* Top Section */}
      <Navbar />

      {/* Main Content */}
      <main className='flex-1 w-full flex flex-col lg:flex-row p-4 gap-4 text-stone-100 border-stone-50 rounded-lg shadow-sm backdrop-blur-md bg-[#C2E1FA]/20 overflow-hidden'>
        {/* Scrollable Results */}
        <section className='flex-1 overflow-y-auto'>
          <h2 className='text-md p-4'>Showing results for 'query'</h2>

          <div className='p-4 grid sm:grid-cols-1 lg:grid-cols-2 gap-2'>
            {Array.from({ length: 16 }).map((_, i) => (
              <figure key={i} className='p-4 h-40 flex gap-4 bg-[#0F2E48]/40 rounded-xl'>
                <img
                  src='https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/23/07/92/23079247-25be-3098-ef53-78e7d0fe7406/196871341653.jpg/1200x1200bf-60.jpg'
                  alt='Album cover for Tate Mcrae - Greedy'
                  className='rounded-md object-cover'
                />
                <div className='flex flex-col justify-center'>
                  <p className='font-semibold'>Greedy</p>
                  <p className='text-sm'>Tate Mcrae</p>
                  <p className='text-xs text-stone-400'>2023</p>
                </div>
              </figure>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
