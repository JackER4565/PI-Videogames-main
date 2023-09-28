// 📍 POST | /videogames
// Esta ruta recibirá todos los datos necesarios para crear un videojuego y relacionarlo con sus géneros solicitados.
// Toda la información debe ser recibida por body.
// Debe crear un videojuego en la base de datos, y este debe estar relacionado con sus géneros indicados (al menos uno).
const Videogame = require("../db.js").Videogame;
const Genre = require("../db.js").Genre;
const Platform = require("../db.js").Platform;
const { Op } = require("sequelize");

const postVideogames = async (req, res) => {
	try {
		const {
			name,
			description_raw,
			released,
			rating,
			platforms,
			genres,
			background_image,
		} = req.body;

		const [videogame, created] = await Videogame.findOrCreate({
			where: {
				name,
			},
			defaults: {
				description_raw,
				released,
				rating,
				background_image,
			},
		});

		if (created){
		const genresDb = await Genre.findAll({
			where: {
				name: {
					[Op.in]: genres,
				},
			},
		});

		const platformsDb = await Platform.findAll({
			where: {
				name: {
					[Op.in]: platforms,
				},
			},
		});

		await videogame.addPlatforms(platformsDb);
		await videogame.addGenres(genresDb);
		return res
			.status(200)
			.json(videogame);
		} else {
			return res.status(400).json({ message: "El videojuego ya existe" });
		}
	} catch (error) {
		return res.status(500).json({ message: "Error interno del servidor" });
	}
};

module.exports = {
	postVideogames,
};
