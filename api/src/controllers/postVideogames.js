// 📍 POST | /videogames
// Esta ruta recibirá todos los datos necesarios para crear un videojuego y relacionarlo con sus géneros solicitados.
// Toda la información debe ser recibida por body.
// Debe crear un videojuego en la base de datos, y este debe estar relacionado con sus géneros indicados (al menos uno).
const { Videogame } = require('../db.js');
const { Genre } = require('../db.js');


const postVideogames = async (req, res) => {
    try {
        const { name, description, released, rating, platforms, genres } = req.body;
        let videogame = await Videogame.findOrCreate({
            name,
            description,
            released,
            rating,
            platforms
        });
        let genresDb = await Genre.findAll({
            where: {
                name: genres
            }
        });
        await videogame.addGenres(genresDb);
        return res.status(200).json({ message: 'Videojuego agregado a la DB con éxito' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}

module.exports = {
    postVideogames
}