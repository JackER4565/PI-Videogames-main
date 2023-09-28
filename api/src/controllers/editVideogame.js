const Videogame = require("../db.js").Videogame;

const editVideogame = async (req, res) => {
	try {
		
        const { id } = req.params;
        const { name, description_raw, released, rating, platforms, genres, background_image } = req.body;
		const videogame = await Videogame.findByPk(id);
		if (!videogame)
			return res.status(404).json({ message: "No se encontró el juego" });
        await videogame.update({
            name,
            description_raw,
            released,
            rating,
            background_image
        });
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

        await videogame.setPlatforms(platformsDb);
        await videogame.setGenres(genresDb);

		return res.status(200).json({ message: "Editado con éxito" });
	} catch (error) {
		return res.status(500).json({ message: "Error al intentar editar juego" });
	}
};

module.exports = {
	editVideogame,
};
