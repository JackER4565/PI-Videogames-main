import styles from "./Detail.module.css";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { showServerMessage } from "../../server-messages";
function Detail() {
	const [videogame, setVideogame] = useState("");
	const [loading, setLoading] = useState(true);
	const { param } = useParams();

	const id = param.split("&")[0];
	const pagenumber = param.split("&")[1];

	useEffect(() => {
		setLoading(true);
		const endpoint = `http://localhost:3001/videogames/${id}`;
		axios
			.get(endpoint)
			.then((data) => {
				console.log("detail ", data.data);
				if (data.data) {
					setVideogame(data.data);
				} else {
					setVideogame("No hay personajes con ese ID");
				}
			})
			.catch((error) => {
				showServerMessage("Detail get = " + error.message, "error");
			})
			.finally(() => {
				setLoading(false);
			});
	}, [id]);

	if (loading) {
		return <h1>Loading...</h1>;
	}
	return (
		<>
			<Link
				className={styles.link}
				to={`/home/${pagenumber}`}>
				Volver
			</Link>
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
								.map((platform) => platform.name).join(", ")}
					</p>
					<p>Description: {videogame.description_raw}</p>
				</div>
			</div>
		</>
	);
}

export default Detail;
