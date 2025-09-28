import { useEffect } from 'react';
import { fetchAlbumsThunk } from '../store/albumSlice';
import { useSelector, useDispatch } from 'react-redux';
import AlbumCard from '../components/AlbumCard';
import { IoChatbubbleOutline, IoStar } from 'react-icons/io5';
import { sortAlbums } from '../utils/sortAlbums';
import { selectAllRatings } from '../store/ratingSlice';
import Spinner from '../components/common/Spinner';

export default function PopularPage() {
  const dispatch = useDispatch();
  const { albums, status, error } = useSelector((state) => state.albums);
  const reviews = useSelector((state) => state.reviews.reviews);
  const ratings = useSelector(selectAllRatings);

  // Fetch albums if idle
  useEffect(() => {
    if (status === 'idle') dispatch(fetchAlbumsThunk());
  }, [status, dispatch]);

  if (status === 'loading') return <Spinner />;
  if (status === 'failed') return <p>{error}</p>;

  // Sort by rating using your existing utility
  const byRating = sortAlbums(albums, reviews, ratings);

  // Sort by number of reviews (computed inline for latest data)
  const byReviews = [...albums]
    .map((album) => {
      const albumReviews = reviews.filter((r) => r.albumId === album.id);
      const albumRatings = ratings.filter((r) => r.albumId === album.id);
      const avgRating =
        albumRatings.length > 0
          ? albumRatings.reduce((sum, r) => sum + r.rating, 0) /
            albumRatings.length
          : 0;
      return { ...album, albumReviews, albumRatings, avgRating };
    })
    .sort((a, b) => b.albumReviews.length - a.albumReviews.length);

  return (
    <>
      <h2 className='text-3xl font-semibold text-stone-100 mb-4'>
        Popular Music
      </h2>

      {/* Rating Section */}
      <h3 className='p-1 text-lg font-medium text-stone-200 mb-2'>By Rating</h3>
      <div className='flex flex-col gap-3 w-full mb-6'>
        {byRating.map((album, index) => {
          const albumRatings = ratings.filter((r) => r.albumId === album.id);
          const avgRating =
            albumRatings.length > 0
              ? albumRatings.reduce((sum, r) => sum + r.rating, 0) /
                albumRatings.length
              : 0;

          const displayRating = avgRating > 0 ? avgRating.toFixed(1) : '–';

          if (avgRating <= 0) return null;

          return (
            <div
              key={album.id}
              className='flex flex-row items-center justify-between gap-3 rounded-[16px]'
            >
              <div
                className={`flex-1 ${
                  index === 0 &&
                  'animate-pulse duration-2000 border border-stone-400 rounded-[16px]'
                }`}
              >
                <AlbumCard album={album} />
              </div>
              <span className='flex items-center gap-[6px] text-stone-200 justify-end w-[40px]'>
                {displayRating} <IoStar size={12} />
              </span>
            </div>
          );
        })}
      </div>

      {/* Review Section */}
      <h3 className='p-1 text-lg font-medium text-stone-200 mb-2'>By Reviews</h3>
      <div className='flex flex-col gap-3 w-full'>
        {byReviews.map((album, index) => {
          const albumReviews = reviews.filter((r) => r.albumId === album.id);

          if (albumReviews.length <= 0) return null;

          return (
            <div
              key={album.id}
              className='flex flex-row items-center justify-between gap-3 rounded-[16px]'
            >
              <div
                className={`flex-1 ${
                  index === 0 &&
                  'animate-pulse duration-2000 border border-stone-400 rounded-[16px]'
                }`}
              >
                <AlbumCard album={album} />
              </div>
              <span className='flex items-center gap-[6px] text-stone-200 justify-end w-[40px]'>
                {albumReviews.length} <IoChatbubbleOutline size={12} />
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
}
