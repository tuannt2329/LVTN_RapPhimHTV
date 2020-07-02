import React, {useEffect, useState} from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import CustomHeader from '../components/CustomHeader';
import {
  Animated,
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ButtonGroup, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import styless, {colors} from '../constants/index.style';
import {useDispatch, useSelector} from 'react-redux';
import * as LoginAction from '../redux/actions/auth';
import {CommonActions} from '@react-navigation/native';
import * as types from '../constants';
import DotIndicator from '../components/indicator/DotIndicator';
import {theme} from '../components/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

const window = Dimensions.get('window');

const IMAGE_HEIGHT = 100;
const IMAGE_HEIGHT_SMALL = 0;
function DetailAccount({navigation}) {
  const user = useSelector(state => state.loginIn.user);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const [email, setEmail] = useState(user.user.email);
  const [pass, setPass] = useState(null);
  const [oldpass, setOldPass] = useState(null);
  const [newPass, setNewPass] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [gender, setGender] = useState(null);
  const [error, setError] = useState('');
  const [error1, setError1] = useState('');
  const [infoUser, setInfoUser] = useState(null);
  const [done, setDone] = useState(null);
  // const [fromGender, setFromGender] = useState(user.user.gender);
  const [showPassword, setShowPassword] = useState(true);
  const [showPassword1, setShowPassword1] = useState(true);
  const [showPassword2, setShowPassword2] = useState(true);
  const [userInfo, setUserInfo] = useState(false);
  // loading sử dụng cho indicator
  const [loading, setLoading] = useState(false);
  const [textSuccess, setTextSuccess] = useState(false);
  const buttons = ['Nam', 'Nữ', 'Khác'];
  const buttons2 = ['Đổi thông tin', 'Đổi mật khẩu'];
  const [typeUpdate, setTypeUpdate] = useState(1);
  const inputOldPass = React.createRef();
  const inputPass = React.createRef();
  const inputNewPass = React.createRef();
  const [hashPass, setHassPass] = useState(null);
  // state cho verify password
 

  navigation.setOptions({
    title: 'Cập nhật thông tin',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerRight: () => (
      <TouchableOpacity
        onPress={async () =>
          await navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{name: 'Home'}],
            }),
          )
        }>
        <Entypo name={'home'} size={40} color="black" />
      </TouchableOpacity>
    ),
  });

  const IMAGE_HEIGHT = 100;
  const IMAGE_HEIGHT_SMALL = 0;
  const imageHeight = new Animated.Value(IMAGE_HEIGHT);
  const keyboardDidShow = event => {
    Animated.timing(imageHeight, {
      toValue: IMAGE_HEIGHT_SMALL,
    }).start();
  };

  const keyboardDidHide = event => {
    Animated.timing(imageHeight, {
      toValue: IMAGE_HEIGHT,
    }).start();
  };

  // cập nhật gender dựa trên selecteđIndex
  useEffect(() => {
    if (selectedIndex === 1) {
      setGender('female');
      console.log(gender);
    }
    if (selectedIndex === 0) {
      setGender('male');
      console.log(gender);
    }
    if (selectedIndex === 2) {
      setGender('other');
      console.log(gender);
    }
  }, [selectedIndex, gender]);

  // keyboard event
  useEffect(() => {
    let keyboardWillShowSub = Keyboard.addListener(
      'keyboardDidShow',
      keyboardDidShow,
    );
    let keyboardWillHideSub = Keyboard.addListener(
      'keyboardDidHide',
      keyboardDidHide,
    );
    return function cleanup() {
      keyboardWillShowSub.remove();
      keyboardWillHideSub.remove();
    };
  });

  useEffect(() => {
    setEmail(user.user.email);

    async function a() {
      await fetch(`${types.API}user/find/`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.user.email,
        }),
      })
        .then(res => res.json())
        .then(async users => {
          await setUserInfo(users.user);
          if (users.user[0].gender === 'male') {
            console.log('male');
            console.log(selectedIndex);
            await setSelectedIndex(0);
          }
          if (users.user[0].gender === 'female') {
            console.log('female');
            console.log(selectedIndex);
            await setSelectedIndex(1);
          }
          if (users.user[0].gender === 'other') {
            console.log(selectedIndex);
            console.log('other');
            await setSelectedIndex(2);
          }
          await setFirstName(users.user[0].firstName);
          await setLastName(users.user[0].lastName);
        })
        .catch(e => {
          console.log('catch get list film from home');
          console.log(e);
        });
    }
    a();
  }, []);

  function toggleSwitch() {
    setShowPassword(!showPassword);
  }
  function toggleSwitch1() {
    setShowPassword1(!showPassword1);
  }
  function toggleSwitch2() {
    setShowPassword2(!showPassword2);
  }

  // fucnc verify login

  async function login(email, pass) {
    // dispatch(isLogining());
    let r = await fetch(`${types.API}user/login/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: pass,
      }),
    });
    let res = await r.json();

    if (!res.error) {
      await setHassPass(res.user.password);
      // await setStatusLogin(true);
      fetch(`${types.API}user/updateInfo/`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: hashPass,
          firstName: firstName,
          lastName: lastName,
          gender: gender,
        }),
      })
        .then(res => res.json())
        .then(async res => {
          if (res.error) {
            // if (res.error === 'Password is required.') {
            //   setError('Vui lòng nhập Mật Khẩu');
            // }
            if (res.error === 'first name is required.') {
              await setError('Vui lòng nhập Họ');
            }
            if (res.error === 'last name is required.') {
              await setError('Vui Lòng nhập Tên');
            }
            // setError('Email đã đăng ký');s
            // setLoading(false);
          } else {
            if (res.content === 'Changed personal details') {
              // await setOldPass('');
              await inputOldPass.current.clear();
              await setError('Cập Nhật Thành Công');
              await setOldPass('');
            }
          }
        })
        .catch(e => {
          console.log('catch sign up');
        });
    } else {
      await setError('Mật Khẩu Không Chính Xác');
    }
  }

  async function login1(email, passs) {
    // dispatch(isLogining());
    let call = await fetch(`${types.API}user/login/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: passs,
      }),
    });
    let res = await call.json();
    if (!res.error) {
      fetch(`${types.API}user/updateInfo/`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: newPass,
          firstName: firstName,
          lastName: lastName,
          gender: gender,
        }),
      })
        .then(res => res.json())
        .then(async res => {
          console.log(res.content);
          if (res.content === 'Changed password') {
            // await inputOldPass.current.clear();
            await inputPass.current.clear();
            await inputNewPass.current.clear();
            await setError1('Đổi Mật Khẩu Thành Công');
            await setNewPass('');
            await setPass('');
            // await setStatusLogin1(null);
          }
        })
        .catch(e => {
          console.log('catch update pass', e);
        });
    } else {
      await setError1('Mật khẩu cũ không chính xác');
    }
  }

  // func update info
  async function doUpdateInfo(e) {
    // e.preventDefault();
    if (oldpass === null || oldpass === '') {
      await setError('Nhập mật khẩu để thực hiện');
    } else {
      await login(email, oldpass);
    }
  }

  async function doUpdatePass() {
    if (pass === null || pass === '') {
      await setError1('Nhập mật khẩu cũ');
    } else if (newPass === null || newPass === '') {
      await setError1('Nhập mật khẩu mới');
    } else if (newPass.length < 6) {
      await setError1('Mật khẩu mới phải hơn 6 ký tự');
    } else {
      await login1(email, pass);
      // if (sttLogin1 === true) {

      // } else if (sttLogin1 === false && pass.length > 0) {
      // }
    }
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      {/*<CustomHeader isHome="false" title="Đăng Ký" navigation={navigation} />*/}
      <KeyboardAvoidingView style={styles.container} behavior="height">
        {/*{this.gradient}*/}
        <LinearGradient
          colors={[
            colors.background1Login,
            colors.background2Login,
            colors.background3Login,
          ]}
          startPoint={{x: 1, y: 0}}
          endPoint={{x: 0, y: 1}}
          style={styless.gradient}
        />
        <Animated.Text
          style={{
            color: '#ff7c7c',
            fontWeight: 'bold',
            fontSize: 40,
            width: '100%',
            textAlign: 'center',
            marginBottom: 0,
            height: imageHeight,
          }}>
          HTV
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              fontStyle: 'italic',
            }}>
            cinemas
          </Text>
        </Animated.Text>
        {/* <View style={{...styles.inputView}}> */}
        <ButtonGroup
          selectedIndex={typeUpdate}
          onPress={setTypeUpdate}
          buttons={buttons2}
          containerStyle={{
            height: 35,
            borderRadius: 25,
            width: '80%',
            marginBottom: 20,
            backgroundColor: '#fde0f2',
          }}
        />
        {/* </View> */}
        {typeUpdate === 0 ? (
          <>
            <View style={{...styles.inputView}}>
              <Input
                placeholder="Email..."
                style={styles.inputText}
                value={email}
                editable={false}
                selectTextOnFocus={false}
                leftIcon={<Icon name="user" size={24} color="black" />}
                placeholderTextColor="#003f5c"
                onChangeText={text => {
                  setEmail(text);
                }}
              />
            </View>
            <View style={styles.inputView}>
              <Input
                placeholder="Mật khẩu cũ..."
                secureTextEntry={showPassword1}
                style={styles.inputText}
                ref={inputOldPass}
                leftIcon={<Icon name="key" size={24} color="black" />}
                placeholderTextColor="#003f5c"
                onChangeText={async text => {
                  await setOldPass(text);
                  setError('');
                }}
                rightIcon={
                  // <Switch onValueChange={toggleSwitch} value={!showPassword} />
                  <TouchableOpacity onPress={toggleSwitch1}>
                    {showPassword1 ? (
                      <AntDesign name="eyeo" size={25} />
                    ) : (
                      <AntDesign name="eye" size={25} color={'red'} />
                    )}
                  </TouchableOpacity>
                }
              />
            </View>

            <View style={styles.inputView}>
              <Input
                placeholder="Họ..."
                style={styles.inputText}
                value={firstName}
                leftIcon={<Icon name="user" size={24} color="black" />}
                placeholderTextColor="#003f5c"
                onChangeText={text => {
                  setFirstName(text);
                  setError('');
                }}
              />
            </View>
            <View style={styles.inputView}>
              <Input
                placeholder="Tên..."
                style={styles.inputText}
                value={lastName}
                leftIcon={<Icon name="user" size={24} color="black" />}
                placeholderTextColor="#003f5c"
                onChangeText={text => {
                  setLastName(text);
                  setError('');
                }}
              />
            </View>
            {/*<View style={styles.buttonGroup}>*/}
            <View>
              {selectedIndex !== null ? (
                <ButtonGroup
                  selectedIndex={selectedIndex}
                  onPress={setSelectedIndex}
                  buttons={buttons}
                  containerStyle={{
                    height: 50,
                    borderRadius: 25,
                    width: '80%',
                    backgroundColor: '#fde0f2',
                  }}
                />
              ) : null}
            </View>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                fontStyle: 'italic',
                color: 'red',
              }}>
              {error !== '' ? error : ''}
            </Text>
            <View
              style={[
                styles.loginBtn,
                {
                  borderColor: '#ddd',
                  borderBottomWidth: 0,

                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                  elevation: 3,

                  borderRadius: 20,
                  marginRight: 40,
                  marginLeft: 40,
                  marginTop: 10,
                  paddingTop: 5,
                  paddingBottom: 10,
                  borderWidth: 1,
                  overflow: 'hidden',
                },
              ]}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                startPoint={{x: 1, y: 0}}
                endPoint={{x: 0, y: 1}}
                // colors={['#0AC4BA', '#2BDA8E']}
                colors={['#d53369', '#cbad6d']}
                style={styless.gradient}
              />
              <TouchableOpacity
                // style={styles.loginBtn}
                onPress={event => doUpdateInfo(event)}>
                <Text style={styles.loginText}>CẬP NHẬT</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <View style={{...styles.inputView}}>
              <Input
                placeholder="Email..."
                style={styles.inputText}
                value={email}
                editable={false}
                selectTextOnFocus={false}
                leftIcon={<Icon name="user" size={24} color="black" />}
                placeholderTextColor="#003f5c"
                onChangeText={text => setEmail(text)}
              />
            </View>
            <View style={styles.inputView}>
              <Input
                placeholder="Mật khẩu cũ..."
                secureTextEntry={showPassword}
                style={styles.inputText}
                ref={inputPass}
                leftIcon={<Icon name="key" size={24} color="black" />}
                placeholderTextColor="#003f5c"
                onChangeText={async text => {
                  await setPass(text);
                  setError1('');
                }}
                rightIcon={
                  <TouchableOpacity onPress={toggleSwitch}>
                    {showPassword ? (
                      <AntDesign name="eyeo" size={25} />
                    ) : (
                      <AntDesign name="eye" size={25} color={'red'} />
                    )}
                  </TouchableOpacity>
                }
              />
            </View>
            <View style={styles.inputView}>
              <Input
                placeholder=" Mật khẩu mới..."
                secureTextEntry={showPassword2}
                style={styles.inputText}
                ref={inputNewPass}
                leftIcon={<Icon name="lock" size={24} color="black" />}
                placeholderTextColor="#003f5c"
                onChangeText={async text => {
                  await setNewPass(text);
                  setError1('');
                }}
                rightIcon={
                  // <Switch onValueChange={toggleSwitch} value={!showPassword} />
                  <TouchableOpacity onPress={toggleSwitch2}>
                    {showPassword2 ? (
                      <AntDesign name="eyeo" size={25} />
                    ) : (
                      <AntDesign name="eye" size={25} color={'red'} />
                    )}
                  </TouchableOpacity>
                }
              />
            </View>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                fontStyle: 'italic',
                color: 'red',
              }}>
              {error1 !== '' ? error1 : ''}
            </Text>
            <View
              style={[
                styles.loginBtn,
                {
                  borderColor: '#ddd',
                  borderBottomWidth: 0,

                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                  elevation: 3,

                  borderRadius: 20,
                  marginRight: 40,
                  marginLeft: 40,
                  marginTop: 10,
                  paddingTop: 5,
                  paddingBottom: 10,
                  borderWidth: 1,
                  overflow: 'hidden',
                },
              ]}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                startPoint={{x: 1, y: 0}}
                endPoint={{x: 0, y: 1}}
                colors={['#d53369', '#cbad6d']}
                style={styless.gradient}
              />
              <TouchableOpacity onPress={() => doUpdatePass()}>
                <Text style={styles.loginText}>ĐỔI MẬT KHẨU</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </KeyboardAvoidingView>
      {/*</View>*/}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    color: '#21243d',
    fontWeight: 'bold',
    fontSize: 60,
    marginBottom: 50,
  },
  container: {
    flex: 1,
    backgroundColor: '#E8E8C9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#fb934f',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: 'rgba(250,255,241,0.95)',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    // padding: 20,
  },
  buttonGroup: {
    width: '80%',
    backgroundColor: '#fde1c7',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'black',
  },
  forgot: {
    color: 'black',
    fontSize: 16,
  },
  loginBtn: {
    width: '70%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,

    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
  },
  loginText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default DetailAccount;
