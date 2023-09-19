// ../NAVBAR/navbar.jsx
import { useDispatch } from "react-redux";
import { videogames, genres } from "../../Redux/Actions";

import styles from "./Getters.module.css";
import axios from "axios";

function Getters({ setLoading }) {
	const dispatch = useDispatch();
	const getVideogames = async () => {
		setLoading(true);
		try {
			await dispatch(videogames());
		} catch (err) {
			console.log(err);
		} finally {
			setLoading(false);
		}
	};

	const getGenres = () => {
		axios
			.get("http://localhost:3001/genres")
			.then(() => {
				dispatch(genres());
			})
			.catch((err) => {
				console.log(err);
			});
	};
	// Llamo al backend para obtener los videojuegos en el store cuando carga la página

	return (
		<div className={styles.container}>
			<button onClick={getVideogames}>Get Videogames</button>
			<button onClick={getGenres}>Get Genres</button>
		</div>
	);
}

export default Getters;
