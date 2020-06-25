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
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [gender, setGender] = useState(null);
  const [error, setError] = useState('');
  const [infoUser, setInfoUser] = useState(null);
  const [done, setDone] = useState(null);
  // const [fromGender, setFromGender] = useState(user.user.gender);
  const [showPassword, setShowPassword] = useState(true);

  // loading sử dụng cho indicator
  const [loading, setLoading] = useState(false);
  const [textSuccess, setTextSuccess] = useState(false);
  const buttons = ['Nam', 'Nữ', 'Khác'];

  const dispatch = useDispatch();
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

  useEffect(() => {
    console.log('mount');
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
          console.log(users);
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
  // func update info
  function doUpdate() {
    fetch(`${types.API}user/updateInfo/`, {
      method: 'PUT',
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
        if (res.error) {
          console.log(res.error);
          if (res.error === 'Password is required.') {
            setError('Vui lòng nhập Mật Khẩu');
          }
          if (res.error === 'first name is required.') {
            console.log(res.error);
            setError('Vui lòng nhập Họ');
          }
          if (res.error === 'last name is required.') {
            console.log(res.error);
            setError('Vui Lòng nhập Tên');
          }
          // setError('Email đã đăng ký');s
          // setLoading(false);
        } else {
          console.log(res.content);
          if (res.content === 'Changed personal details') {
            setError('Cập Nhật Thành Công');
          }
          // setLoading(false);
          // setTextSuccess(true);
          // setTimeout(() => {
          //   setTextSuccess(false);
          //   navigation.dispatch(
          //     CommonActions.reset({
          //       index: 1,
          //       routes: [{name: 'HomeStack'}],
          //     }),
          //   );
          // }, 500);
        }
      })
      .catch(e => {
        console.log('catch sign up');
      });
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
            placeholder="Mật khẩu..."
            secureTextEntry={showPassword}
            style={styles.inputText}
            leftIcon={<Icon name="lock" size={24} color="black" />}
            placeholderTextColor="#003f5c"
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
        <View style={styles.inputView}>
          <Input
            placeholder="Họ..."
            style={styles.inputText}
            value={firstName}
            leftIcon={<Icon name="user" size={24} color="black" />}
            placeholderTextColor="#003f5c"
            onChangeText={text => setFirstName(text)}
          />
        </View>
        <View style={styles.inputView}>
          <Input
            placeholder="Tên..."
            style={styles.inputText}
            value={lastName}
            leftIcon={<Icon name="user" size={24} color="black" />}
            placeholderTextColor="#003f5c"
            onChangeText={text => setLastName(text)}
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
            onPress={() => doUpdate()}>
            {/*  <View>*/}
            {/*    <DotIndicator*/}
            {/*      color={theme.colors.white}*/}
            {/*      count={4}*/}
            {/*      size={theme.sizes.base * 0.5}*/}
            {/*    />*/}
            {/*    <Text style={styles.loginText}>Đang xác thực</Text>*/}
            {/*  </View>*/}
            {/*) : // xử lý timeout lúc đăng ký thành công*/}
            {/*// đã nhận kết quả từ server, chỉ chờ timeout để hiện thông báo*/}
            {/*textSuccess !== false ? (*/}
            {/*  <Text style={styles.loginText}>*/}
            {/*    Đăng ký thành công về trang chủ sau 1s*/}
            {/*  </Text>*/}
            {/*) : (*/}
            {/*  <Text style={styles.loginText}>CẬP NHẬT</Text>*/}
            {/*)}*/}
            <Text style={styles.loginText}>CẬP NHẬT</Text>
          </TouchableOpacity>
        </View>
        {/*sing up button*/}
        {/*<TouchableOpacity>*/}
        {/*  <Text*/}
        {/*    style={[*/}
        {/*      styles.loginText,*/}
        {/*      {*/}
        {/*        textDecorationLine: 'underline',*/}
        {/*        fontStyle: 'italic',*/}
        {/*        fontSize: 17,*/}
        {/*        color: 'black',*/}
        {/*      },*/}
        {/*    ]}*/}
        {/*    onPress={() => navigation.navigate('Login')}>*/}
        {/*    ĐĂNG NHẬP*/}
        {/*  </Text>*/}
        {/*</TouchableOpacity>*/}
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
