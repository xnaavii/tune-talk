import AlbumCard from './AlbumCard';
import Spinner from './Spinner';

export default function AlbumList({ query, results, isLoading }) {
  return (
    <section className='flex-1 overflow-y-auto'>
      {query && (
        <>
          <h2 className='text-md p-4'>Showing results for '{query}'</h2>
          {isLoading && <Spinner />}
          {results.length > 0 ? (
            <div className='p-1 grid sm:grid-cols-1 md:grid-cols-2 gap-2'>
              {results.map((result, i) => (
                <AlbumCard key={i} album={result} />
              ))}
            </div>
          ) : (
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
