import { dummyAlbums } from '../data/dummyAlbums';

export const getAlbums = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (dummyAlbums) {
        resolve(dummyAlbums);
      } else {
        reject(new Error('There was a problem fetching all albums'));
      }
    }, 300);
  });
};

export const searchAlbums = (query) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (query) {
        const filteredAlbums = dummyAlbums.filter(
          (album) =>
            album.artist.toLowerCase().includes(query) ||
            album.title.toLowerCase().includes(query)
        );
        resolve(filteredAlbums);
      } else {
        reject(new Error('There was a problem getting the album'));
      }
    }, 300);
  });
};
