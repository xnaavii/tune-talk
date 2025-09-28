export function sortAlbums(albums, reviews, ratings) {
  return [...albums].sort((a, b) => {
    const reviewsA = reviews.filter((r) => r.albumId === a.id);
    const reviewsB = reviews.filter((r) => r.albumId === b.id);

    const ratingsA = ratings.filter((r) => r.albumId === a.id);
    const ratingsB = ratings.filter((r) => r.albumId === b.id);

    const avgRatingA =
      ratingsA.length > 0
        ? ratingsA.reduce((sum, r) => sum + r.rating, 0) / ratingsA.length
        : 0;

    const avgRatingB =
      ratingsB.length > 0
        ? ratingsB.reduce((sum, r) => sum + r.rating, 0) / ratingsB.length
        : 0;

    if (avgRatingB !== avgRatingA) return avgRatingB - avgRatingA;

    return reviewsB.length - reviewsA.length;
  });
}
