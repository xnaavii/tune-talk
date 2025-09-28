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

  if (!query) return albums;
  return albums.filter(
    (album) =>
      album.title.toLowerCase().includes(query) ||
      album.artist.toLowerCase().includes(query)
  );
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

export async function postReview(albumId, review) {
  const res = await fetch(`${API_URL}/albums/${albumId}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review),
  });
  if (!res.ok) throw new Error('Failed to post review');
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
