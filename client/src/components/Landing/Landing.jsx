import React from 'react'
import img from "../../assets/videogame.png";
import { Link } from 'react-router-dom';


function Landing() {
  return (
    <div>
				Bienvenido!
				<img
					src={img}
					alt="videogame"
				/>
				<Link to="/home">
					<button>Entrar!</button>
				</Link>
			</div>
  )
}

export default Landing