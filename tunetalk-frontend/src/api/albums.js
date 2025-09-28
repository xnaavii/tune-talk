const DEBUG = import.meta.env.VITE_DEBUG;

let API_URL;

if (DEBUG && DEBUG === 'true') {
  API_URL = import.meta.env.VITE_API_URL_DEV;
} else {
  API_URL = import.meta.env.VITE_API_URL;
}

export async function searchAlbums(query) {
  const res = await fetch(`${API_URL}/albums`);

  if (!res.ok) throw new Error('Failed to fetch albums');

  const albums = await res.json();
  const filteredAlbums = albums.filter(
    (album) =>
      album.title.toLowerCase().includes(query.toLowerCase()) ||
      album.artist.toLowerCase().includes(query.toLowerCase())
  );

  if (!query) return albums;
  return filteredAlbums;
}

export async function fetchAlbums() {
  const res = await fetch(`${API_URL}/albums`);
  if (!res.ok) throw new Error('Failed to fetch albums');
  return res.json();
}

export async function fetchAlbumById(id) {
  const res = await fetch(`${API_URL}/albums/${id}`);
  if (!res.ok) throw new Error('Failed to fetch album');
  return res.json();
}

export async function fetchReviewsById(albumId) {
  const res = await fetch(`${API_URL}/albums/${albumId}/reviews`);
  if (!res.ok) throw new Error('Failed to fetch reviews');
  return res.json();
}
export async function fetchReviews() {
  const res = await fetch(`${API_URL}/reviews/`);
  if (!res.ok) throw new Error('Failed to fetch reviews');
  return res.json();
}

export async function deleteReview(reviewId) {
  const res = await fetch(`${API_URL}/reviews/${reviewId}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete review');
  return res.json();
}

export async function postReview(albumId, review) {
  const res = await fetch(`${API_URL}/albums/${albumId}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review),
  });
  if (!res.ok) throw new Error('Failed to post review');
  return res.json();
}

export async function fetchRatings() {
  const res = await fetch(`${API_URL}/ratings`);
  if (!res.ok) throw new Error('Failed to fetch ratings');
  return res.json();
}

export async function postRating(albumId, rating) {
  const res = await fetch(`${API_URL}/ratings/${albumId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(rating),
  });
  if (!res.ok) throw new Error('Failed to post rating');
  return res.json();
}

export async function deleteRating(ratingId) {
  const res = await fetch(`${API_URL}/ratings/${ratingId}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete review');
  return res.json();
}
