import * as types from '../../constants/index';

const initialState = {
  status: '',
  isSuccess: false,
  user: null,
};
export default function loginIn(state = initialState, action) {
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
      break;
    case types.LOGIN_IN_ERROR:
      return {
        ...state,
        status: 'ERROR',
        isSuccess: false,
        user: null,
      };
      break;
    default:
      console.log(state);
      return state;
  }
}
