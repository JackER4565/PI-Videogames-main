export const VIDEOGAMES = "VIDEOGAMES";
export const GENRES = "GENRES";

import axios from "axios";

export const buscarVideogame = (input) => {
	return async (dispatch) => {
		const response = await axios.get(
			`http://localhost:3001/videogames/${input}`
		);
		dispatch({ type: VIDEOGAMES, payload: response.data });
	};
};

export const postVideogames = (input) => {
	return async (dispatch) => {
		const response = await axios.post(
			"http://localhost:3001/videogames",
			input
		);
		dispatch({ type: VIDEOGAMES, payload: response.data });
	};
};

export const genres = () => {
	return (dispatch) => {
		axios
			.get("http://localhost:3001/getGenres")
			.then((res) => dispatch({ type: GENRES, payload: res.data }))
			.catch((err) => console.log(err));
	};
};

export const videogames = () => async (dispatch) => {
	console.log("entro a videogames");
	try {
		const endpoint = "http://localhost:3001/videogames";
		const response = await axios.get(endpoint);
		console.log("response", response);
		const data = await response.data;
		if (!data.error) {
			return dispatch({
				type: VIDEOGAMES,
				payload: data,
			});
		}
	} catch (error) {
		console.error("Error getting videogames:", error);
		// throw error;
	}
};

// export const removeFav = (id) => async (dispatch) => {
// 	try {
// 		const endpoint = `http://localhost:3001/rickandmorty/fav/${id}`;
// 		const response = await fetch(endpoint, { method: "DELETE" });
// 		const data = await response.json();
// 		if (!data.error) {
// 			return dispatch({
// 				type: REMOVE_FAV,
// 				payload: data,
// 			});
// 		}
// 	} catch (error) {
// 		console.error("Error removing favorite:", error);
// 		throw error;
// 	}
// };
