import AlbumCard from './AlbumCard';

export default function AlbumList({ albums }) {
  return (
    <section className='flex-1 overflow-auto'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3'>
        {albums.map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </div>
    </section>
  );
}
