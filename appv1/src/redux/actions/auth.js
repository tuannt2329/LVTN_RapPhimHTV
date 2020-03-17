import * as types from '../../constants/index';
// import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from '@react-native-community/async-storage';

function login(email, pass) {
  return dispatch => {
    console.log(email, '-', pass);
    // dispatch(isLogining());
    let result = fetch('http://192.168.56.1:8000/user/login/', {
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

function signup(email, pass, firstname, lastname, gender) {
  return dispatch => {
    console.log(email, '-', pass);
    // dispatch(isLogining());
    let result = fetch('http://192.168.56.1:8000/user/signup/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: pass,
        firstName: firstname,
        lastName: lastname,
        gender: gender,

      }),
    })
      .then(res => res.json())
      .then(res => {
        if (res.error !== '') {
          dispatch(signupSuccess(res));
        } else {
          dispatch(signupError(false));
        }
      })
      .catch(e => {
        dispatch(signupError(false));
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
  console.log('login success');
  return {
    type: types.LOGIN_IN_DONE,
    user: user,
  };
}
function loginError(isSuccess) {
  console.log('Login error');
  return {
    type: types.LOGIN_IN_ERROR,
  };
}
function signupSuccess(user) {
  console.log('sign success');
  return {
    type: types.SIGN_UP_DONE,
  };
}
function signupError(isSuccess) {
  console.log('sign error');
  return {
    types: types.SIGN_UP_ERROR,
  };
}

function logout() {
  console.log('logout');
  AsyncStorage.removeItem('username');
  return {
    type: types.LOGOUT,
  };
}

export {login, logout, signup};
