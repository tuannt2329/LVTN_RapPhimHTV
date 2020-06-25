import * as types from '../../constants/index';
// import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from '@react-native-community/async-storage';

function login(email, pass) {
  return dispatch => {
    console.log(email, '-', pass);
    // dispatch(isLogining());
    let result = fetch(`${types.API}user/login/`, {
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
        if (res.error !== '') {
          storeData(res.user.email);
          dispatch(loginSuccess(true, res));
        } else {
          dispatch(loginError(false));
        }
      })
      .catch(e => {
        console.log(e);
        dispatch(loginError(false));
      });
  };
}

// function signup(email, pass, firstname, lastname, gender) {
//   return dispatch => {
//     console.log(email, '-', pass, '-', firstname, '-', lastname, '-', gender);
//     // dispatch(isLogining());
//     let result = fetch('http://192.168.56.1:8000/user/signup/', {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         email: email,
//         password: pass,
//         firstName: firstname,
//         lastName: lastname,
//         gender: gender,
//       }),
//     })
//       .then(res => res.json())
//       .then(res => {
//         if (res.content === 'Account registration successful') {
//           console.log(res.content);
//           dispatch(signupSuccess(res));
//         } else {
//           dispatch(signupError(res.error));
//         }
//       })
//       .catch(e => {
//         console.log('catch sign up');
//         dispatch(signupError(false));
//       });
//   };
// }
function forgotPassword(email) {
  return dispatch => {
    console.log('forgot', email);
    // dispatch(isLogining());
    let result = fetch(`${types.API}user/verification/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        dispatch(forgot(res));
      })
      .catch(e => {
        console.log('catch forgot');
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
// function signupSuccess(user) {
//   console.log('sign success');
//   return {
//     type: types.SIGN_UP_DONE,
//   };
// }
// function signupError(error) {
//   console.log('sign error');
//   return {
//     type: types.SIGN_UP_ERROR,
//     error: error,
//   };
// }

function forgot(ress) {
  console.log('forgot');
  return {
    type: types.FORGOT,
    error: ress,
  };
}
function logout() {
  console.log('logout');
  AsyncStorage.removeItem('username');
  return {
    type: types.LOGOUT,
  };
}

export {login, logout, forgotPassword};
