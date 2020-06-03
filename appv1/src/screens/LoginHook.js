import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Animated,
  Keyboard,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as LoginAction from '../redux/actions/auth';
import LinearGradient from 'react-native-linear-gradient';
import styless, {colors} from '../constants/index.style';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';
import SafeAreaView from 'react-native-safe-area-view';
import DotIndicator from '../components/indicator/DotIndicator';
import {theme} from '../components/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';

const window = Dimensions.get('window');
const IMAGE_HEIGHT = 100;
const IMAGE_HEIGHT_SMALL = 0;
const imageHeight = new Animated.Value(IMAGE_HEIGHT);

LoginHook.propTypes = {};
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
function LoginHook({navigation, route}) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(null);
  const [pass, setPass] = useState(null);
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const status = useSelector(state => state.loginIn.status);
  const user = useSelector(state => state.loginIn.user);
  // const timeoutRef = React.useRef();
  navigation.setOptions({
    title: 'Đăng Nhập',
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
        <Image
          source={require('../assets/imgs/home.png')}
          style={{height: 30, width: 50}}
          resizeMode="contain"
        />
      </TouchableOpacity>
    ),
  });
  function toggleSwitch() {
    setShowPassword(!showPassword);
  }

  function login(email, pass) {
    setLoading(true);
    if (email && pass) {
      setTimeout(() => {
        console.log('timeout login');
        setLoading(false);
        Keyboard.dismiss();
        dispatch(LoginAction.login(email, pass));
      }, 700);
    } else {
      setLoading(false);
      setError(true);
    }
  }

  useEffect(() => {
    console.log('Handle api');
    console.log(status);
    if (route.params) {
      var {continueBooking} = route.params;
      console.log(continueBooking);
    }
    if (status === 'OK') {
      if (continueBooking === true) {
        console.log('back hihi');
        navigation.goBack();
      } else {
        navigation.navigate('Home');
      }
    }
    if (status === 'ERROR') {
      setError(true);
    }
  }, [navigation, error, status]);

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
    setError(false);
    return function cleanup() {
      console.log('unmount');
      keyboardWillShowSub.remove();
      keyboardWillHideSub.remove();
      if (status === 'ERROR') {
        dispatch(LoginAction.logout());
      }
      // clearTimeout(timeoutRef.current);
      // console.log(timeoutRef);
    };
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      {/*<CustomHeader isHome="true" title="Đăng Nhập" navigation={navigation} />*/}
      <View style={styles.container}>
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

        <Animated.Image
          source={require('../assets/imgs/htv_logo.png')}
          style={{width: '90%', resizeMode: 'contain', height: imageHeight}}
        />
        <Text style={styles.title}>
          cinemas
          <Text
            style={{
              color: '#ff7c7c',
              fontWeight: 'bold',
              fontStyle: 'italic',
            }}>
            HTV
          </Text>
        </Text>

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
            // secureTextEntry
            secureTextEntry={showPassword}
            style={styles.inputText}
            leftIcon={<Icon name="lock" size={24} color="black" />}
            placeholderTextColor="#003f5c"
            // errorStyle={{color: 'red', fontSize: 14}}
            // errorMessage={
            //   this.state.error !== null
            //     ? 'EMAIL/MẬT KHẨU KHÔNG CHÍNH XÁC'
            //     : ''
            // }
            onChangeText={text => setPass(text)}
            rightIcon={
              // <Switch onValueChange={toggleSwitch} value={!showPassword} />
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
        {/*handel wrong*/}
        <Text
          style={{
            fontSize: 15,
            fontWeight: 'bold',
            fontStyle: 'italic',
            color: 'red',
          }}>
          {error ? 'Thông tin đăng nhập sai' : ''}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
          <Text style={styles.forgot}>Quên mật khẩu</Text>
        </TouchableOpacity>
        {/* login button */}
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
            // start={{x: 0, y: 0}}
            // end={{x: 1, y: 1}}
            startPoint={{x: 1, y: 0}}
            endPoint={{x: 0, y: 1}}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            locations={[0.1, 0.9]}
            // colors={['#0AC4BA', '#2BDA8E']}
            colors={['#d53369', '#cbad6d']}
            style={styless.gradient}
          />
          <TouchableOpacity
            // style={styles.loginBtn}
            onPress={() => login(email, pass)}>
            {loading ? (
              <View>
                <DotIndicator
                  color={theme.colors.white}
                  count={4}
                  size={theme.sizes.base * 0.5}
                />
                <Text style={styles.loginText}>Đang xác thực</Text>
              </View>
            ) : (
              <Text style={styles.loginText}>ĐĂNG NHẬP</Text>
            )}
          </TouchableOpacity>
        </View>

        {/*sing up button*/}
        <TouchableOpacity>
          <Text
            style={[
              styles.loginText,
              {
                textDecorationLine: 'underline',
                fontStyle: 'italic',
                fontSize: 17,
                color: 'black',
              },
            ]}
            onPress={() => navigation.navigate('SignUp')}>
            ĐĂNG KÝ
          </Text>
        </TouchableOpacity>
      </View>
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
  inputText: {
    height: 50,
    color: 'black',
  },
  forgot: {
    textDecorationLine: 'underline',
    color: 'black',
    fontStyle: 'italic',
    fontSize: 16,
  },
  loginBtn: {
    width: '70%',
    backgroundColor: '#fb5b5a',
    borderRadius: 50,
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

export default LoginHook;
