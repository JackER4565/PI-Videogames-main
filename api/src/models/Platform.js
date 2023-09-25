const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define(
		"platform",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			timestamps: false,
		}
	);
};

// MODELO 1 | Videogames

// ID (deben ser distintos a los que vienen de la API). *
// Nombre. *
// Descripción. *
// Plataformas. *
// Imagen. *
// Fecha de lanzamiento. *
// Rating. *

// 📍 MODELO 2 | Genres

// ID. *
// Nombre. *
