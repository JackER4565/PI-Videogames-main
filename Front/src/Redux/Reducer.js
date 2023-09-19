import { VIDEOGAMES, GENRES } from "./Actions.js";


const initialState = {
    access: false,
	myFavorites: [],
	videogames: [],
	genres: [],
};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case VIDEOGAMES:
			console.log("action.payload.access", action.payload)
			return {
				...state,
				videogames: action.payload,
			};
		case GENRES:
			return {
				...state,
				genres: [...state.genres].push(action.payload),
			};
		default:
			return state;
	}
};

export default rootReducer;
