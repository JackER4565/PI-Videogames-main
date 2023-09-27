require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const Videogame = require("../db.js").Videogame;
const Genre = require("../db.js").Genre;
const { Op } = require("sequelize");
// GET | /videogames/name?="..."
// Esta ruta debe obtener los primeros 15 videojuegos que se encuentren con la palabra recibida por query.
// Debe poder buscarlo independientemente de mayúsculas o minúsculas.
// Si no existe el videojuego, debe mostrar un mensaje adecuado.
// Debe buscar tanto los de la API como los de la base de datos.
const videogames = async (req, res) => {
	const { name } = req.query;
	console.log("name", name)
	if (name) {

		try {
			const videogamesDB = await Videogame.findAll({
				where: {
					name: {
						[Op.iLike]: `%${name}%`,
					},
				},
				attributes: ["id", "name", "background_image"],
				include: {
					model: Genre,
					attributes: ["name"],
					through: {
						attributes: [],
					},
				},
				limit: 15,
			});
			if (videogamesDB.length === 15) {
				return res.status(200).json(videogamesDB);
			} else {
				const nameguion = name.replace(" ", "-");
				const videogamesApi = (
					await axios.get(
						`https://api.rawg.io/api/games?key=${API_KEY}&search=${nameguion}&page_size=${15 - videogamesDB.length}`
					)
				).data.results;
				console.log("videogamesApi", videogamesApi)
				const cleanVideogamesApi = videogamesApi.map((videogame) => {
					return {
						id: videogame.id,
						name: videogame.name,
						background_image: videogame.background_image,
						genres: videogame.genres,
					};
				});
				const videogameIds = new Set();
				videogamesDB.forEach((videogame) => {
					videogameIds.add(videogame.id);
				});
				
				const completeVideogames = videogamesDB;
				
				cleanVideogamesApi.forEach((videogame) => {
					if (!videogameIds.has(videogame.id)) {
						completeVideogames.push(videogame);
						videogameIds.add(videogame.id);
					}
				});
				
				console.log("cleanVideogamesApi", cleanVideogamesApi)
				return res.status(200).json(completeVideogames);
			}
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: "Error al intentar llamar a la API.", error: error });
		}
	} // fin if name
	try {
		const videogamesDB = await Videogame.findAll({
			attributes: ["id", "name", "background_image"],
			include: {
				model: Genre,
				attributes: ["name"],
				through: {
					attributes: [],
				},
			},
		});

		const videogamesApi = (
			await axios.get(
				`https://api.rawg.io/api/games?key=${API_KEY}&page_size=40`
			)
		).data.results;
		const cleanVideogamesApi = videogamesApi.map((videogame) => {
			return {
				id: videogame.id,
				name: videogame.name,
				background_image: videogame.background_image,
				genres: videogame.genres,
			};
		});

		const completeVideogames = videogamesDB.concat(cleanVideogamesApi);
		return res.status(200).json(completeVideogames);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ message: "Error al intentar llamar a la API.", error: error });
	}
};

module.exports = {
	videogames,
};
