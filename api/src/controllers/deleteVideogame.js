const Videogame = require("../db.js").Videogame;

const deleteVideogame = async (req, res) => {
	try {
        const { id } = req.params;
        const videogame = await Videogame.findByPk(id);
        if(!videogame) return res.status(404).json({ message: "No se encontró el juego" });
        await videogame.destroy();
		return res
			.status(200)
			.json({ message: "Borrado con éxito" });
	} catch (error) {
		return res.status(500).json({ message: "Error al intentar borrar juego" });
	}
};

module.exports = {
	deleteVideogame,
};