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
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_SENT:
      return {
        ...state,
        message: null,
      };
    case REQUEST_ERROR:
      return {
        ...state,
        error: action.payload,
        message: null,
      };
    case REQUEST_SUCCESS:
      return {
        ...state,
        error: null,
        notes: action.payload,
        message: null,
        loading: true,
      };

    case GETNOTE:
      return {
        ...state,
        message: null,
        currentNote: action.payload,
        loading: true,
      };
    case ADD:
      return {
        ...state,
        error: null,
        newId: action.id,
        notes: [...state.notes],
        message: "Note added successfully.",
        loading: false,
        currentNote: action.payload,
      };
    case UPDATE:
      return {
        ...state,
        error: null,
        notes: [...state.notes],
        message: "Note updated successfully.",
        loading: false,
        currentNote: action.payload,
      };
    case DELETE:
      return {
        ...state,
        error: null,
        notes: action.payload,
        message: "Note deleted successfully.",
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
        mode: 'list',
        message: action.payload,
      };
    case LOGIN:
      return {
        ...state,
        message: "Logged in successfully.",
        loading: true
      };
    case REGISTER:
      return {
        ...state,
        message: "Registration successful.",
        loading: true
      };
    case CHANGEPASSWORD:
      return {
        ...state,
        message: "Password changed successfully.",
        loading: false
      };

    default:
      return state;
  }
};
