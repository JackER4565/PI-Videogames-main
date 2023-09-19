import styles from "./Cards.module.css";
import Card from "../Card/Card";
import si_press_start from "../../assets/si_press_start.png";

export default function Cards({ videogames, loading }) {
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
				<h2>No hay videojuegos cargados... intenta tocar el boton GET.</h2>
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
					/>
				);
			})}
		</div>
	);
}
