// Constantes
const express = require('express');
const router = express.Router();

const {videogames} = require('../controllers/videogames');
const {searchVideogames} = require('../controllers/searchVideogames');
const {postVideogames} = require('../controllers/postVideogames');
const {genres} = require('../controllers/genres');
const {platforms} = require('../controllers/platforms');
const {deleteVideogame} = require('../controllers/deleteVideogame');
const {editVideogame} = require('../controllers/editVideogame');
// Rutas

// DB
router.get('/videogames', videogames);
router.get('/platforms', platforms);
router.post('/videogames', postVideogames);
router.delete('/videogames/:id', deleteVideogame);
router.put('/videogames/:id', editVideogame);

// DB y API
router.get('/genres', genres);
router.get('/videogames/:idVideogame', searchVideogames);


module.exports = router;