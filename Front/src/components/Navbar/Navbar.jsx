import style from "./Navbar.module.css";
import SearchBar from "../SearchBar/SearchBar";
import Filters from "../Filters/Filters";
// import Getters from "../Getters/Getters";

import { Link } from "react-router-dom";

import logo from "../../assets/logo.png";

function Navbar() {
	return (
		<div className={style.container}>
			<Link
				to="/home"
				className={style.link}>
				<img
					src={logo}
					alt="logo"
					className={style.logo}
				/>
			</Link>
			<Filters />
			<SearchBar />
			<Link to="/add">
				<button>Agregar Videojuego</button>
			</Link>
		</div>
	);
}

export default Navbar;
