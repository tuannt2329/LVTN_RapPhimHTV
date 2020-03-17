import * as types from '../../constants/index';

const initialState = {
  status: '',
  isSuccess: false,
  user: null,
};
const loginIn = (state = initialState, action) => {
  switch (action.type) {
    // case types.LOGIN_IN_DOING:
    //   return {
    //     ...state,
    //     status: 'DOING',
    //     isSuccess: false,
    //     user: null,
    //   }
    //   break;
    case types.LOGIN_IN_DONE:
      return {
        ...state,
        status: 'OK',
        isSuccess: true,
        user: action.user,
      };
    case types.LOGIN_IN_ERROR:
      return {
        ...state,
        status: 'ERROR',
        isSuccess: false,
        user: null,
      };
    case types.LOGOUT:
      return {
        status: '',
        isSuccess: false,
        user: null,
      };
    case types.SIGN_UP_DONE:
      return {
        ...state,
        status: 'SIGN_UP_DONE',
        isSuccess: true,
      };
    case types.SIGN_UP_ERROR:
      return {
        ...state,
        status: 'SIGN_UP_ERROR',
        isSuccess: false,
      };
    default:
      console.log(state);
      return state;
  }
};
export default loginIn;
