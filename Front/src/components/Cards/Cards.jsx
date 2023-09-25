import styles from "./Cards.module.css";
import Card from "../Card/Card";
import si_press_start from "../../assets/si_press_start.png";
import { useSelector } from "react-redux";

export default function Cards({ videogames, loading, currentPage }) {
	const busqueda = useSelector((state) => state.buscarNombre);

	if (loading) {
		return <h2>Loading...</h2>;
	}

	
	if (!videogames.length) {
		return (
			<>
				<img
					src={si_press_start}
					alt="press start"
					className={styles.pressStart}
				/>
				<h2>No se encontraron videojuegos... </h2>
				{(busqueda && busqueda !== "x_X") ? <h3>Intenta borrar el filtro.</h3> : <h3>Intenta tocar el boton GET.</h3>}
			</>
		);
	}

	return (
		<div className={styles.container}>
			{videogames.map((videogame) => {
				return (
					<Card
						key={self.crypto.randomUUID()}
						id={videogame.id}
						name={videogame.name}
						image={videogame.background_image}
						genre={videogame.genres.map((genre) => genre.name).join(", ")}
						currentPage={currentPage}
					/>
				);
			})}
		</div>
	);
}
