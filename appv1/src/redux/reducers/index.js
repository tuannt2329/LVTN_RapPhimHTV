import {combineReducers} from 'redux';
import loginIn from './authReducer';
import signupIn from './signupReducer';
import forgotIn from './forgotReducer';
const rootReducer = combineReducers({
  loginIn: loginIn,
  forgotIn: forgotIn,
});

export default rootReducer;
