// ../NAVBAR/navbar.jsx
import { useDispatch } from "react-redux";
import { videogames, genres as getGenres  } from "../../Redux/Actions";

import styles from "./Getters.module.css";
import { showServerMessage } from "../../server-messages";

function Getters({ setLoading }) {
	const dispatch = useDispatch();
	const getVideogames = async () => {
		setLoading(true);
		try {
			await dispatch(videogames());
			await dispatch(getGenres());
		} catch (err) {
			showServerMessage("Getter dispatchs = " + err.message, "error")
		} finally {
			setLoading(false);
		}
	};

	// Llamo al backend para obtener los videojuegos en el store cuando carga la página

	return (
		<div className={styles.container}>
			<button onClick={getVideogames}>Get Videogames</button>
		</div>
	);
}

export default Getters;
