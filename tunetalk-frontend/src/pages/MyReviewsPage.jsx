import { useSelector } from 'react-redux';
import AlbumCard from '../components/AlbumCard';
import { selectAllReviews } from '../store/reviewSlice';

export default function MyReviewsPage() {
  const reviews = useSelector(selectAllReviews);

  const myAlbumIds = [
    ...new Set(
      reviews.filter((r) => r.user === 'defaultUser').map((r) => r.albumId)
    ),
  ];

  return (
    <>
      <h2 className='text-3xl p-4 font-semibold'>Your Reviews</h2>
      <div className='flex flex-col gap-4 p-4'>
        {myAlbumIds.length === 0 ? (
          <p className='text-stone-300'>You haven't reviewed any albums yet.</p>
        ) : (
          myAlbumIds.map((id) => <AlbumCard key={id} albumId={id} />)
        )}
      </div>
    </>
  );
}
