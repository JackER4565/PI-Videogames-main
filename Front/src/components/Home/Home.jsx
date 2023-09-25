import Navbar from "../Navbar/Navbar";
import Cards from "../Cards/Cards";
import Footer from "../Footer/Footer.jsx";
import styles from "./Home.module.css";

import { useSelector } from "react-redux";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMemo } from "react";

import axios from "axios";

import { showServerMessage } from "../../server-messages";

function Home() {
	const { pagenumber } = useParams();

	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [videogamesPerPage, setVideogamesPerPage] = useState(5);

	const [test, setTest] = useState(null);

	let videogames = useSelector((state) => state.videogames);
	const orden = useSelector((state) => state.orden);
	const genFilter = useSelector((state) => state.genFilter);
	const busqueda = useSelector((state) => state.buscarNombre);

	if (busqueda && busqueda !== "x_X") {
		videogames = videogames.filter((v) =>
			v.name.toLowerCase().includes(busqueda.toLowerCase())
		);
	}

	if (videogames.length === 0) {
		if (busqueda && busqueda !== "x_X") {
			if (!test) {
				axios
					.get(
						`http://localhost:3001/videogames/${busqueda.replaceAll(" ", "-")}`
					)
					.then((res) => {
						const videogame = {
							id: res.data.id,
							name: res.data.name,
							background_image: res.data.background_image,
							genres: res.data.genres,
						};

						setTest([videogame]);
					})
					.catch((err) => {
						showServerMessage("Home get = " + err.message, "error");
					});
				// } else {
			}
		}
	}
	if (test && busqueda !== "x_X") {
		videogames = test;
	}

	// Ordenado
	if (orden === "asc") {
		videogames.sort((a, b) => {
			if (a.name > b.name) return 1;
			if (a.name < b.name) return -1;
			return 0;
		});
	} else if (orden === "desc") {
		videogames.sort((a, b) => {
			if (a.name > b.name) return -1;
			if (a.name < b.name) return 1;
			return 0;
		});
	}

	// Filtrado
	if (genFilter !== "all" && genFilter !== "GENERO" && genFilter !== "") {
		videogames = videogames.filter((v) => {
			for (let i = 0; i < v.genres.length; i++) {
				if (v.genres[i].id === parseInt(genFilter)) {
					return true;
				}
			}
			return false;
		});
	}


	// Paginado
	const indexOfLastVideogame = currentPage * videogamesPerPage;
	const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
	const currentVideogames = videogames.slice(
		indexOfFirstVideogame,
		indexOfLastVideogame
	);
	const paginate = (pageNumber) => setCurrentPage(pageNumber);


	useMemo(() => {
		pagenumber && paginate(pagenumber);
	}, [pagenumber]);

	return (
		<div className={styles.container}>
			<Navbar setLoading={setLoading} />
			<Cards
				videogames={currentVideogames}
				loading={loading}
				currentPage={currentPage}
			/>
			<Footer
				videogamesPerPage={videogamesPerPage}
				totalVideogames={videogames.length}
				paginate={paginate}
				currentPage={currentPage}
				svpp={setVideogamesPerPage}
			/>
		</div>
	);
}

export default Home;

// HOME PAGE | la página principal de tu SPA debe contener:

// SearchBar: un input de búsqueda para encontrar videojuegos por nombre.
// Sector en el que se vea un listado de cards con los videojuegos. Al iniciar deberá cargar los primeros resultados obtenidos desde la ruta GET /videogames y deberá mostrar su:
// Imagen.
// Nombre.
// Géneros.
// Cuando se le hace click a una Card deberá redirigir al detalle de ese videojuego específico.
// Botones/Opciones para filtrar por género, y por si su origen es de la API o de la base de datos (creados por nosotros desde el formulario).
// Botones/Opciones para ordenar tanto ascendentemente como descendentemente los videojuegos por orden alfabético y por rating.
// Paginado: el listado de videojuegos se hará por partes. Tu SPA debe contar con un paginado que muestre un total de 15 videojuegos por página.
// ⚠️ IMPORTANTE: se deben mostrar tanto los videojuegos traidos desde la API como así también los de la base de datos, pero NO está permitido almacenar en la base de datos los videojuegos de la API. Solamente se pueden guardar aquellos creados desde el form.

// ⚠️ IMPORTANTE: debido a que en la API existen alrededor de 500.000 videojuegos, por cuestiones de performance puedes tomar la simplificación de obtener y paginar los primeros 100 videojuegos.
