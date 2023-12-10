// importuję model filmu
const Movie = require('../models/movie');

exports.movies_get_all = (req, res, next) => {
    Movie.find()
      .then((result) => {
        res.status(200).json({
          wiadomosc: 'Lista wszystkich filmów',
          info: result,
        });
      })
      .catch((err) => res.status(500).json(err));
  };
  
  exports.movies_add_new = (req, res, next) => {
    const movie = new Movie({
      author: req.body.author,
      title: req.body.title,
      price: req.body.price,
    });
    movie
      .save()
      .then((result) => {
        res.status(201).json({
          wiadomosc: 'Dodanie nowego filmu',
          info: result,
        });
      })
      .catch((err) => res.status(500).json(err));
  };
  
  exports.movies_get_by_id = (req, res, next) => {
    const id = req.params.movieId;
    Movie.findById(id)
      .then((result) => {
        res.status(200).json({
          wiadomosc: 'Szczegóły filmu o numerze ' + id,
          info: result,
        });
      })
      .catch((err) => res.status(500).json(err));
  };
  
  exports.movies_change = (req, res, next) => {
    const id = req.params.movieId;
    const movie = {
      author: req.body.author,
      title: req.body.title,
      price: req.body.price,
    };
    Movie.findByIdAndUpdate(id, movie)
      .then(() => {
        res
          .status(200)
          .json({ wiadomosc: 'Zmienono dane filmu o numerze ' + id });
      })
      .catch((err) => res.status(500).json(err));
  };
  
  exports.movie_delete = (req, res, next) => {
    const id = req.params.movieId;
    Movie.findByIdAndDelete(id)
      .then(() => {
        res.status(200).json({ wiadomosc: 'Usunięto film o numerze ' + id });
      })
      .catch((err) => res.status(500).json(err));
  };