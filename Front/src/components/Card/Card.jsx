import styles from "./Card.module.css";

import { Link } from "react-router-dom";

export default function Card({ id, name, image, genre, currentPage }) {
	return (
		<Link to={`/detail/${id}&${currentPage}`}>
			<div className={styles.container}>
				<h2 className={styles.text}>{name}</h2>
				<img
					className={styles.image}
					src={image}
					alt=""
				/>
				<div className={styles.genre}>
					{genre.split(",").map((g) => (
						<span
							className={styles[g.trim().replace(/\s/g, "_")]}
							key={g}>
							{g.trim()}
						</span>
					))}
				</div>
			</div>
		</Link>
	);
}
