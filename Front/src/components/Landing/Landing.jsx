import img from "../../assets/videogame.png";
import { Link } from "react-router-dom";
import styles from "./Landing.module.css";

function Landing() {
	return (
		<div className={styles.container}>
			<h1>Bienvenido!</h1>
			<img
				src={img}
				alt="videogame"
			/>
			<Link to="/home">
				<button>Entrar!</button>
			</Link>
		</div>
	);
}

export default Landing;
