const express = require('express');
const router = express.Router();

// Variables

// DB
const {videogames} = require('../controllers/videogames');
const {searchVideogames} = require('../controllers/searchVideogames');
const {postVideogames} = require('../controllers/postVideogames');
const {genres} = require('../controllers/genres');

// Rutas
// DB
router.get('/videogames', videogames);
router.post('/videogames', postVideogames);

// DB y API
router.get('/genres', genres);
router.get('/videogames/:idVideogame', searchVideogames);
router.get('/videogames/s', searchVideogames);

module.exports = router;