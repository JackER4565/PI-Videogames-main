export const VIDEOGAMES = "VIDEOGAMES";
export const GENRES = "GENRES";
export const ORDEN = "ORDEN";
export const BUSCARNAME = "BUSCARNAME";
export const GENFILTER = "GENFILTER";

import { showServerMessage } from "../server-messages.js";

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
	return async () => {
		const response = await axios.post(
			"http://localhost:3001/videogames",
			input
		);
		return response.data;
	};
};

export const genres = () => {
	return (dispatch) => {
		axios
			.get("http://localhost:3001/genres")
			.then((res) => dispatch({ type: GENRES, payload: res.data }))
			.catch((err) => showServerMessage("Dispatch Genres = " + err.message, "error"));
	};
};

export const videogames = () => async (dispatch) => {
	try {
		const endpoint = "http://localhost:3001/videogames";
		const response = await axios.get(endpoint);
		const data = await response.data;
		if (!data.error) {
			return dispatch({
				type: VIDEOGAMES,
				payload: data,
			});
		}
	} catch (error) {
		showServerMessage("Dispatch Videogames = " + error.message, "error");
	}
};
