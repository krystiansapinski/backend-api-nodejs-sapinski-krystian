// importuję zmienne środowiskowe
require('dotenv').config();

// importuję expresa
const express = require('express');

// tworzę instancję expresa
const app = express();

// łączę się z bazą danych
const mongoose = require('mongoose');
mongoose.connect(
  'mongodb+srv://' +
    process.env.DB_USERNAME +
    ':' +
    process.env.DB_PASSWORD +
    '@cluster0.v2knged.mongodb.net/?retryWrites=true&w=majority'
);

// logger
const morgan = require('morgan');
app.use(morgan('combined'));

// parsuję body
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// routy
const movieRoutes = require('./api/routes/movies');
const userRoutes = require('./api/routes/users');
app.use('/movies', movieRoutes);
app.use('/users', userRoutes);

app.use((req, res, next) => {
  res.status(404).json({ wiadomosc: 'Nie znaleziono ' });
});

module.exports = app;