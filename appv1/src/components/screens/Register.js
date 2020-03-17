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
import {connect} from 'react-redux';
import * as LoginAction from '../../redux/actions/auth';
import LinearGradient from 'react-native-linear-gradient';
import styless, {colors} from '../../constants/index.style';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';
import {CheckBox} from 'react-native-elements';
import {ButtonGroup} from 'react-native-elements';
import {signup} from '../../redux/actions/auth';

// import {NavigationActions} from 'react-navigation';
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      pass: null,
      firstName: null,
      lastName: null,
      gender: 'Female',
      selectedIndex: 1,
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

  doSignUp = () => {
    this.props.navigation.navigate('SignUp');
  };

  UNSAFE_componentWillReceiveProps = nextProps => {
    console.log('Component receive prop!');
    if (nextProps.status === 'SIGN_UP_DONE') {
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

  render() {
    const {signup} = this.props;
    const buttons = ['Nam', 'Nữ'];
    const {selectedIndex} = this.state;
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
        <View style={styles.buttonGroup}>
          <ButtonGroup
            onPress={this.updateIndex}
            selectedIndex={selectedIndex}
            buttons={buttons}
            containerStyle={{
              height: 30,
              borderRadius: 25,
            }}
          />
        </View>
        {/*<TouchableOpacity>*/}
        {/*  <Text style={styles.forgot}>Quên mật khẩu</Text>*/}
        {/*</TouchableOpacity>*/}
        {/* login button */}
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => {
            signup(
              this.state.email,
              this.state.pass,
              this.state.firstName,
              this.state.lastName,
              this.state.gender,
            );
          }}>
          <Text style={styles.loginText}>ĐĂNG KÝ</Text>
        </TouchableOpacity>
        {/*sing up button*/}
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
    status: state.loginIn.status,
    isSuccess: state.loginIn.isSuccess,
  }),
  dispatch => ({
    signup: (email, pass, firstname, lastname, gender) =>
      dispatch(LoginAction.signup(email, pass, firstname, lastname, gender)),
  }),
)(Register);
