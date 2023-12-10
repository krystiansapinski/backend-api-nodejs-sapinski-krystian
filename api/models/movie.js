const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
  author: String,
  title: String,
  price: Number,
});

module.exports = mongoose.model('Movie', movieSchema);
