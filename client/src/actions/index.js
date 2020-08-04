import axios from "axios";
export const REGISTER = "REGISTER";
export const TOGGLEMODE = "TOGGLEMODE";
export const TOGGLEMODAL = "TOGGLEMODAL";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const REQUEST_SENT = "REQUEST_SENT";
export const REQUEST_SUCCESS = "REQUEST_SUCCESS";
export const REQUEST_ERROR = "REQUEST_ERROR";
export const ADD = "ADD";
export const UPDATE = "UPDATE";
export const DELETE = "DELETE";
export const SORT = "SORT";
export const SEARCH = "SEARCH";
export const SETID = "SETID";
export const GETNOTE = "GETNOTE";
export const SETLOADING = "SETLOADING";

export const login = ({ email, password }) => (dispatch) => {
  dispatch({ type: REQUEST_SENT });
  axios({
    method: "post",
    baseURL: `${process.env.REACT_APP_DB_URL}`,
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
      if (err.response) {
        dispatch({
          type: REQUEST_ERROR,
          payload: err.response.data.errors[0].message,
        });
      } else {
        dispatch({ type: REQUEST_ERROR, payload: err });
      }
    });
};

export const register = ({ email, password }) => (dispatch) => {
  dispatch({ type: REQUEST_SENT });
  axios({
    method: "post",
    baseURL: `${process.env.REACT_APP_DB_URL}`,
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
      if (err.response) {
        dispatch({
          type: REQUEST_ERROR,
          payload: err.response.data.errors[0].message,
        });
      } else {
        dispatch({ type: REQUEST_ERROR, payload: err });
      }
    });
};

export const requestNotes = () => (dispatch) => {
  dispatch({ type: REQUEST_SENT });
  axios({
    method: "post",
    baseURL: `${process.env.REACT_APP_DB_URL}`,
    headers: {
      Authorization: `${localStorage.getItem("TOKEN")}`,
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
      `,
    },
  })
    .then((response) => {
      dispatch({
        type: REQUEST_SUCCESS,
        payload: response.data.data.getAllNotes,
      });
    })
    .catch((err) => {
      if (err.response) {
        dispatch({
          type: REQUEST_ERROR,
          payload: err.response.data.errors[0].message,
        });
      } else {
        dispatch({ type: REQUEST_ERROR, payload: err });
      }
    });
};

export const getNote = (id) => (dispatch) => {
  dispatch({ type: REQUEST_SENT });
  axios({
    method: "post",
    baseURL: `${process.env.REACT_APP_DB_URL}`,
    headers: {
      Authorization: `${localStorage.getItem("TOKEN")}`,
    },
    data: {
      query: `
      {
        getNote(noteId: "${id}") {
          _id
          title
          textBody
          updatedAt
        }
      }
      `,
    },
  })
    .then((response) => {
      dispatch({
        type: GETNOTE,
        payload: response.data.data.getNote,
      });
    })
    .catch((err) => {
      if (err.response) {
        dispatch({
          type: REQUEST_ERROR,
          payload: err.response.data.errors[0].message,
        });
      } else {
        dispatch({ type: REQUEST_ERROR, payload: err });
      }
    });
};

export const addNote = (note) => (dispatch) => {
  dispatch({ type: REQUEST_SENT });
  axios({
    method: "post",
    baseURL: `${process.env.REACT_APP_DB_URL}`,
    headers: {
      Authorization: `${localStorage.getItem("TOKEN")}`,
    },
    data: {
      query: `
       mutation {
        addNote(content: {title: "${note.title}", textBody: "${
        note.textBody
      }"}, userId: "${localStorage.getItem("ID")}" ){
        _id
        title
        textBody
        updatedAt
        }
    }
      `,
    },
  })
    .then((response) => {
      console.log(response);
      dispatch({ type: ADD, payload: response.data.data.addNote });
    })
    .catch((err) => {
      if (err.response) {
        dispatch({
          type: REQUEST_ERROR,
          payload: err.response.data.errors[0].message,
        });
      } else {
        dispatch({ type: REQUEST_ERROR, payload: err });
      }
    });
};

export const editNote = (note) => (dispatch) => {
  dispatch({ type: REQUEST_SENT });
  axios({
    method: "post",
    baseURL: `${process.env.REACT_APP_DB_URL}`,
    headers: {
      Authorization: `${localStorage.getItem("TOKEN")}`,
    },
    data: {
      query: `
       mutation {
        editNote(content: {title: "${note.title}", textBody: "${note.textBody}"}, noteId: "${note._id}" ){
        _id
        title
        textBody
        updatedAt
        }
    }
      `,
    },
  })
    .then((response) => {
      console.log(response);
      dispatch({ type: UPDATE, payload: response.data.data.editNote });
    })
    .catch((err) => {
      if (err.response) {
        dispatch({
          type: REQUEST_ERROR,
          payload: err.response.data.errors[0].message,
        });
      } else {
        dispatch({ type: REQUEST_ERROR, payload: err });
      }
    });
};

export const deleteNote = (noteId) => (dispatch) => {
  console.log(noteId);
  dispatch({ type: REQUEST_SENT });
  axios({
    method: "post",
    baseURL: `${process.env.REACT_APP_DB_URL}`,
    headers: {
      Authorization: `${localStorage.getItem("TOKEN")}`,
    },
    data: {
      query: `
      mutation {
        deleteNote(noteId: "${noteId}", userId: "${localStorage.getItem(
        "ID"
      )}" ){
        createdNotes{
          _id
          title
          textBody
          updatedAt
        }
      }
    }
      `,
    },
  })
    .then((response) => {
      dispatch({
        type: DELETE,
        payload: response.data.data.deleteNote.createdNotes,
      });
    })
    .catch((err) => {
      if (err.response) {
        dispatch({
          type: REQUEST_ERROR,
          payload: err.response.data.errors[0].message,
        });
      } else {
        dispatch({ type: REQUEST_ERROR, payload: err });
      }
    });
};

export const sort = (type) => (dispatch) => {
if(type === 'ascending'){
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
} 

if (type === 'descending'){
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
  dispatch({ type: SORT, payload: compare });
}
 if(type === 'newest' ){
  function compare(a, b) {
    const dateA = a.updatedAt;
    const dateB = b.updatedAt;
    let comparison = 0;
    if (dateA < dateB) {
      comparison = 1;
    } else if (dateA > dateB) {
      comparison = -1;
    }
    return comparison;
  }
  dispatch({ type: SORT, payload: compare });
 }
 if(type === 'oldest' ){
  function compare(a, b) {
    const dateA = a.updatedAt;
    const dateB = b.updatedAt;
    let comparison = 0;
    if (dateA > dateB) {
      comparison = 1;
    } else if (dateA < dateB) {
      comparison = -1;
    }
    return comparison;
  }
  dispatch({ type: SORT, payload: compare });
 }
}

export const searching = (list) => (dispatch) => {
  dispatch({ type: SEARCH, payload: list });
};

export const toggleMode = (mode) => (dispatch) => {
  dispatch({ type: TOGGLEMODE, payload: mode });
};
export const toggleModal = (bool) => (dispatch) => {
  dispatch({ type: TOGGLEMODAL, payload: bool });
};
export const setId = (id) => (dispatch) => {
  dispatch({ type: SETID, payload: id });
};
export const setLoading = (bool) => (dispatch) => {
  dispatch({ type: SETLOADING, payload: bool });
};

export const logout = (message) => (dispatch) => {
  localStorage.clear();
  dispatch({type: LOGOUT, payload: message})
}
