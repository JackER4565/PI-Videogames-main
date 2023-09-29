const Videogame = require("../db.js").Videogame;
const Genre = require("../db.js").Genre;
const Platform = require("../db.js").Platform;

const soloDB = async (req, res) => {
    try{
    const videogamesDB = await Videogame.findAll({
        include: [
            {
                model: Genre,
                attributes: ["name"],
                through: {
                    attributes: [],
                },
            },
            {
                model: Platform,
                attributes: ["name"],
                through: {
                    attributes: [],
                },
            },
        ],
    });
    res.json(videogamesDB);
} catch (error) {   
    console.log(error)
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
}


}
module.exports = {
	soloDB,
};
