import axios from "axios";
export const REQUEST_SENT = "REQUEST_SENT";
export const REQUEST_SUCCESS = "REQUEST_SUCCESS";
export const REQUEST_ERROR = "REQUEST_ERROR";
export const ADD = "ADD";
export const UPDATE = "UPDATE";
export const DELETE = "DELETE";
export const SORT = "SORT";
export const SEARCH = "SEARCH";

export const requestNotes = () => (dispatch) => {
	dispatch({ type: REQUEST_SENT });
	axios
		.get(`http://localhost:8000/api/notes`)
		.then((response) => {
			dispatch({ type: REQUEST_SUCCESS, payload: response.data.notes });
		})
		.catch((err) => {
			dispatch({ type: REQUEST_ERROR, err });
		});
};

export const addNote = (note) => (dispatch) => {
	dispatch({ type: ADD });
	axios
		.post(`http://localhost:8000/api/notes`, note)
		.then((response) => {
			dispatch({ type: ADD, id: response.data.success });
			return axios.get(`http://localhost:8000/api/notes`);
		})
		.then((response) => {
			dispatch({ type: REQUEST_SUCCESS, payload: response.data.notes });
		})
		.catch((err) => {
			dispatch({ type: REQUEST_ERROR, err });
		});
};

export const editNote = (note, id) => (dispatch) => {
	dispatch({ type: UPDATE });
	console.log(note);
	axios
		.put(`http://localhost:8000/api/notes/${id}`, note)
		.then((response) => {
			return axios.get(`http://localhost:8000/api/notes`);
		})
		.then((response) => {
			dispatch({ type: REQUEST_SUCCESS, payload: response.data.notes });
		})
		.catch((err) => {
			dispatch({ type: REQUEST_ERROR, err });
		});
};

export const deleteNote = (id) => (dispatch) => {
	dispatch({ type: DELETE });
	axios
		.delete(`http://localhost:8000/api/notes/${id}`)
		.then((response) => {
			return axios.get(`http://localhost:8000/api/notes`);
		})
		.then((response) => {
			dispatch({ type: REQUEST_SUCCESS, payload: response.data.notes });
		})
		.catch((err) => {
			dispatch({ type: REQUEST_ERROR, err });
		});
};

export const sorting = () => (dispatch) => {
	function compare(a, b) {
		const titleA = a.title.toUpperCase();
		const titleB = b.title.toUpperCase();
		let comparison = 0;
		if (titleA > titleB) {
			comparison = 1;
		} else if (titleA < titleB) {
			comparison = -1;
		}
		return comparison;
	}
	dispatch({ type: SORT, payload: compare });
};

export const searching = (searchTerm) => (dispatch) => {
	if (searchTerm === "") {
		requestNotes();
	} else {
		dispatch({ type: SEARCH, payload: searchTerm });
	}
};
