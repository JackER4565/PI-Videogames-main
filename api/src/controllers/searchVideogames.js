// 📍 GET | /videogames/:idVideogame
// Esta ruta obtiene el detalle de un videojuego específico. Es decir que devuelve un objeto con la información pedida en el detalle de un videojuego.
// El videojuego es recibido por parámetro (ID).
// Tiene que incluir los datos del género del videojuego al que está asociado.
// Debe funcionar tanto para los videojuegos de la API como para los de la base de datos.

const { Videogame, Genre, Platform } = require("../db.js");
const axios = require("axios");
const { API_KEY } = process.env;
const { Op } = require("sequelize");

const searchVideogames = async (req, res) => {
	try {
		let idVideogame;
		if (req.params.idVideogame === "s") idVideogame = req.query.name;
		else idVideogame = req.params.idVideogame;

		// ejemplo: path-of-exile
		console.log("idVideogame", typeof idVideogame);
		// primero lo busco en la db

		// const videogameDb = await Videogame.findOne({
		// 	where: {
		// 		[Op.or]: [{ name: idVideogame }, { id: idVideogame }],
		// 	},
		// });

		const videogameDb = await Videogame.findOne({
			where: {
				[Op.or]: [{ name: idVideogame }, { id: idVideogame }],
				// id: idVideogame,
			},
			include: {
				model: Genre,
				attributes: ["name"],
				through: {
					attributes: [],
				},
				model: Platform,
				attributes: ["name"],
				through: {
					attributes: [],
				},
			},
		});

		console.log(
			"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
		);
		console.log("videogameDb", videogameDb);
		if (videogameDb) {
			return res.status(200).json(videogameDb);
		} else {
			console.log("no lo encontró en la db");
			// si videogameDb es null lo busca en la api
			let videogameApi = await axios.get(
				`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`
			);
			console.log("videogameApi", videogameApi.data);
			if (videogameApi.data) {
				return res.status(200).json(videogameApi.data);
			} else {
				return res.status(404).json({
					message: "No se encontró el videojuego en la DB ni en la API.",
				});
			}
		}
	} catch (error) {
		// console.log(error);
		return res
			.status(500)
			.json({ message: "Error interno del servidor", error: error.message });
	}
};

module.exports = {
	searchVideogames,
};
