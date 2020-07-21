import {
	LOGIN,
	REGISTER,
	REQUEST_SENT,
	REQUEST_ERROR,
	REQUEST_SUCCESS,
	ADD,
	UPDATE,
	DELETE,
	SORTASC,
	SORTDSC,
	SEARCH,
} from "../actions";

const initialState = {
	notes: [],
	error: null,
	requestingData: false,
	newId: "",
	newNote: [],
	user: {}
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case REQUEST_SENT:
			return {
				...state,
				requestingData: true
			};
		case REQUEST_ERROR:
			return {
				...state,
				requestingData: false,
				error: action.payload
			};
		case REQUEST_SUCCESS:
			return {
				...state,
				error: null,
				requestingData: false,
				notes: action.payload
			};
			case LOGIN: 
			return {
				...state,
				error: null,
				requestingData: false,
				user: action.payload
			}
			case REGISTER: 
			return {
				...state,
				error: null,
				requestingData: false,
				user: action.payload
			}
		case ADD:
			return {
				...state,
				error: null,
				requestingData: false,
				newId: action.id,
				notes: [...state.notes]
			};
		case UPDATE:
			return {
				...state,
				error: null,
				requestingData: false,
				notes: [...state.notes]
			};
		case DELETE:
			return {
				...state,
				error: null,
				requestingData: false,
				notes: [...state.notes]
			};
		case SORTASC:
			return {
				...state,
				notes: state.notes.slice().sort(action.payload)
			};
		case SORTDSC:
			return {
				...state,
				notes: state.notes.slice().sort(action.payload)
			};
		case SEARCH:
			return {
				...state,
				notes: state.notes
					.slice()
					.filter((note) =>
						note.title.toLowerCase().includes(action.payload.toLowerCase())
					)
			};

		default:
			return state;
	}
};
