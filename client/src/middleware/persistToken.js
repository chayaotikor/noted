import {LOGIN,
	REGISTER, CHANGEPASSWORD} from '../actions'
export const persistToken = store => next => action => {
    switch(action.type) {
    case LOGIN:
        localStorage.setItem('TOKEN', action.payload.token)
        localStorage.setItem('ID', action.payload._id)
        localStorage.setItem('EXP', action.payload.tokenExpiration)
        localStorage.setItem('EMAIL', action.payload.email)
        break;
    case REGISTER:
        localStorage.setItem('TOKEN', action.payload.token)
        localStorage.setItem('ID', action.payload._id)
        localStorage.setItem('EXP', action.payload.tokenExpiration)
        localStorage.setItem('EMAIL', action.payload.email)
        break;
    case CHANGEPASSWORD:
        localStorage['TOKEN'] =  action.payload.token
        localStorage['EXP']=  action.payload.tokenExpiration   
        break;
    default:
    break
    }
  
    return next(action);
  };