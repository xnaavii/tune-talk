import AlbumCard from './AlbumCard';

export default function AlbumList({ query, results, isLoading }) {
  return (
    <section className='flex-1 overflow-auto'>
      {query && (
        <>
          {!isLoading && results.length > 0 && (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3'>
              {results.map((result, i) => (
                <AlbumCard key={i} album={result} />
              ))}
            </div>
          )}
          {!isLoading && results.length === 0 && (
            <p className='text-md p-4'>No results found.</p>
          )}
        </>
      )}
      {!query && (
        <h2 className='text-md p-4'>
          Try searching for an album, artist or a song.
        </h2>
      )}
    </section>
  );
}
