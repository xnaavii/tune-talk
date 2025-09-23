import express from 'express';
import fs, { read } from 'fs';
import path from 'path';
import cors from 'cors';

const PORT = 3000;
const app = express();

app.use(cors());
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
  const album = data.albums.find((a) => a.id === req.params.id);
  if (!album) return res.status(404).json({ error: 'Album not found' });
});

app.get('/albums/:id/reviews', (req, res) => {
  const data = readData();
  const albumId = parseInt(req.params.id);
  const reviews = data.reviews.filter((r) => r.albumId === albumId);
  res.json(reviews);
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
