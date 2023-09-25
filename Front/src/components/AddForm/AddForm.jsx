import { useEffect, useState } from "react";
import validacion from "./Validaciones";
import { useDispatch, useSelector } from "react-redux";
import style from "./AddForm.module.css";
import { postVideogames } from "../../Redux/Actions";
import { Link} from "react-router-dom";
import { showServerMessage } from "../../server-messages";

function AddForm() {
	const dispatch = useDispatch();


	const genres = useSelector((state) => state.genres);

	const [Data, setData] = useState({
		name: "",
		background_image: "",
		rating: "",
		released: "",
		genres: [],
		platforms: "",
		description_raw: "",
	});
	const [error, setError] = useState([]);

	useEffect(() => {
		setError(validacion(Data));
	}, [Data]);




	async function onSubmit(e) {
		e.preventDefault();
		const error = validacion(Data);
		setError(error);
		if (!error.length > 0) {
			const res = await dispatch(postVideogames(Data));
			if (res) showServerMessage("Submit OK = " + res, "success");
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
		if (e.target.name === "name") {
			setData({
				...Data,
				name: e.target.value.charAt(0).toUpperCase()  + e.target.value.slice(1),
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
			<Link className={style.link} to={`/home/`}>Volver</Link>
			<h1 className={style.titulo}>Agregando videojuego a la DB:</h1>
			<div className={style.outerContainer}>
				<form
					className={style.form}
					onSubmit={onSubmit}>
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
					<label htmlFor="description_raw">Descripción:</label>
					<input
						type="text"
						id="description_raw"
						name="description_raw"
						value={Data.description_raw}
						onChange={handleChange}
						placeholder="Descripción"
					/>
					<label htmlFor="platforms">Plataformas:</label>
					<input
						type="text"
						id="platforms"
						name="platforms"
						value={Data.platforms}
						onChange={handleChange}
						placeholder="PC, PS4, etc."
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
					{/* <h3>Géneros:</h3> */}
					{/* <div className={style.inputGeneros}> */}
					{/* {genres &&
					genres.map((genre) => {
						return (
							<div key={genre.id}>
								<input
									className={style.checkbox}
									type="checkbox"
									id={genre.id}
									name="genres"
									value={genre.name}
									onChange={handleChange}
								/>
								<label htmlFor={genre.id}>{genre.name}</label>
							</div>
						);
					})} */}
					<label htmlFor="genres">Géneros:</label>

					<select
						name="genres"
						id="genres"
						multiple
						size={genres.length - 4}
						onChange={handleChange}>
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

					<button
						type="submit"
						className={style.submit}>
						Agregar
					</button>

				</form>
				<div className={style.errorBox}>
					{error.length > 0 && seteado  ? (
						error.map((err) => {
							return (
								<h3
									className={style.label}
									key={err}>
									{err}
								</h3>
							);
						})
					) : !seteado &&  (
						<h3 className={style.label}>Completar todos los campos.</h3>
					)}
				</div>
			</div>
		</div>
	);
}

export default AddForm;
