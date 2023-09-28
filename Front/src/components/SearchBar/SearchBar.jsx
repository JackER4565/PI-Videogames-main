import { useState } from "react";
import style from "./SearchBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { BUSCARNAME } from "../../Redux/Actions";
import { showServerMessage } from "../../server-messages";

export default function SearchBar() {
	const [input, setInput] = useState("");
	const dispatch = useDispatch();

	// buscarVideojuego
	const buscarVideojuego = () => {
		if (input === "") {
			showServerMessage("Input vacio", "error");
			return;
		}
		dispatch({ type: BUSCARNAME, payload: input });
		setInput("");
	};
	const handleChange = (e) => setInput(e.target.value);

	// delFilter
	const buscarNombre = useSelector((state) => state.buscarNombre);
	const delFilter = () => {
		dispatch({ type: BUSCARNAME, payload: undefined });
	};

	return (
		<div className={style.container}>
			{buscarNombre !== "" && buscarNombre !== undefined ? (
				<button onClick={() => delFilter()}>Borrar búsqueda</button>
			) : (
				<><div>
					<h4 className={style.subtitle}>Buscar:</h4>
					<input
						type="text"
						className={style.input}
						onChange={handleChange}
						value={input}
						placeholder="Nombre Videojuego"
					/>
					</div>
					<button onClick={buscarVideojuego}>Buscar</button>
				</>
			)}
		</div>
	);
}

// SearchBar: un input de búsqueda para encontrar videojuegos por nombre.
