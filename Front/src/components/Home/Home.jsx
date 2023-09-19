import Navbar from "../Navbar/Navbar";
import Cards from "../Cards/Cards";
import Footer from "../Footer/Footer.jsx";
import styles from "./Home.module.css";

import { useSelector } from "react-redux";
import {  useState } from "react";


// import axios from "axios";

function Home() {
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [videogamesPerPage] = useState(5);
	console.log("loading", loading);
	// async function a() {
	// 	await axios.get("http://localhost:3001/videogames");
	// 	await axios.get("http://localhost:3001/genres");
	// }
	// a();
	// const dispatch = useDispatch();
	// useEffect(() => {
	// 	dispatch(videogames());
	// }, [dispatch, videogames]);

	const videogames = useSelector((state) => state.videogames);
	console.log("videogames >>>>>>>>>", videogames);
	const genres = useSelector((state) => state.genres);
	

	// Paginado
	const indexOfLastVideogame = currentPage * videogamesPerPage;
	const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
	const currentVideogames = videogames.slice(
		indexOfFirstVideogame,
		indexOfLastVideogame
	);
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	return (
		<div className={styles.container}>
			<Navbar
				genres={genres}
				setLoading={setLoading}
			/>
			<Cards
				videogames={currentVideogames}
				loading={loading}
			/>
			<Footer
				videogamesPerPage={videogamesPerPage}
				totalVideogames={videogames.length}
				paginate={paginate}
				currentPage={currentPage}
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
