import AlbumList from './AlbumList';

export default function ResultsContainer({ query, results }) {
  return (
    <main className='flex-1 w-full flex flex-col lg:flex-row p-4 gap-4 text-stone-100 border-stone-50 rounded-lg shadow-sm backdrop-blur-md bg-[#C2E1FA]/20 overflow-hidden'>
      <AlbumList query={query} results={results} />
    </main>
  );
}
