import {combineReducers} from 'redux';
import loginIn from './authReducer';

const rootReducer = combineReducers({
  loginIn: loginIn,
});

export default rootReducer;
