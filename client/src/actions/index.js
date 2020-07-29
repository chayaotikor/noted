import axios from "axios";
import history from '../history'
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
      if(err.response){
        dispatch({ type: REQUEST_ERROR, payload: err.response.data.errors[0].message});
      }
      else {
        dispatch({ type: REQUEST_ERROR, payload: err});
      }
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
      if(err.response){
        dispatch({ type: REQUEST_ERROR, payload: err.response.data.errors[0].message});
      }
      else {
        dispatch({ type: REQUEST_ERROR, payload: err});
      }	  });
  };

export const requestNotes = () => (dispatch) => {
  dispatch({ type: REQUEST_SENT });
  axios({
    method: "post",
    baseURL: "http://localhost:8000/graphql",
    headers: {
      Authorization: `${localStorage.getItem('TOKEN')}`,
    },
    data: {
      query: `
      {
        getAllNotes {
          _id
          title
          textBody
          updatedAt
        }
      }
      `
    }
  })
    .then((response) => {
      dispatch({ type: REQUEST_SUCCESS, payload: response.data.data.getAllNotes });
    })
    .catch((err) => {
      if(err.response){
        dispatch({ type: REQUEST_ERROR, payload: err.response.data.errors[0].message});
      }
      else {
        dispatch({ type: REQUEST_ERROR, payload: err});
      }
    });
};

export const addNote = (note) => (dispatch) => {
  dispatch({ type: REQUEST_SENT });
  axios({
    method: "post",
    baseURL: "http://localhost:8000/graphql",
    headers: {
      Authorization: `${localStorage.getItem('TOKEN')}`,
    },
    data: {
      query: `
       mutation {
        addNote(content: {title: "${note.title}", textBody: "${note.textBody}"}, userId: "${localStorage.getItem('ID')}" ){
        _id
        title
        textBody
        createdBy{
          email
        }
        updatedAt
        }
    }
      `
    }
  })
    .then((response) => {
      console.log(response)
      dispatch({ type: ADD, payload: response.data.data.addNote._id });
    })
    .catch((err) => {
      if(err.response){
        dispatch({ type: REQUEST_ERROR, payload: err.response.data.errors[0].message});
      }
      else {
        dispatch({ type: REQUEST_ERROR, payload: err});
      }
    });

};

export const editNote = (note) => (dispatch) => {
  dispatch({ type: REQUEST_SENT });
  axios({
    method: "post",
    baseURL: "http://localhost:8000/graphql",
    headers: {
      Authorization: `${localStorage.getItem('TOKEN')}`,
    },
    data: {
      query: `
       mutation {
        editNote(content: {title: "${note.title}", textBody: "${note.textBody}"}, noteId: "${note._id}" ){
        _id
        title
        textBody
        createdBy{
          email
        }
        updatedAt
        }
    }
      `
    }
  })
    .then((response) => {
      console.log(response)
      dispatch({ type: UPDATE, payload: response.data.data.editNote });
    })
    .catch((err) => {
      if(err.response){
        dispatch({ type: REQUEST_ERROR, payload: err.response.data.errors[0].message});
      }
      else {
        dispatch({ type: REQUEST_ERROR, payload: err});
      }
    });

};

export const deleteNote = (noteId) => (dispatch) => {
  console.log(noteId)
  dispatch({ type: REQUEST_SENT });
  axios({
    method: "post",
    baseURL: "http://localhost:8000/graphql",
    headers: {
      Authorization: `${localStorage.getItem('TOKEN')}`,
    },
    data: {
      query: `
      mutation {
        deleteNote(noteId: "${noteId}", userId: "${localStorage.getItem('ID')}" )
    }
      `
    }
  })
    .then((response) => {
      console.log(response)
      dispatch({ type: DELETE, payload: response.data.data.deleteNote });
    })
    .catch((err) => {
      if(err.response){
        dispatch({ type: REQUEST_ERROR, payload: err.response.data.errors[0].message});
      }
      else {
        dispatch({ type: REQUEST_ERROR, payload: err});
      }
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
