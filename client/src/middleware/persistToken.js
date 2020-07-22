import {LOGIN,
	REGISTER} from '../actions'
export const persistToken = store => next => action => {
    switch(action.type) {
    case LOGIN:
        localStorage.setItem('TOKEN', action.payload.token)
        localStorage.setItem('ID', action.payload._id)
        localStorage.setItem('EXP', action.payload.tokenExpiration)
        break;
    case REGISTER:
        localStorage.setItem('TOKEN', action.payload.token)
        localStorage.setItem('ID', action.payload._id)
        localStorage.setItem('EXP', action.payload.tokenExpiration)
        break;
    }
  
    return next(action);
  };