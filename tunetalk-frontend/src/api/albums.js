// import { dummyAlbums } from '../data/dummyData';

// export const getAlbums = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (dummyAlbums) {
//         resolve(dummyAlbums);
//       } else {
//         reject(new Error('There was a problem fetching all albums'));
//       }
//     }, 300);
//   });
// };

// export const searchAlbums = (query) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (query) {
//         const filteredAlbums = dummyAlbums.filter(
//           (album) =>
//             album.artist.toLowerCase().includes(query) ||
//             album.title.toLowerCase().includes(query)
//         );
//         resolve(filteredAlbums);
//       } else {
//         reject(new Error('There was a problem getting the album'));
//       }
//     }, 300);
//   });
// };

export async function searchAlbums(query) {
  const res = await fetch('http://localhost:3000/albums');
  if (!res.ok) throw new Error('Failed to fetch albums');

  const albums = await res.json();

  if (!query) return albums;

  return albums.filter(
    (album) =>
      album.title.toLowerCase().includes(query) ||
      album.artist.toLowerCase().includes(query)
  );
}

export async function fetchAlbums() {
  const res = await fetch('http://localhost:3000/albums');
  if (!res.ok) throw new Error('Failed to fetch albums');
  return res.json();
}

export async function fetchAlbumById(id) {
  const res = await fetch(`http://localhost:3000/albums/${id}`);
  if (!res.ok) throw new Error('Failed to fetch album');
  return res.json();
}

export async function fetchReviewsById(albumId) {
  const res = await fetch(`http://localhost:3000/albums/${albumId}/reviews`);
  if (!res.ok) throw new Error('Failed to fetch reviews');
  return res.json();
}

export async function postReview(albumId, review) {
  const res = await fetch(`http://localhost:3000/albums/${albumId}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review),
  });
  if (!res.ok) throw new Error('Failed to post review');
  return res.json();
}

export async function fetchReviews() {
  const res = await fetch(`http://localhost:3000/reviews/`);
  if (!res.ok) throw new Error('Failed to fetch reviews');
  return res.json();
}

export async function deleteReview(reviewId) {
  const res = await fetch(`http://localhost:3000/reviews/${reviewId}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete review');
  return res.json();
}