import Navbar from "../Navbar/Navbar";
import Cards from "../Cards/Cards";
import Footer from "../Footer/Footer.jsx";
import styles from "./Home.module.css";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import {
	videogames as getVideogames,
	genres as getGenres,
	platforms as getPlatforms,
} from "../../Redux/Actions";

import axios from "axios";

import { showServerMessage } from "../../server-messages";

function Home() {
	const { pagenumber } = useParams();

	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [videogamesPerPage, setVideogamesPerPage] = useState(5);
	const [search, setSearch] = useState(null);

	let videogames = useSelector((state) => state.videogames);
	const order = useSelector((state) => state.orden);
	const genFilter = useSelector((state) => state.genFilter);
	const findBox = useSelector((state) => state.buscarNombre);

	const dispatch = useDispatch();

	useEffect(() => {
		const run = async () => {
			setLoading(true);
			try {
				await dispatch(getVideogames());
				await dispatch(getGenres());
				await dispatch(getPlatforms());
			} catch (err) {
				showServerMessage("Getter dispatchs = " + err.message, "error");
			} finally {
				setLoading(false);
			}
		};
		run();
	}, [dispatch]);

	if (findBox && findBox !== undefined) {
		videogames = videogames.filter((v) =>
			v.name.toLowerCase().includes(findBox.toLowerCase())
		);
	}


		if (findBox && findBox !== undefined) {
			if (!search) {
				// TODO poner loading 
				axios
					.get(
						`http://localhost:3001/videogames?name=${findBox.toLowerCase()}`
					)
					.then((res) => {
						const newVideogames = res.data.map((game) => ({
							id: game.id,
							name: game.name,
							background_image: game.background_image,
							genres: game.genres,
						}));

						setSearch([...newVideogames]);
					})

					.catch((err) => {
						showServerMessage("Home get = " + err.message, "error");
					});

			}
		}

	if (search && findBox !== undefined) {
		videogames = search;
	}

	// Ordenado
	if (order === "asc") {
		videogames.sort((a, b) => {
			if (a.name > b.name) return 1;
			if (a.name < b.name) return -1;
			return 0;
		});
	} else if (order === "desc") {
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
