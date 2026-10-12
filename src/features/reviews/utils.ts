// Average of the given ratings, ignoring 0 (a comment without a rating).
export function averageRating(reviews: { rating: number }[]) {
	const rated = reviews.filter((r) => r.rating > 0);
	if (!rated.length) return 0;
	return rated.reduce((sum, r) => sum + r.rating, 0) / rated.length;
}
