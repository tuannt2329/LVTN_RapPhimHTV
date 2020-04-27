import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  Button,
  Switch,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Keyboard,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import * as LoginAction from '../redux/actions/auth';
import LinearGradient from 'react-native-linear-gradient';
import styless, {colors} from '../constants/index.style';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';
import SafeAreaView from 'react-native-safe-area-view';
import CustomHeader from '../components/CustomHeader';
import Block from '../components/block';
import TextComponent from '../components/text';
import {CommonActions} from '@react-navigation/native';
class ForgetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      pass: null,
      error: null,
      info: null,
      code: null,
      showError: false,
      loading: false,
      timerID: null,
    };
    this.props.navigation.setOptions({
      title: 'Quên Mật Khẩu',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerRight: () => (
        <TouchableOpacity
          onPress={async () =>
            await this.props.navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [{name: 'HomeStack'}],
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
  }
  toggleModal = () => {
    this.setState({isVisible: !this.state.isVisible});
  };

  get gradient() {
    return (
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
    );
  }

  componentWillUnmount() {
    console.log('unmount');
    this.state = {
      email: null,
      pass: null,
      error: null,
      info: null,
      code: null,
      showError: false,
      loading: false,
    };
    // clearTimeout(this.timeoutID);
    // console.log(this.timer());
    // console.log('id', this.timeoutID);
  }

  doForgot = email => {
    // this.props.forgot(email);
    // console.log('from fnc', this.props.error.error);
    // console.log('from fnc', this.props.info);
    console.log('forgot', email);
    const t = fetch('http://192.168.56.1:8000/user/verification/', {
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
        if (res.hasOwnProperty('info')) {
          console.log(res);
          this.setState({info: res.info, error: null});
        }
        if (res.hasOwnProperty('error')) {
          this.setState({info: null, error: res.error});
        }
      })
      .catch(e => {
        console.log('catch forgot');
      });
  };

  // xử lý đổi mật khẩu khi mã gửi thành công
  changePass = (email, code, pass) => {
    console.log('forgot', email);
    this.setState({loading: true});
    const t = fetch('http://192.168.56.1:8000/user/updateInfo/', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        verificationCode: code,
        password: pass,
      }),
    })
      .then(res => res.json())
      .then(res => {
        if (res.hasOwnProperty('content')) {
          console.log(res);
          // gọi timeout để delay kết quẩ, xử lý giao diện
          setTimeout(() => {
            // return the timeoutID
            this.setState({
              loading: false,
            });
            this.props.navigation.navigate('Home');
          }, 500);
        }
        if (!res.hasOwnProperty('content')) {
          // Alert.alert('Thông tin không đúng!', 'Sai Thông Tin.');
          this.setState({showError: true, loading: false});
        }
      })
      .catch(e => {
        console.log('catch forgot');
      });
  };

  render() {
    const {forgot} = this.props;
    return (
      <SafeAreaView style={{flex: 1}}>
        {/*<CustomHeader*/}
        {/*  isHome="true"*/}
        {/*  title="Quên Mật Khẩu"*/}
        {/*  navigation={this.props.navigation}*/}
        {/*/>*/}
        <View style={styles.container}>
          {this.gradient}
          {this.state.info === null ? (
            <Block center style={{marginBottom: 10, marginTop: 30}}>
              <Block top center style={{marginBottom: 10, marginTop: 30}}>
                <TextComponent
                  color="black"
                  h2
                  style={{marginTop: 30, marginBottom: 6, fontWeight: 'bold'}}>
                  Nhập Địa Chỉ Mail Để Lấy Lại Mật Khẩu
                </TextComponent>
                <TextComponent
                  paragraph
                  h3
                  style={{marginBottom: 6, fontWeight: 'bold'}}>
                  Miễn Phí, Mã Được Gửi Vào Email
                </TextComponent>
              </Block>
              <Block center middle>
                <View>
                  <Input
                    inputContainerStyle={{
                      width: '80%',
                      backgroundColor: 'rgba(250,255,241,0.95)',
                      borderRadius: 25,
                      height: 50,
                      marginBottom: 20,
                      justifyContent: 'center',
                      padding: 20,
                    }}
                    placeholder="Email..."
                    style={styles.inputText}
                    leftIcon={<Icon name="user" size={24} color="black" />}
                    placeholderTextColor="#003f5c"
                    errorStyle={{
                      color: 'red',
                      fontSize: 16,
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}
                    errorMessage={
                      this.state.error !== null
                        ? 'Sai Mail, Xin Kiểm Tra Lại'
                        : ''
                    }
                    onChangeText={text => this.setState({email: text})}
                  />
                </View>
                <View
                  style={[
                    // styles.inputText,
                    {
                      overflow: 'hidden',
                      borderRadius: 15,
                      width: '80%',
                      height: 50,
                      marginBottom: 20,
                      justifyContent: 'center',
                      padding: 20,
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
                    colors={['#0AC4BA', '#2BDA8E']}
                    style={styless.gradient}
                  />
                  <TouchableOpacity
                    // style={styles.loginBtn}
                    onPress={() => this.doForgot(this.state.email)}>
                    <Text style={styles.loginText}> LẤY MÃ XÁC NHẬN</Text>
                  </TouchableOpacity>
                  {/*<Text>{this.state.info !== null ? 'aa' : 'cc'}</Text>*/}
                </View>
              </Block>
              <Block center bottom />
            </Block>
          ) : (
            <Block center middle style={{marginBottom: 10, marginTop: 30}}>
              {this.state.loading !== true ? (
                <TextComponent
                  color="black"
                  h2
                  style={{
                    marginTop: 30,
                    marginBottom: 6,
                    fontWeight: 'bold',
                  }}>
                  Nhập mã được gửi về mail và mật khẩu mới
                </TextComponent>
              ) : (
                <TextComponent
                  paragraph
                  h3
                  style={{marginBottom: 6, fontWeight: 'bold'}}>
                  Đang xử lý, đổi thành công sẽ về trang chủ
                </TextComponent>
              )}
              <View>
                <Input
                  inputContainerStyle={{
                    width: '80%',
                    backgroundColor: 'rgba(250,255,241,0.95)',
                    borderRadius: 25,
                    height: 50,
                    marginBottom: 20,
                    justifyContent: 'center',
                    padding: 20,
                  }}
                  placeholder={this.state.email}
                  style={styles.inputText}
                  editable={false}
                  leftIcon={<Icon name="user" size={24} color="black" />}
                  placeholderTextColor="#003f5c"
                  onChangeText={text => this.setState({email: text})}
                />
              </View>
              <View>
                <Input
                  inputContainerStyle={{
                    width: '80%',
                    backgroundColor: 'rgba(250,255,241,0.95)',
                    borderRadius: 25,
                    height: 50,
                    marginBottom: 20,
                    justifyContent: 'center',
                    padding: 20,
                  }}
                  placeholder="Mã xác nhận"
                  style={styles.inputText}
                  leftIcon={<Icon name="user" size={24} color="black" />}
                  placeholderTextColor="#003f5c"
                  onChangeText={text => this.setState({code: text})}
                />
              </View>
              <View>
                <Input
                  inputContainerStyle={{
                    width: '80%',
                    backgroundColor: 'rgba(250,255,241,0.95)',
                    borderRadius: 25,
                    height: 50,
                    marginBottom: 20,
                    justifyContent: 'center',
                    padding: 20,
                  }}
                  placeholder="Mật khẩu mới"
                  style={styles.inputText}
                  leftIcon={<Icon name="user" size={24} color="black" />}
                  placeholderTextColor="#003f5c"
                  onChangeText={text => this.setState({pass: text})}
                  errorStyle={{
                    color: 'red',
                    fontSize: 16,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                  errorMessage={
                    this.state.showError !== false
                      ? 'Sai Thông Tin, Xin Kiểm Tra Lại'
                      : ''
                  }
                />
              </View>
              <View
                style={[
                  // styles.inputText,
                  {
                    overflow: 'hidden',
                    borderRadius: 15,
                    width: '80%',
                    height: 50,
                    marginBottom: 20,
                    justifyContent: 'center',
                    padding: 20,
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
                  colors={['#0AC4BA', '#2BDA8E']}
                  style={styless.gradient}
                />
                <TouchableOpacity
                  // style={styles.loginBtn}
                  onPress={() =>
                    this.changePass(
                      this.state.email,
                      this.state.code,
                      this.state.pass,
                    )
                  }>
                  <Text style={styles.loginText}> ĐỔI</Text>
                </TouchableOpacity>
                {/*<Text>{this.state.info !== null ? 'aa' : 'cc'}</Text>*/}
              </View>
            </Block>
          )}

          {/*<View style={styles.inputView}>*/}
          {/*  <Input*/}
          {/*    placeholder="Ma xac nhan..."*/}
          {/*    style={styles.inputText}*/}
          {/*    leftIcon={<Icon name="user" size={24} color="black" />}*/}
          {/*    placeholderTextColor="#003f5c"*/}
          {/*    onChangeText={text => this.setState({email: text})}*/}
          {/*  />*/}
          {/*</View>*/}
          {/*<View style={styles.inputView}>*/}
          {/*  <Input*/}
          {/*    placeholder="Ma xac nhan..."*/}
          {/*    style={styles.inputText}*/}
          {/*    leftIcon={<Icon name="user" size={24} color="black" />}*/}
          {/*    placeholderTextColor="#003f5c"*/}
          {/*    onChangeText={text => this.setState({email: text})}*/}
          {/*  />*/}
          {/*</View>*/}
          {/*<View*/}
          {/*  style={[*/}
          {/*    styles.loginBtn,*/}
          {/*    {*/}
          {/*      overflow: 'hidden',*/}
          {/*      borderRadius: 10,*/}
          {/*      width: '80%',*/}
          {/*    },*/}
          {/*  ]}>*/}
          {/*  <LinearGradient*/}
          {/*    // start={{x: 0, y: 0}}*/}
          {/*    // end={{x: 1, y: 1}}*/}
          {/*    startPoint={{x: 1, y: 0}}*/}
          {/*    endPoint={{x: 0, y: 1}}*/}
          {/*    start={{x: 0, y: 0}}*/}
          {/*    end={{x: 1, y: 1}}*/}
          {/*    locations={[0.1, 0.9]}*/}
          {/*    colors={['#0AC4BA', '#2BDA8E']}*/}
          {/*    style={styless.gradient}*/}
          {/*  />*/}
          {/*  <TouchableOpacity*/}
          {/*    // style={styles.loginBtn}*/}
          {/*    onPress={() => this.signIn(this.state.email, this.state.pass)}>*/}
          {/*    <Text style={styles.loginText}>ĐĂNG NHẬP</Text>*/}
          {/*  </TouchableOpacity>*/}
          {/*</View>*/}
        </View>
      </SafeAreaView>
    );
  }
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
    color: 'black',
    fontSize: 16,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 50,
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

// MapStateToProps =(state ) =>({
//   status: state.loginIn.status,
//   isSuccess: state.loginIn.isSuccess,
//   user: state.loginIn.user,
// });
// MapDispatchToProps = (dispatch) => ({
//   login: () => dispatch(loginAction.login()),
// });

// export default connect(MapStateToProps, MapDispatchToProps)(Login);

export default connect(
  state => ({
    error: state.forgotIn.error,
    info: state.forgotIn.info,
  }),
  dispatch => ({
    forgot: email => dispatch(LoginAction.forgotPassword(email)),
  }),
)(ForgetPassword);
// state => ({
//   status: state.loginIn.status,
//   isSuccess: state.loginIn.isSuccess,
//   user: state.loginIn.user,
// }),
// dispatch => ({
//   login: (email, pass) => dispatch(LoginAction.login(email, pass)),
// }),
