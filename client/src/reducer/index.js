import {
  REQUEST_SENT,
  REQUEST_ERROR,
  REQUEST_SUCCESS,
  ADD,
  UPDATE,
  DELETE,
  SORT,
  SEARCH,
  TOGGLEMODE,
  TOGGLEMODAL,
  SETID,
  SETLOADING,
  GETNOTE,
  LOGOUT,
  LOGIN,
  REGISTER,
  CHANGEPASSWORD,
} from "../actions";

const initialState = {
  notes: [],
  filteredNotes: null,
  error: null,
  newId: "",
  newNote: [],
  message: null,
  mode: "list",
  modal: false,
  loading: true,
  currentNote: {},
  ticker: null
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_SENT:
      return {
        ...state,
        message: null,
        ticker: null,
      };
    case REQUEST_ERROR:
      return {
        ...state,
        error: action.payload,
        message: null,
        ticker: 'error',
      };
    case REQUEST_SUCCESS:
      return {
        ...state,
        error: null,
        notes: action.payload,
        message: null,
        ticker: null,
        loading: true,
      };

    case GETNOTE:
      return {
        ...state,
        message: null,
        currentNote: action.payload,
        loading: true,
        ticker: null,
      };
    case ADD:
      return {
        ...state,
        error: null,
        newId: action.id,
        notes: [...state.notes],
        message: "Note added successfully.",
        ticker: 'success',
        loading: false,
        currentNote: action.payload,
      };
    case UPDATE:
      return {
        ...state,
        error: null,
        notes: [...state.notes],
        message: "Note updated successfully.",
        ticker: "success",
        loading: false,
        currentNote: action.payload,
      };
    case DELETE:
      return {
        ...state,
        error: null,
        notes: action.payload,
        message: "Note deleted successfully.",
        ticker: "success",
        loading: false,
        currentNote: {},
      };
    case SORT:
      return {
        ...state,
        notes: state.notes.slice().sort(action.payload),
      };
    case SEARCH:
      return {
        ...state,
        loading: false,
        filteredNotes: action.payload,
      };
    case TOGGLEMODE:
      return {
        ...state,
        mode: action.payload,
      };
    case TOGGLEMODAL:
      return {
        ...state,
        modal: action.payload,
      };
    case SETID:
      return {
        ...state,
        loading: true,
        currentNote: {
          ...state.currentNote,
          _id: action.payload,
        },
      };
    case SETLOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        notes: [],
        filteredNotes: null,
        mode: "list",
        error: null,
        ticker: "success",
        message: action.payload,
      };
    case LOGIN:
      return {
        ...state,
        error: null,
        message: "Logged in successfully.",
        ticker: "success",
        loading: true,
      };
    case REGISTER:
      return {
        ...state,
        error: null,
        message: "Registration successful.",
        ticker: "success",
        loading: true,
      };
    case CHANGEPASSWORD:
      return {
        ...state,
        error: null,
        message: "Password changed successfully.",
        ticker: "success",
        loading: false,
      };

    default:
      return state;
  }
};
