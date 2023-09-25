import style from "./Footer.module.css";
import { useDispatch, useSelector } from "react-redux";
import { BUSCARNAME } from "../../Redux/Actions";
	
function Footer({ videogamesPerPage, totalVideogames, paginate, currentPage, svpp }) {
	const dispatch = useDispatch();
	const pageNumbers = [];
	for (let i = 1; i <= Math.ceil(totalVideogames / videogamesPerPage); i++) {
		pageNumbers.push(i);
	}
	const buscarNombre = useSelector((state) => state.buscarNombre);
	const delFilter = () => {
		dispatch({ type: BUSCARNAME, payload: "x_X" });
	};
	return (
		<div className={style.container}>
			<ul className={style.pagination}>
				{pageNumbers.map((number) => (
					<li
						key={number}
						onClick={() => paginate(number)}
						{...(currentPage == number
							? { className: style.pageItemActive }
							: { className: style.pageItem })}>
						<a
							
							href="#"
							className={style.pageLink}>
							{number}
						</a>
					</li>
				))}
				{(buscarNombre !== "" && buscarNombre !== "x_X") && (<li><button onClick={() => delFilter()}>Borrar búsqueda</button></li>)}
			</ul>
			<div className={style.select}>
				<label htmlFor="videogamesPerPage">Videogames per page: </label>
				<select
					name="videogamesPerPage"
					id="videogamesPerPage"
					onChange={(e) => svpp(e.target.value)}>
					<option value="5">5</option>
					<option value="10">10</option>
					<option value="15">15</option>
					<option value="20">20</option>
				</select>
			</div>
		</div>
	);
}

export default Footer;
