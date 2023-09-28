import Navbar from "../Navbar/Navbar";
import Cards from "../Cards/Cards";
import Footer from "../Footer/Footer.jsx";
import styles from "./Home.module.css";

import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import {
	videogames as getVideogames,
	genres as getGenres,
	platforms as getPlatforms,
} from "../../Redux/Actions";

import axios from "axios";

import { showServerMessage } from "../../server-messages";

function Home() {
	const { pagenumber } = useParams();

	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [videogamesPerPage, setVideogamesPerPage] = useState(5);
	const [search, setSearch] = useState(null);

	let videogames = useSelector((state) => state.videogames);
	const order = useSelector((state) => state.orden);
	const genFilter = useSelector((state) => state.genFilter);
	const findBox = useSelector((state) => state.buscarNombre);

	const dispatch = useDispatch();
	const runRef = useRef(0);
	
	
	useEffect(() => {
		const run = async () => {
			setLoading(true);
			try {
				await dispatch(getVideogames());
				await dispatch(getGenres());
				await dispatch(getPlatforms());
				runRef.current = 1;
			} catch (err) {
				showServerMessage("Getter dispatchs = " + err.message, "error");
			} finally {
				setLoading(false);
			}
		};
		if (videogames.length === 0 && runRef.current === 0) {
			run();
		}
	}, [dispatch, videogames.length, runRef]);



	if (findBox && findBox !== undefined) {
		videogames = videogames.filter((v) =>
			v.name.toLowerCase().includes(findBox.toLowerCase())
		);
		//TODO PAGINATE 1
	}


		if (findBox && findBox !== undefined) {
			if (!search) {
				// TODO SET LOADING mover a redux
				axios
					.get(
						`http://localhost:3001/videogames?name=${findBox.toLowerCase()}`
					)
					.then((res) => {
						const newVideogames = res.data.map((game) => ({
							id: game.id,
							name: game.name,
							background_image: game.background_image,
							genres: game.genres,
						}));

						setSearch([...newVideogames]);
					})

					.catch((err) => {
						showServerMessage("Home get = " + err.message, "error");
					});

			}
		}

	if (search && findBox !== undefined) {
		videogames = search;
	}

	// Ordenado
	if (order === "asc") {
		videogames.sort((a, b) => {
			if (a.name > b.name) return 1;
			if (a.name < b.name) return -1;
			return 0;
		});
	} else if (order === "desc") {
		videogames.sort((a, b) => {
			if (a.name > b.name) return -1;
			if (a.name < b.name) return 1;
			return 0;
		});
	}

	// Filtrado
	if (genFilter !== "all" && genFilter !== "") {
		//TODO PAGINATE 1
		videogames = videogames.filter((v) => {
			for (let i = 0; i < v.genres.length; i++) {
				if (v.genres[i].id === parseInt(genFilter)) {
					return true;
				}
			}
			return false;
		});
		
	}

	// Paginado
	const indexOfLastVideogame = currentPage * videogamesPerPage;
	const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
	const currentVideogames = videogames.slice(
		indexOfFirstVideogame,
		indexOfLastVideogame
	);
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	useMemo(() => {
		pagenumber && paginate(pagenumber);
	}, [pagenumber]);

	return (
		<div className={styles.container}>
			<Navbar />
			<Cards
				videogames={currentVideogames}
				loading={loading}
				currentPage={currentPage}
			/>
			<Footer
				videogamesPerPage={videogamesPerPage}
				totalVideogames={videogames.length}
				paginate={paginate}
				currentPage={currentPage}
				svpp={setVideogamesPerPage}
			/>
		</div>
	);
}

export default Home;
