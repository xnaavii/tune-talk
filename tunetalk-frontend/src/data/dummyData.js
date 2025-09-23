export const dummyAlbums = [
  {
    id: 1,
    title: 'Greedy',
    artist: 'Tate Mcrae',
    year: '2023',
    rating: 4,
    reviewIds: [1, 2, 3],
    image:
      'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/23/07/92/23079247-25be-3098-ef53-78e7d0fe7406/196871341653.jpg/1200x1200bf-60.jpg',
  },
  {
    id: 2,
    title: 'Think Later',
    artist: 'Tate Mcrae',
    year: '2023',
    rating: 3,
    reviewIds: [4, 5],
    image:
      'https://upload.wikimedia.org/wikipedia/en/1/16/Tate_McRae_-_Think_Later.png',
  },
  {
    id: 3,
    title: 'SOS',
    artist: 'SZA',
    year: '2022',
    rating: 5,
    reviewIds: [6, 7, 8],
    image:
      'https://ratedrnb.com/cdn/2022/12/sza-sos-album-cover-ratedrnb-scaled.jpg',
  },
  {
    id: 4,
    title: 'CTRL',
    artist: 'SZA',
    year: '2017',
    rating: 5,
    reviewIds: [9, 10],
    image:
      'https://s3.amazonaws.com/truthstudios.com/wp-content/uploads/2017/06/14222958/sza-ctrl-album-art.jpg',
  },
];

export const dummyReviews = [
  {
    id: 1,
    albumId: 1,
    user: 'Alice',
    comment: 'Absolutely love this!',
    rating: 5,
  },
  {
    id: 2,
    albumId: 1,
    user: 'Bob',
    comment: 'Tate McRae never disappoints.',
    rating: 4,
  },
  {
    id: 3,
    albumId: 1,
    user: 'Charlie',
    comment: 'My favorite track',
    rating: 5,
  },

  {
    id: 4,
    albumId: 2,
    user: 'Dana',
    comment: 'Not her best work, but some good songs.',
    rating: 3,
  },
  {
    id: 5,
    albumId: 2,
    user: 'Eli',
    comment: 'Grew on me after a few listens.',
    rating: 3,
  },

  {
    id: 6,
    albumId: 3,
    user: 'Frank',
    comment: 'SZA’s voice is magical!',
    rating: 5,
  },
  {
    id: 7,
    albumId: 3,
    user: 'Grace',
    comment: 'The lyrics really hit hard.',
    rating: 5,
  },
  {
    id: 8,
    albumId: 3,
    user: 'Hannah',
    comment: 'Some tracks feel repetitive, but overall solid.',
    rating: 4,
  },

  {
    id: 9,
    albumId: 4,
    user: 'Ian',
    comment: 'A classic R&B masterpiece.',
    rating: 5,
  },
  {
    id: 10,
    albumId: 4,
    user: 'Jane',
    comment: 'Love the production and vocals!',
    rating: 5,
  },
];
