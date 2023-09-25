import { useState } from "react";
import styles from "./SearchBar.module.css";
import { useDispatch } from "react-redux";
import { BUSCARNAME } from "../../Redux/Actions";
import { showServerMessage } from "../../server-messages";

export default function SearchBar() {
	const [input, setInput] = useState("");
	const dispatch = useDispatch();

	const buscarVideojuego = () => {
		if (input === "") {
			showServerMessage("Input vacio", "error");
			return;
		}

		dispatch({ type: BUSCARNAME, payload: input });
		setInput("");
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
