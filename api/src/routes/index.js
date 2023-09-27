const express = require('express');
const router = express.Router();

// Variables

// DB
const {videogames} = require('../controllers/videogames');
const {searchVideogames} = require('../controllers/searchVideogames');
const {postVideogames} = require('../controllers/postVideogames');
const {genres} = require('../controllers/genres');
const {platforms} = require('../controllers/platforms');

// Rutas
// DB
router.get('/videogames', videogames);
router.get('/platforms', platforms);
router.post('/videogames', postVideogames);

// DB y API
router.get('/genres', genres);
router.get('/videogames/:idVideogame', searchVideogames);


module.exports = router;