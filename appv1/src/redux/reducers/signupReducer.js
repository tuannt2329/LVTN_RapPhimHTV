import * as types from '../../constants/index';

const initialState = {
  status: '',
  error: null,
};
const signupIn = (state = initialState, action) => {
  switch (action.type) {
    // case types.LOGIN_IN_DOING:
    //   return {
    //     ...state,
    //     status: 'DOING',
    //     isSuccess: false,
    //     user: null,
    //   }
    //   break;

    case types.SIGN_UP_DONE:
      return {
        status: 'SIGN_UP_DONE',
        error: null,
      };
    case types.SIGN_UP_ERROR:
      return {
        status: 'SIGN_UP_ERROR',
        error: action.error,
      };
    case types.RESET_REGISTER:
      return {
        status: '',
        error: null,
      };
    default:
      console.log(state);
      return state;
  }
};
export default signupIn;
