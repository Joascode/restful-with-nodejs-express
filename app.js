const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/bookModel');
const { urlencoded, json } = require('body-parser');

const app = express();
const db = mongoose.connect('mongodb://localhost:27017/bookAPI', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const bookRouter = require('./routes/bookRouter')(Book);
const port = process.env.PORT || 3000;

app.use(urlencoded({ extended: true }));
app.use(json());

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
