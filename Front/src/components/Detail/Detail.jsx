import styles from "./Detail.module.css";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function Detail() {
	const [videogame, setVideogame] = useState("");
	const [loading, setLoading] = useState(true);
	const { id } = useParams();

	useEffect(() => {
		setLoading(true);
		const endpoint = `http://localhost:3001/videogames/${id}`;
		axios
			.get(endpoint)
			.then((data) => {
				if (data.data) {
					setVideogame(data.data);
				} else {
					setVideogame("No hay personajes con ese ID");
				}
			})
			.catch((error) => {
				console.error(error);
				setVideogame("Fetch error.");
			}).finally(() => {
				setLoading(false);
			});
	}, [id]);

	if (loading) {
		return <h1>Loading...</h1>;
	}
	return (
		<div>
			<Link className={styles.link} to="/home">Volver</Link>
			<div className={styles.container}>
				<div className={styles.card}>
					<h1>{videogame.name}</h1>
					<img
						src={videogame.background_image}
						alt={videogame.name}
					/>
					<p>Rating: {videogame.rating}</p>
					<p>Released: {videogame.released}</p>
					<p>
						Genres:{" "}
						{videogame.genres &&
							videogame.genres.map((genre) => genre.name).join(", ")}
					</p>
					<p>
						Platforms:{" "}
						{videogame.platforms &&
							videogame.platforms
								.map((platform) => platform.platform.name)
								.join(", ")}
					</p>
					<p>Description: {videogame.description_raw}</p>
				</div>
			</div>
		</div>
	);
}

export default Detail;
