export const VIDEOGAMES = "VIDEOGAMES";
export const GENRES = "GENRES";
export const PLATFORMS = "PLATFORMS";
export const ORDEN = "ORDEN";
export const BUSCARNAME = "BUSCARNAME";
export const GENFILTER = "GENFILTER";
export const FINDER = "FINDER";

import { showServerMessage } from "../Utils/server-messages.js";

import axios from "axios";

export const platforms = () => {
	return (dispatch) => {
		axios
			.get("http://localhost:3001/platforms")
			.then((res) => dispatch({ type: PLATFORMS, payload: res.data }))
			.catch((error) =>
				error.response.data.message
					? showServerMessage("ERROR: " + error.response.data.message, "error")
					: showServerMessage("ERROR: " + error, "error")
			);
	};
};

export const buscarVideogame = (input) => {
	return async (dispatch) => {
		try {
			const response = await axios.get(
				`http://localhost:3001/videogames/${input}`
			);
			dispatch({ type: FINDER, payload: response.data });
		} catch (error) {
			error.response.data.message
				? showServerMessage("ERROR: " + error.response.data.message, "error")
				: showServerMessage("ERROR: " + error, "error");
		}
	};
};

export const postVideogames = (input) => {
	return (dispatch) => {
		try {
			axios.post(
				"http://localhost:3001/videogames",
				input
			).then((res) => {
				const { id, name, background_image, genres } = res.data;				
				const cleanData = [{
					id,
					name,
					background_image,
					genres,
			}];
				dispatch({ type: VIDEOGAMES, payload: cleanData });
			}
			);
			return true;
		} catch (error) {
			error.response.data.message
				? showServerMessage("ERROR: " + error.response.data.message, "error")
				: showServerMessage("ERROR: " + error, "error");
		}
	};
};

export const genres = () => {
	return (dispatch) => {
		axios
			.get("http://localhost:3001/genres")
			.then((res) => dispatch({ type: GENRES, payload: res.data }))
			.catch((error) =>
				error.response.data.message
					? showServerMessage("ERROR: " + error.response.data.message, "error")
					: showServerMessage("ERROR: " + error, "error")
			);
	};
};

export const videogames = () => async (dispatch) => {
	try {
		const endpoint = "http://localhost:3001/videogames";
		const response = await axios.get(endpoint);
		const data = await response.data;
		console.log(data)
		return dispatch({
			type: VIDEOGAMES,
			payload: data,
		});
	} catch (error) {
		error.response.data.message
			? showServerMessage("ERROR: " + error.response.data.message, "error")
			: showServerMessage("ERROR: " + error, "error");
	}
};

export const orden = (input) => {
	return (dispatch) => {
		dispatch({ type: ORDEN, payload: input });
	};
};
