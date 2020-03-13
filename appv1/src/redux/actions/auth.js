import * as types from '../../constants/index';
// import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from '@react-native-community/async-storage';

function login(email, pass) {
  return dispatch => {
    console.log(email, '-', pass);
    // dispatch(isLogining());
    let result = fetch('http://192.168.1.41:8000/user/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: pass,
      }),
    })
      .then(res => res.json())
      .then(res => {
        if (res.error != '') {
          storeData(res.user.firstName);
          dispatch(loginSuccess(true, res));
        } else {
          dispatch(loginError(false));
        }
      })
      .catch(e => {
        dispatch(loginError(false));
      });
  };
}
const storeData = async res => {
  try {
    await AsyncStorage.setItem('username', res);
    console.log('saving', res);
  } catch (e) {
    console.log('error from action ', e);
  }
};
function isLogining() {
  return {
    type: types.LOGIN_IN_DOING,
  };
}
function loginSuccess(isSuccess, user) {
  console.log('success');
  return {
    type: types.LOGIN_IN_DONE,
    user: user,
  };
}

function loginError(isSuccess) {
  console.log('error');
  return {
    type: types.LOGIN_IN_ERROR,
  };
}
function logout() {
  console.log('logout');
  return {
    type: types.LOGOUT,
  };
}

export {login, logout};
