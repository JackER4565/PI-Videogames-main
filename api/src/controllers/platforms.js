
require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const Platform = require("../db.js").Platform;

const platforms = async (req, res) => {
	try {
		const platformApi = await axios.get(
			`https://api.rawg.io/api/platforms?key=${API_KEY}`
		);
		const platformRES = await platformApi.data.results;
		platformRES.map(async (platform) => {
			await Platform.findOrCreate({
				where: {
					id: platform.id,
					name: platform.name,
				},
			});
		});
		return res.status(200).json(
			await Platform.findAll({
				attributes: ["id", "name"],
			})
		);
	} catch (error) {
		return res
			.status(500)
			.json({ message: "Error al intentar llamar a la API." });
	}
};

module.exports = {
	platforms,
};
