const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define(
		"videogame",
		{
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				defaultValue: DataTypes.UUIDV4,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			description_raw: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			platforms: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			background_image: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			released: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			rating: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{ timestamps: false }
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
