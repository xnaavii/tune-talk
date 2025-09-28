import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import AlbumCard from '../components/AlbumCard';
import { selectAllAlbums } from '../store/albumSlice';
import { selectAllRatings } from '../store/ratingSlice';
import { selectAllReviews } from '../store/reviewSlice';
import { IoStar, IoChatbubbleOutline } from 'react-icons/io5';
import { fetchRatingsThunk } from '../store/ratingSlice';
import { fetchReviewsThunk } from '../store/reviewSlice';

export default function MyReviewsPage() {
  const dispatch = useDispatch();

  const ratingsStatus = useSelector((state) => state.ratings.fetchStatus);
  const reviewsStatus = useSelector((state) => state.reviews.fetchStatus);

  useEffect(() => {
    if (ratingsStatus === 'idle') dispatch(fetchRatingsThunk());
    if (reviewsStatus === 'idle') dispatch(fetchReviewsThunk());
  }, [ratingsStatus, reviewsStatus, dispatch]);

  const albums = useSelector(selectAllAlbums);
  const ratings = useSelector(selectAllRatings);
  const reviews = useSelector(selectAllReviews);

  const userId = 'user1';

  const userRatings = ratings.filter((r) => r.userId === userId);

  return (
    <>
      <h2 className='text-3xl font-semibold text-stone-100 mb-4'>
        My Reviews & Ratings
      </h2>
      <div className='flex flex-col gap-[6px]'>
        {userRatings.length === 0 ? (
          <p className='text-stone-300'>You haven't rated any albums yet.</p>
        ) : (
          userRatings.map((ratingObj) => {
            const album = albums.find((a) => a.id === ratingObj.albumId);
            if (!album) return null;

            const userReview = reviews.find(
              (r) => r.userId === userId && r.albumId === album.id
            );

            return (
              <div
                key={album.id}
                className='flex flex-row items-center justify-between gap-3 rounded-[16px]'
              >
                <div className='flex-1'>
                  <AlbumCard album={album} />
                </div>
                <div className='flex flex-col items-end gap-1'>
                  <span className='flex items-center gap-1 text-stone-200'>
                    {ratingObj.rating} <IoStar size={12} />
                  </span>
                  {userReview && (
                    <span className='flex items-center gap-1 text-stone-200 text-[12px]'>
                      <IoChatbubbleOutline size={12} /> {userReview.comment}
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
