import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import * as LoginAction from '../../redux/actions/auth';
import LinearGradient from 'react-native-linear-gradient';
import styless, {colors} from '../../constants/index.style';

// import {NavigationActions} from 'react-navigation';
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      pass: null,
    };
    // this.doSignUp= this.doSignUp.bind(this);
  }
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

  doSignUp = () => {
    this.props.navigation.navigate('SignUp');
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.status == 'OK') {
      this.props.navigation.navigate('Home');
    }
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
  render() {
    const {login} = this.props;
    return (
      <View style={styles.container}>
        {this.gradient}

        <Image
          source={require('../../assets/imgs/logo.png')}
          style={{width: '70%', height: 100}}
        />
        <Text style={styles.title}>
          cinemas
          <Text
            style={{color: '#ff7c7c', fontWeight: 'bold', fontStyle: 'italic'}}>
            HTV
          </Text>
        </Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email..."
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({email: text})}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Mật khẩu..."
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({pass: text})}
          />
        </View>

        <Text> {this.props.status == 'OK' ? 'ok' : 'del'} </Text>

        <TouchableOpacity>
          <Text style={styles.forgot}>Quên mật khẩu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => {
            login(this.state.email, this.state.pass);
          }}>
          <Text style={styles.loginText}>ĐĂNG NHẬP</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.loginText} onPress={() => this.doSignUp}>
            ĐĂNG KÝ
          </Text>
        </TouchableOpacity>
      </View>
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
    color: 'red',
    fontSize: 13,
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
    fontSize: 14,
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
    status: state.loginIn.status,
    isSuccess: state.loginIn.isSuccess,
    user: state.loginIn.user,
  }),
  dispatch => ({
    login: (email, pass) => dispatch(LoginAction.login(email, pass)),
  }),
)(Login);
