import { useEffect, useState } from "react";
import validacion from "../../Utils/Validaciones";
import { useDispatch, useSelector } from "react-redux";
import style from "./AddForm.module.css";
import { postVideogames } from "../../Redux/Actions";
import { Link } from "react-router-dom";
import { showServerMessage } from "../../Utils/server-messages";
import {
	genres as getGenres,
	platforms as getPlatforms,
} from "../../Redux/Actions";

function AddForm() {
	const dispatch = useDispatch();

	const genres = useSelector((state) => state.genres);
	const platforms = useSelector((state) => state.platforms);

	const [Data, setData] = useState({
		name: "",
		background_image: "",
		rating: "",
		released: "",
		genres: [],
		platforms: [],
		description_raw: "",
	});
	const [error, setError] = useState([]);

	useEffect(() => {
		const run = async () => {
			try {
				dispatch(getGenres());
				dispatch(getPlatforms());
			} catch (err) {
				showServerMessage("Getter dispatchs = " + err.message, "error");
			}
		};
		run();
	}, [dispatch]);

	useEffect(() => {
		setError(validacion(Data));
	}, [Data]);

	async function onSubmit(e) {
		e.preventDefault();
		const error = validacion(Data);
		setError(error);
		if (!error.length > 0) {
			setData({
				...Data,
				platforms: Data.platforms.map((platform) => platform.trim()),
			});
			const res = await dispatch(postVideogames(Data));
			console.log(res)
			if (res) {
				showServerMessage("Submit OK = " + "Videojuego agregado a la DB con éxito", "success");
				setData({
					name: "",
					background_image: "",
					rating: "",
					released: "",
					genres: [],
					platforms: [],
					description_raw: "",
				});
				document.querySelector("#genres").value = "";
				document.querySelector("#platforms").value = "";
			}
		} else {
			showServerMessage("Error al enviar el formulario", "error");
		}
	}

	function handleChange(e) {
		if (error.length > 0) {
			const error = validacion(Data);
			setError(error);
		}
		if (e.target.name === "genres") {
			setData({
				...Data,
				genres: Array.from(e.target.selectedOptions, (item) => item.value),
			});
			return;
		}
		if (e.target.name === "platforms") {
			setData({
				...Data,
				platforms: Array.from(e.target.selectedOptions, (item) => item.value),
			});
			return;
		}
		if (e.target.name === "name") {
			setData({
				...Data,
				name: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1),
			});
			return;
		}

		if (e.target.name === "platforms") {
			setData({
				...Data,
				platforms: e.target.value.split(","),
			});
			return;
		}

		setData({
			...Data,
			[e.target.name]: e.target.value,
		});
	}
	const seteado = Object.keys(Data).every((key) => Data[key] !== "");

	return (
		<div className={style.container}>
			<h1 className={style.titulo}>Agregando videojuego a la DB:</h1>
			<div className={style.outerContainer}>
				<form
					className={style.form}
					onSubmit={onSubmit}>
					<div className={style.formContainer}>
						<div className={style.container__inputs}>
					<label htmlFor="name">Nombre:</label>
					<input
						type="text"
						id="name"
						name="name"
						value={Data.name}
						onChange={handleChange}
						autoComplete="off"
						placeholder="Nombre"
					/>
					{/* TODO {Data.name === "" && <span className={style.error}>Campo obligatorio</span>} */}
					<label htmlFor="description_raw">Descripción:</label>
					<input
						type="text"
						id="description_raw"
						name="description_raw"
						value={Data.description_raw}
						onChange={handleChange}
						placeholder="Descripción"
					/>
					<label htmlFor="background_image">Imagen:</label>
					<input
						type="text"
						id="background_image"
						name="background_image"
						value={Data.background_image}
						onChange={handleChange}
						placeholder="URL"
					/>
					<label htmlFor="released">Fecha de lanzamiento:</label>
					<input
						type="date"
						id="released"
						name="released"
						value={Data.released}
						onChange={handleChange}
						placeholder="YYYY-MM-DD"
					/>
					<label htmlFor="rating">Rating:</label>
					<input
						type="number"
						name="rating"
						id="rating"
						value={Data.rating}
						onChange={handleChange}
						placeholder="0-5"
					/>
						</div>
						<div className={style.container__plataformas}>
						<label htmlFor="platforms">Plataformas:</label>

						<select
							name="platforms"
							id="platforms"
							multiple
							size={genres.length}
							onChange={handleChange}
							className={style.select__platforms}>
							{platforms.length != 0 ? (
								platforms.map((platforms) => {
									return (
										<option
											value={platforms.name}
											key={platforms.id}>
											{platforms.name}
										</option>
									);
								})
							) : (
								<option>Cargando...</option>
							)}
						</select>
						</div>
						<div className={style.container__genero}>
						<label htmlFor="genres">Géneros:</label>

						<select
							name="genres"
							id="genres"
							multiple
							size={genres.length}
							onChange={handleChange}
							className={style.select__genres}>
							{genres.length != 0 ? (
								genres.map((genre) => {
									return (
										<option
											value={genre.name}
											key={genre.id}>
											{genre.name}
										</option>
									);
								})
							) : (
								<option>Cargando...</option>
							)}
						</select>
						</div>
					</div>
					<div className={style.container__buttons}>
						<button
							type="submit"
							className={style.submit}>
							Agregar
						</button>
						<Link
							className={style.link}
							to={`/home/`}>
							<button className={style.submit}>Volver</button>
						</Link>
					</div>
				</form>

			<div className={style.errorBox}>
					{error.length > 0 && seteado
						? error.map((err) => {
							return (
								<h3
									className={style.label}
									key={err}>
									{err}
								</h3>
							);
						})
						: !seteado && (
							<h3 className={style.label}>Completar todos los campos.</h3>
						)}
			</div>
			</div>
		</div>
	);
}

export default AddForm;
