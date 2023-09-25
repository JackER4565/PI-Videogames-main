import { VIDEOGAMES, GENRES, ORDEN, BUSCARNAME, GENFILTER} from "./Actions.js";


const initialState = {
	videogames: [],
	// videogamesName: [],
	genres: [],
	orden: "",
	buscarNombre: "",
	genFilter: "",
};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
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
