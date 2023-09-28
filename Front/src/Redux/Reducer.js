import { VIDEOGAMES, GENRES, PLATFORMS, ORDEN, BUSCARNAME, GENFILTER, FINDER} from "./Actions.js";


const initialState = {
	videogames: [],
	platforms: [],
	genres: [],
	orden: "",
	buscarNombre: "",
	genFilter: "",
};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case PLATFORMS:
			return {
				...state,
				platforms: action.payload,
			};
		case GENFILTER:
			return {
				...state,
				genFilter: action.payload,
			};
		case BUSCARNAME:
			return {
				...state,
				buscarNombre: action.payload,
			};
		case ORDEN:
			return {
				...state,
				orden: action.payload,
			};
		case VIDEOGAMES:
			return {
				...state,
				videogames: [...state.videogames, ...action.payload],
			};
		case FINDER:
			return {
				...state,
				videogames: action.payload,
			};
		case GENRES:
			return {
				...state,
				genres: action.payload,
			};
		default:
			return state;
	}
};

export default rootReducer;
