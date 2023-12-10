const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/checkAuth');

const MovieController = require('../controllers/movies');

router.get('/', MovieController.movies_get_all);

router.post('/', checkAuth, MovieController.movies_add_new);

router.get('/:movieId', MovieController.movies_get_by_id);

router.put('/:movieId', checkAuth, MovieController.movies_change);

router.delete('/:movieId', checkAuth, MovieController.movie_delete);

module.exports = router;
