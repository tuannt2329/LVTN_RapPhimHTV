import * as types from '../../constants/index';

const initialState = {
  status: '',
  payload: null,
};
const forgotIn = (state = initialState, action) => {
  if (action.type === types.FORGOT) {
    return {
      ...state,
      status: 'FORGOT',
      error: action.error,
      info: action.info,
    };
  } else {
    console.log(state);
    return state;
  }
};
export default forgotIn;
