// GET | /videogames
// Obtiene un arreglo de objetos, donde cada objeto es un videojuego con su información.
require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const Videogame = require("../db.js").Videogame;

const videogames = async (req, res) => {
	// const name = req.query.name;
	// if (!name) {
	try {
		const videogamesDB = await Videogame.findAll();
		// console.log("################## videogame DB ##################")
		// console.log(videogamesDB)
		const videogamesApi = (
			await axios.get(
				`https://api.rawg.io/api/games?key=${API_KEY}&page_size=40`
			)
		).data.results;
		// console.log("################## videogame API ##################")
		// console.log(videogamesApi[0])
		const completeVideogames = videogamesDB.concat(videogamesApi);
		return res.status(200).json(completeVideogames);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ message: "Error al intentar llamar a la API.", error: error });
	}
// } else {
// 	try {
// 		const videogamesApi = (
// 			await axios.get(
// 				`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}&page_size=40`
// 			)
// 		).data.results;
// 		const videogamesDB = await Videogame.findAll({
// 			where: {
// 				name: name,
// 			},
// 		});
// 		const completeVideogames = videogamesDB.concat(videogamesApi);
// 		return res.status(200).json(completeVideogames);
// 	} catch (error) {
// 		console.log(error);
// 		return res
// 			.status(500)
// 			.json({ message: "Error al intentar llamar a la API.", error: error });
// 	}
// };
};

module.exports = {
	videogames,
};
