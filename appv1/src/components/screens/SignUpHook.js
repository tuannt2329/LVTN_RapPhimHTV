import React, {useEffect, useState} from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import CustomHeader from '../CustomHeader';
import {
  Animated,
  Dimensions,
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
import styless, {colors} from '../../constants/index.style';
import {useDispatch, useSelector} from 'react-redux';
import * as LoginAction from '../../redux/actions/auth';
import {CommonActions} from '@react-navigation/native';
import * as types from '../../constants';

const window = Dimensions.get('window');

const IMAGE_HEIGHT = 100;
const IMAGE_HEIGHT_SMALL = 0;

function SignUpHook({navigation}) {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [email, setEmail] = useState(null);
  const [pass, setPass] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [gender, setGender] = useState(null);
  const [error, setError] = useState('');
  const buttons = ['Nam', 'Nữ'];
  // dùng thay cho connect state redux hook
  const statuss = useSelector(state => state.signupIn.status);
  const errors = useSelector(state => state.signupIn.error);
  const dispatch = useDispatch();

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
  // handle req
  // nếu signup thành công chuyển về trang chủ, gọi reset store
  // useEffect(() => {
  //   console.log('errrrrrrrrrrrorrr effect', statuss);
  //   if (statuss === 'SIGN_UP_ERROR') {
  //     setError('Email đã được sử dụng');
  //   }
  //   if (statuss === 'SIGN_UP_DONE') {
  //     navigation.dispatch(
  //       CommonActions.reset({
  //         index: 1,
  //         routes: [{name: 'HomeStack'}],
  //       }),
  //     );
  //     dispatch(LoginAction.resetRegister());
  //   }
  // }, [navigation, statuss, errors, dispatch]);

  // keyboard event
  useEffect(() => {
    console.log('keyboard event');
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
  }, [selectedIndex, gender]);

  // sử dụng để ngăn không cho render lại cảnh báo email đã được sử dụng ở STATUS trên
  // gọi reset store
  // useEffect(() => {
  //   console.log('unmount');
  //   return () => dispatch(LoginAction.resetRegister());
  // });

  function doSignUp() {
    console.log('stt button ', statuss, errors, email, lastName);
    console.log(gender);
    if (
      email === '' ||
      pass === '' ||
      firstName === '' ||
      lastName === '' ||
      lastName === null ||
      email === null ||
      pass === null ||
      firstName === null
    ) {
      setError('Nhập hết các thông tin');
    } else {
      // dispatch(LoginAction.signup(email, pass, firstName, lastName, gender));

      // khong su dung redux
      let result = fetch(`${types.API}user/signup/`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: pass,
          firstName: firstName,
          lastName: lastName,
          gender: gender,
        }),
      })
        .then(res => res.json())
        .then(res => {
          console.log(res.error);
          if (res.error) {
            console.log('a');
            setError('Email đã đăng ký');
          } else {
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [{name: 'HomeStack'}],
              }),
            );
          }
        })
        .catch(e => {
          console.log('catch sign up');
        });
    }
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomHeader isHome="false" title="ĐĂNG KÝ" navigation={navigation} />
      <KeyboardAvoidingView style={styles.container} behavior="height">
        {/*{this.gradient}*/}
        <Animated.Text
          style={{
            color: '#21243d',
            fontWeight: 'bold',
            fontSize: 60,
            marginBottom: 50,
            height: imageHeight,
          }}>
          cinemas
          <Text
            style={{
              color: '#ff7c7c',
              fontWeight: 'bold',
              fontStyle: 'italic',
            }}>
            HTV
          </Text>
        </Animated.Text>
        <View style={styles.inputView}>
          <Input
            placeholder="Email..."
            style={styles.inputText}
            leftIcon={<Icon name="user" size={24} color="black" />}
            placeholderTextColor="#003f5c"
            onChangeText={text => setEmail(text)}
          />
        </View>
        <View style={styles.inputView}>
          <Input
            placeholder="Mật khẩu..."
            secureTextEntry
            style={styles.inputText}
            leftIcon={<Icon name="lock" size={24} color="black" />}
            placeholderTextColor="#003f5c"
            onChangeText={text => setPass(text)}
          />
        </View>
        <View style={styles.inputView}>
          <Input
            placeholder="FirstName..."
            style={styles.inputText}
            leftIcon={<Icon name="user" size={24} color="black" />}
            placeholderTextColor="#003f5c"
            onChangeText={text => setFirstName(text)}
          />
        </View>
        <View style={styles.inputView}>
          <Input
            placeholder="LastName..."
            style={styles.inputText}
            leftIcon={<Icon name="user" size={24} color="black" />}
            placeholderTextColor="#003f5c"
            onChangeText={text => setLastName(text)}
          />
        </View>
        {/*<View style={styles.buttonGroup}>*/}
        <View>
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
              overflow: 'hidden',
              borderRadius: 10,
              width: '80%',
            },
          ]}>
          <LinearGradient
            // start={{x: 0, y: 0}}
            // end={{x: 1, y: 1}}
            startPoint={{x: 1, y: 0}}
            endPoint={{x: 0, y: 1}}
            colors={['#0AC4BA', '#2BDA8E']}
            style={styless.gradient}
          />
          <TouchableOpacity
            // style={styles.loginBtn}
            onPress={() => doSignUp()}>
            <Text style={styles.loginText}>ĐĂNG KÝ</Text>
          </TouchableOpacity>
        </View>
        {/*sing up button*/}
        <TouchableOpacity>
          <Text
            style={styles.loginText}
            onPress={() => navigation.navigate('Login')}>
            ĐĂNG NHẬP
          </Text>
        </TouchableOpacity>
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
    padding: 20,
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
  },
  loginText: {
    color: 'black',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
export {SignUpHook};
