import {
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
	newId: "",
	newNote: [],
	message: null
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case REQUEST_SENT:
			return {
				...state,
				message: null
			};
		case REQUEST_ERROR:
			return {
				...state,
				error: action.payload,
				message: null
			};
		case REQUEST_SUCCESS:
			return {
				...state,
				error: null,
				notes: action.payload,
				message: null
			};
		case ADD:
			return {
				...state,
				error: null,		
				newId: action.id,
				notes: [...state.notes],
				message: 'Note added successfully.'
			};
		case UPDATE:
			return {
				...state,
				error: null,		
				notes: [...state.notes],
				message: 'Note updated successfully.'
			};
		case DELETE:
			return {
				...state,
				error: null,		
				notes: [...state.notes],
				message: action.payload
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
