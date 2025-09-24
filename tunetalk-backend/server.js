import express from 'express';
import fs from 'fs';
import path from 'path';
import { nanoid } from 'nanoid';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://tune-talk-7zc20o0lw-xnaaviis-projects.vercel.app',
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  })
);

app.use(express.json());

const dataFile = path.resolve('./db.json');

function readData() {
  const raw = fs.readFileSync(dataFile);
  return JSON.parse(raw);
}

function writeData(data) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

app.get('/albums', (req, res) => {
  const data = readData();
  res.json(data.albums);
});

app.get('/albums/:id', (req, res) => {
  const data = readData();
  const album = data.albums.find((a) => a.id === parseInt(req.params.id, 10));
  if (!album) return res.status(404).json({ error: 'Album not found' });
  res.json(album);
});

app.get('/albums/:id/reviews', (req, res) => {
  const data = readData();
  const albumId = parseInt(req.params.id);
  const reviews = data.reviews.filter((r) => r.albumId === albumId);
  res.json(reviews);
});

app.post('/albums/:id/reviews', (req, res) => {
  const data = readData();
  const albumId = parseInt(req.params.id, 10);
  const { user = 'defaultUser', comment = '', rating = 0 } = req.body;

  let review = data.reviews.find(
    (r) => r.albumId === albumId && r.user === user
  );

  if (review) {
    review.comment = comment;
    review.rating = rating;
  } else {
    review = { id: nanoid(), albumId, user, comment, rating };
    data.reviews.push(review);
  }

  writeData(data);
  res.json(review);
});

app.get('/reviews', (req, res) => {
  const data = readData();
  res.json(data.reviews);
});

app.delete('/reviews/:id', (req, res) => {
  const data = readData();
  const reviewId = req.params.id;

  const index = data.reviews.findIndex((r) => String(r.id) === reviewId);
  if (index === -1) {
    return res.status(404).json({ error: 'Review not found' });
  }

  const deletedReview = data.reviews.splice(index, 1)[0];

  writeData(data);
  res.json(deletedReview);
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
