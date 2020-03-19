import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  Dimensions,
  Keyboard,
  Animated,
  KeyboardAvoidingView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import * as LoginAction from '../../redux/actions/auth';
import LinearGradient from 'react-native-linear-gradient';
import styless, {colors} from '../../constants/index.style';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';
import {CheckBox} from 'react-native-elements';
import {ButtonGroup} from 'react-native-elements';
import {signup} from '../../redux/actions/auth';
import SafeAreaView from 'react-native-safe-area-view';
import CustomHeader from '../CustomHeader';
// import {NavigationActions} from 'react-navigation';
const window = Dimensions.get('window');

const IMAGE_HEIGHT = 100;
const IMAGE_HEIGHT_SMALL = 0;
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      pass: null,
      firstName: null,
      lastName: null,
      gender: 'female',
      selectedIndex: 1,
      error: null,
    };
    this.imageHeight = new Animated.Value(IMAGE_HEIGHT);

    // this.doSignUp= this.doSignUp.bind(this);
  }

  UNSAFE_componentWillMount() {
    console.log('wilmount');
    this.keyboardWillShowSub = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow,
    );
    this.keyboardWillHideSub = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide,
    );
  }
  keyboardDidShow = event => {
    Animated.timing(this.imageHeight, {
      toValue: IMAGE_HEIGHT_SMALL,
    }).start();
  };

  keyboardDidHide = event => {
    Animated.timing(this.imageHeight, {
      toValue: IMAGE_HEIGHT,
    }).start();
  };
  getUsername = async () => {
    try {
      let take = await AsyncStorage.getItem('username');
      console.log(take);
      alert(take);
      return take;
    } catch (error) {
      console.log(error);
    }
  };

  updateIndex = async selectedIndex => {
    await this.setState({selectedIndex});
    console.log(selectedIndex);
    console.log('Component did update!');
    if (this.state.selectedIndex === 1) {
      this.setState({gender: 'female'});
    } else {
      this.setState({gender: 'male'});
    }
    console.log(this.state.gender);
  };
  deleteUsername = () => {
    AsyncStorage.removeItem('username');
  };
  doLogin = () => {
    if (
      (this.state.email == null && this.state.pass == null) ||
      (this.state.email == '' && this.state.pass == '')
    ) {
      Alert.alert('Không thành công!', 'Chưa điền thông tin người dùng');
    } else {
      fetch('http://192.168.1.41:3001/api/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.pass,
        }),
      })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.success == true) {
            Alert.alert(responseJson.user.username);
            console.log(responseJson);
            AsyncStorage.setItem('username', responseJson.user.username);
            var user = this.getUsername;
            console.log(user);
            return responseJson;
          } else {
            Alert.alert('Failed to Login');
          }
        })
        .catch(error => {
          // Alert.alert('Failed to Login');
          // console.error(error);
        });
    }
    // try {
    //   const response = await fetch('http://192.168.1.41:3001/api/login', {
    //     method: 'POST',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       email: this.state.email,
    //       password: this.state.pass
    //     }),
    //   });
    //   const data = await response.json();
    //   console.log(data)
    //   return data;
    // } catch (error) {
    //   return error;
    // }
  };

  UNSAFE_componentWillReceiveProps = nextProps => {
    console.log('Component receive prop!');
    if (nextProps.status === 'SIGN_UP_DONE') {
      this.props.navigation.navigate('Home');
    }
    if (nextProps.status === 'OK') {
      this.props.navigation.navigate('Home');
    }
    // if (nextProps.status == 'ERROR') {
    //   this.setState({error: 'error'});
    // }
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
  // static getDerivedStateFromProps() {
  //   this.state = {
  //     email: null,
  //     pass: null,
  //     error: null,
  //   };
  // }
  // shouldComponentUpdate() {
  //   this.setState({
  //     email: null,
  //     pass: null,
  //     error: null,
  //   });
  // }
  // componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
  //   this.props.navigation.pop();
  // }
  doSignUp = async (email, pass, firstname, lastname, gender) => {
    await this.props.signup(email, pass, firstname, lastname, gender);
    // const {error} = this.props;
    // console.log(error)
    if (this.props.status === 'SIGN_UP_DONE') {
      this.props.navigation.navigate('Home');
    } else {
      this.setState({error: this.props.error});
    }
  };
  componentWillUnmount() {
    this.state = {
      email: null,
      pass: null,
      firstName: null,
      lastName: null,
      gender: 'female',
      selectedIndex: 1,
      error: null,
    };
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  render() {
    const {signup} = this.props;
    const buttons = ['Nam', 'Nữ'];
    const {selectedIndex} = this.state;
    return (
      <SafeAreaView style={{flex: 1}}>
        <CustomHeader
          isHome="true"
          title="ĐĂNG KÝ"
          navigation={this.props.navigation}
        />
        <KeyboardAvoidingView style={styles.container} behavior="height">
          {this.gradient}
          {/*<Image*/}
          {/*  source={require('../../assets/imgs/logo.png')}*/}
          {/*  style={{width: '70%', height: 100}}*/}
          {/*/>*/}

          <Animated.Text
            style={{
              color: '#21243d',
              fontWeight: 'bold',
              fontSize: 60,
              marginBottom: 50,
              height: this.imageHeight,
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
              onChangeText={text => this.setState({email: text})}
            />
          </View>
          <View style={styles.inputView}>
            {/*<TextInput*/}
            {/*  secureTextEntry*/}
            {/*  style={styles.inputText}*/}
            {/*  placeholder="Mật khẩu..."*/}
            {/*  placeholderTextColor="#003f5c"*/}
            {/*  onChangeText={text => this.setState({pass: text})}*/}
            {/*/>*/}
            <Input
              placeholder="Mật khẩu..."
              secureTextEntry
              style={styles.inputText}
              leftIcon={<Icon name="lock" size={24} color="black" />}
              placeholderTextColor="#003f5c"
              onChangeText={text => this.setState({pass: text})}
            />
          </View>
          <View style={styles.inputView}>
            <Input
              placeholder="FirstName..."
              style={styles.inputText}
              leftIcon={<Icon name="user" size={24} color="black" />}
              placeholderTextColor="#003f5c"
              onChangeText={text => this.setState({firstName: text})}
            />
          </View>
          <View style={styles.inputView}>
            <Input
              placeholder="LastName..."
              style={styles.inputText}
              leftIcon={<Icon name="user" size={24} color="black" />}
              placeholderTextColor="#003f5c"
              onChangeText={text => this.setState({lastName: text})}
            />
          </View>
          {/*<View style={styles.buttonGroup}>*/}
          <View>
            <ButtonGroup
              onPress={this.updateIndex}
              selectedIndex={selectedIndex}
              buttons={buttons}
              containerStyle={{
                height: 50,
                borderRadius: 25,
                width: '80%',
                backgroundColor: '#fde0f2',
              }}
            />
          </View>
          {/*<TouchableOpacity>*/}
          {/*  <Text style={styles.forgot}>Quên mật khẩu</Text>*/}
          {/*</TouchableOpacity>*/}
          {/* login button */}
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              fontStyle: 'italic',
              color: 'red',
            }}>
            {this.state.error !== null ? 'Điền đầy đủ các thông tin' : ''}
          </Text>
          <View
            style={[
              styles.loginBtn,
              {
                overflow: 'hidden',
                borderRadius: 25,
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
              onPress={() => {
                this.doSignUp(
                  this.state.email,
                  this.state.pass,
                  this.state.firstName,
                  this.state.lastName,
                  this.state.gender,
                );
              }}>
              <Text style={styles.loginText}>ĐĂNG KÝ</Text>
            </TouchableOpacity>
          </View>
          {/*sing up button*/}
          <TouchableOpacity>
            <Text
              style={styles.loginText}
              onPress={() => this.props.navigation.navigate('Login')}>
              ĐĂNG NHẬP
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        {/*</View>*/}
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
    status: state.signupIn.status,
    error: state.signupIn.error,
  }),
  dispatch => ({
    signup: (email, pass, firstname, lastname, gender) =>
      dispatch(LoginAction.signup(email, pass, firstname, lastname, gender)),
  }),
)(Register);
