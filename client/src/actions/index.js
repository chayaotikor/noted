import axios from "axios";
import {useHistory} from 'react-router-dom'
export const REGISTER = "REGISTER";
export const LOGIN = "LOGIN";
export const REQUEST_SENT = "REQUEST_SENT";
export const REQUEST_SUCCESS = "REQUEST_SUCCESS";
export const REQUEST_ERROR = "REQUEST_ERROR";
export const ADD = "ADD";
export const UPDATE = "UPDATE";
export const DELETE = "DELETE";
export const SORTASC = "SORTASC";
export const SORTDSC = "SORTDSC";
export const SEARCH = "SEARCH";



export const login = ({ email, password }) => (dispatch) => {
  dispatch({ type: REQUEST_SENT });
  axios({
    method: "post",
    baseURL: "http://localhost:8000/graphql",
    data: {
      query: `
		query {
			login(email: "${email}", password: "${password}"){	
				_id,
				email,
				token,
				tokenExpiration
			}
		}
		`,
    },
  })
    .then((response) => {
      dispatch({ type: LOGIN, payload: response.data.data.login });
    })
    .catch((err) => {
		console.log(err)
      dispatch({ type: REQUEST_ERROR, payload: err });
    });
};

export const register = ({ email, password }) => (dispatch) => {
	dispatch({ type: REQUEST_SENT });
	axios({
	  method: "post",
	  baseURL: "http://localhost:8000/graphql",
	  data: {
		query: `
		mutation {
			register(credentials: {email: "${email}", password: "${password}"}){
			  _id
			  email
			  token
			  tokenExpiration
			}
		  }
		  `,
	  },
	})
	  .then((response) => {
		dispatch({ type: REGISTER, payload: response.data.data.register });
	  })
	  .catch((err) => {
		  console.log(err)
		dispatch({ type: REQUEST_ERROR, payload: err });
	  });
  };

export const requestNotes = () => (dispatch) => {
  dispatch({ type: REQUEST_SENT });
  axios({
    method: "post",
    baseURL: "http://localhost:8000/graphql",
    headers: {
      authorization: localStorage.getItem('TOKEN'),
    },
    data: {
      query: `
      {
        getAllNotes {
          createdBy {
            _id
            email
            createdNotes {
              title
              textBody
              updatedAt
              createdBy {
                email
              }
            }
          }
        }
      }
      `
    }
  })
    .then((response) => {
      console.log(response.data.data)
      dispatch({ type: REQUEST_SUCCESS, payload: response.data.data.notes });
    })
    .catch((err) => {
      dispatch({ type: REQUEST_ERROR, err });
    });
};

export const addNote = (note) => (dispatch) => {
  dispatch({ type: ADD });
  axios
    .post(`http://localhost:8000/graphql`, note)
    .then((response) => {
      dispatch({ type: ADD, id: response.data.success });
      return axios.get(`http://localhost:8000/graphql`);
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
    .put(`http://localhost:8000/graphql/`, note)
    .then((response) => {
      return axios.get(`http://localhost:8000/graphql`);
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
    .delete(`http://localhost:8000/graphql/`)
    .then((response) => {
      return axios.get(`http://localhost:8000/graphql`);
    })
    .then((response) => {
      dispatch({ type: REQUEST_SUCCESS, payload: response.data.notes });
    })
    .catch((err) => {
      dispatch({ type: REQUEST_ERROR, err });
    });
};

export const sortAscending = () => (dispatch) => {
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
  dispatch({ type: SORTASC, payload: compare });
};
export const sortDescending = () => (dispatch) => {
  function compare(a, b) {
    const titleA = a.title.toUpperCase();
    const titleB = b.title.toUpperCase();
    let comparison = 0;
    if (titleA < titleB) {
      comparison = 1;
    } else if (titleA > titleB) {
      comparison = -1;
    }
    return comparison;
  }
  dispatch({ type: SORTDSC, payload: compare });
};

export const searching = (searchTerm) => (dispatch) => {
  if (searchTerm === "") {
    requestNotes();
  } else {
    dispatch({ type: SEARCH, payload: searchTerm });
  }
};
