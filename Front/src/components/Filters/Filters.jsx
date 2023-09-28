import { useDispatch, useSelector } from "react-redux";
import { ORDEN, GENFILTER } from "../../Redux/Actions";

import style from "./Filters.module.css";

function Filters() {
	const dispatch = useDispatch();

	const getGenFilter = useSelector((state) => state.genFilter);
	const getOrden = useSelector((state) => state.orden);

	const generos = useSelector((state) => state.genres);
	const handleGenChange = () => {
		return (e) => {
			dispatch({ type: GENFILTER, payload: e.target.value });
		};
	};

	const handleOrden = () => {
		return (e) => {
			dispatch({ type: ORDEN, payload: e.target.value });
		};
	};

	return (
		<div className={style.container}>
			<div>
				<h4 className={style.subtitle}>Orden:</h4>
				<select
					onChange={handleOrden()}
					className={style.select}>
					<option value=""></option>
					<option
						value="asc"
						{...(getOrden === "asc" ? { selected: true } : null)}>
						Ascendente
					</option>
					<option
						value="desc"
						{...(getOrden === "desc" ? { selected: true } : null)}>
						Descendente
					</option>
				</select>
			</div>
			<div>
				<h4 className={style.subtitle}>Genero:</h4>
				<select
					className={style.select}
					onChange={handleGenChange()}>
					<option value="all">All</option>
					{generos.map((g) => (
						<option
							key={g.id}
							value={g.id}
							{...(g.id == getGenFilter ? { selected: true } : null)}>
							{g.name}
						</option>
					))}
				</select>
			</div>
		</div>
	);
}

export default Filters;
