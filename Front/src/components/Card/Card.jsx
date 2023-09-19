import styles from "./Card.module.css";
// import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

export default function Card({ id, name, image, genre }) {
	// const dispatch = useDispatch();
	// const myFavorites = useSelector((state) => state.myFavorites);
	// const [isFavorite, setIsFavorite] = useState(false);
	// const logged = useSelector((state) => state.access);

	// useEffect(() => {
	// 	if (myFavorites && myFavorites.length > 0) {
	// 		if (myFavorites.includes(id)) {
	// 			setIsFavorite(true);
	// 		}
	// 	}
	// }, [myFavorites, id]);

	// function onFavorite(id) {
	// 	setIsFavorite((prevIsFavorite) => {
	// 		const updatedIsFavorite = !prevIsFavorite;

	// 		if (updatedIsFavorite) {
	// 			dispatch(addFav(id));
	// 		} else {
	// 			dispatch(removeFav(id));
	// 		}

	// 		return updatedIsFavorite;
	// 	});
	// }

	// const onClose = (id) => {
	// 	dispatch(removeFav(id));
	// 	dispatch({ type: DEL_CHAR, payload: id });
	// };

	return (
		<div className={styles.container}>
			<Link to={`/detail/${id}`}>
				<div className={styles.text}>
					<h2>{name}</h2>
				</div>
				<img
					className={styles.image}
					src={image}
					alt=""
				/>
				<h2>{genre}</h2>
			</Link>
		</div>
	);
}
