import { useState } from "react";
import styles from "./SearchBar.module.css";
import { useDispatch } from "react-redux";
import { buscarVideogame } from "../../Redux/Actions";

export default function SearchBar() {
	const [input, setInput] = useState("");
	const dispatch = useDispatch();

	const buscarVideojuego = () => {
		if (input === "") {
			return;
		}
		setInput("");
		dispatch(buscarVideogame(input));
	};


	const handleChange = (e) => {
		setInput(e.target.value);
	};

	return (
		<div className={styles.container}>
			<span>Buscar: </span>
			<input
				type="text"
				onChange={handleChange}
				value={input}
				placeholder="Nombre Videojuego"
			/>
			<button onClick={buscarVideojuego}>Buscar</button>
		</div>
	);
}

// SearchBar: un input de búsqueda para encontrar videojuegos por nombre.
