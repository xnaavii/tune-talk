import AlbumCard from './AlbumCard';

export default function AlbumList({
  query,
  results,
}) {
  return (
    <section className='flex-1 overflow-y-auto'>
      <h2 className='text-md p-4'>Showing results for '{query}'</h2>

      <div className='p-4 grid sm:grid-cols-1 lg:grid-cols-2 gap-2'>
        {results.map((result, i) => (
          <AlbumCard
            key={i}
            title={result.title}
            artist={result.artist}
            year={result.year}
            image={result.image}
          />
        ))}
      </div>
    </section>
  );
}
