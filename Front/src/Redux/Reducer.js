import { VIDEOGAMES, GENRES, PLATFORMS, ORDEN, BUSCARNAME, GENFILTER} from "./Actions.js";


const initialState = {
	videogames: [],
	// videogamesName: [],
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
				videogames: action.payload,
				// videogamesName: action.payload.map((e) => e.name),
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
