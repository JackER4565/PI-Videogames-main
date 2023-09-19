// 📍 GET | /videogames/:idVideogame
// Esta ruta obtiene el detalle de un videojuego específico. Es decir que devuelve un objeto con la información pedida en el detalle de un videojuego.
// El videojuego es recibido por parámetro (ID).
// Tiene que incluir los datos del género del videojuego al que está asociado.
// Debe funcionar tanto para los videojuegos de la API como para los de la base de datos.

const { Videogame, Genre } = require("../db.js");
const axios = require("axios");
const { API_KEY } = process.env;

const searchVideogames = async (req, res) => {
	try {
		const { idVideogame } = req.params;
		let videogameDb;
		if (isNaN(parseInt(idVideogame, 10))) {
			videogameDb = await Videogame.findOne({
				where: {
					name: idVideogame,
				},
			});
		} 
		// else {
		// 	videogameDb = await Videogame.findOne({
		// 		where: {
		// 			id: parseInt(idVideogame, 10),
		// 		},
		// 	});
		// }
		// si videogameDb no es null lo encontró en la db
		if (videogameDb) {
			return res.status(200).json(videogameDb);
		} else {
			// si videogameDb es null lo busca en la api
			let videogameApi = await axios.get(
				`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`
			);
			if (videogameApi.data) {
				return res.status(200).json(videogameApi.data);
			} else {
				return res
					.status(404)
					.json({
						message: "No se encontró el videojuego en la DB ni en la API.",
					});
			}
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Error interno del servidor", error: error.message });
	}
};

module.exports = {
	searchVideogames,
};
