import img from "../../assets/videogame.png";
import { Link } from "react-router-dom";
import styles from "./Landing.module.css";

function Landing() {
	return (
		<div className={styles.container}>
			Bienvenido!
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
