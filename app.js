const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/bookModel');

const app = express();
const db = mongoose.connect('mongodb://localhost:27017/bookAPI', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const bookRouter = express.Router();
const port = process.env.PORT || 3000;

bookRouter.route('/books').get((req, res) => {
  const query = {};
  if (req.query.genre) {
    query.genre = req.query.genre;
  }

  Book.find(query, (err, books) => {
    if (err) res.send(err);
    res.json(books);
  });
});

bookRouter.route('/books/:bookId').get((req, res) => {
  Book.findById(req.params.bookId, (err, book) => {
    if (err) res.send(err);
    res.json(book);
  });
});

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
