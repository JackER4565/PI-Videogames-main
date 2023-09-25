// GET | /genres
// Obtiene un arreglo con todos los géneros existentes de la API.
// En una primera instancia, cuando la base de datos este vacía, deberás guardar todos los géneros que encuentres en la API.
// Estos deben ser obtenidos de la API (se evaluará que no haya hardcodeo). Luego de obtenerlos de la API, deben ser guardados en la base de datos para su posterior consumo desde allí.

require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const Genre = require("../db.js").Genre;

const genres = async (req, res) => {
	try {
		const genresApi = await axios.get(
			`https://api.rawg.io/api/genres?key=${API_KEY}`
		);
		const genRES = await genresApi.data.results;
		genRES.map(async (genre) => {
			await Genre.findOrCreate({
				where: {
					id: genre.id,
					name: genre.name,
				},
			});
		});
		return res.status(200).json(
			await Genre.findAll({
				attributes: ["id", "name"],
			})
		);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ message: "Error al intentar llamar a la API." });
	}
};

module.exports = {
	genres,
};
