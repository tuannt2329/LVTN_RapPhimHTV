// import React from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   Image,
//   Button,
//   Switch,
//   KeyboardAvoidingView,
//   Platform,
//   Animated,
//   Keyboard,
//   Dimensions,
// } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
// import {connect} from 'react-redux';
// import * as LoginAction from '../../redux/actions/auth';
// import LinearGradient from 'react-native-linear-gradient';
// import styless, {colors} from '../../constants/index.style';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import {Input} from 'react-native-elements';
// import SafeAreaView from 'react-native-safe-area-view';
// import CustomHeader from '../CustomHeader';
// const window = Dimensions.get('window');
//
// const IMAGE_HEIGHT = 100;
// const IMAGE_HEIGHT_SMALL = 0;
// class Login extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: null,
//       pass: null,
//       error: null,
//       isVisible: false,
//       showPassword: true,
//     };
//     this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
//   }
//   UNSAFE_componentWillMount() {
//     console.log('wilmount');
//     this.keyboardWillShowSub = Keyboard.addListener(
//       'keyboardDidShow',
//       this.keyboardDidShow,
//     );
//     this.keyboardWillHideSub = Keyboard.addListener(
//       'keyboardDidHide',
//       this.keyboardDidHide,
//     );
//   }
//   keyboardDidShow = event => {
//     Animated.timing(this.imageHeight, {
//       toValue: IMAGE_HEIGHT_SMALL,
//     }).start();
//   };
//
//   keyboardDidHide = event => {
//     Animated.timing(this.imageHeight, {
//       toValue: IMAGE_HEIGHT,
//     }).start();
//   };
//   //
//   //
//   //
//   getUsername = async () => {
//     try {
//       let take = await AsyncStorage.getItem('username');
//       console.log(take);
//       alert(take);
//       return take;
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   deleteUsername = () => {
//     AsyncStorage.removeItem('username');
//   };
//   doLogin = () => {
//     if (
//       (this.state.email == null && this.state.pass == null) ||
//       (this.state.email == '' && this.state.pass == '')
//     ) {
//       Alert.alert('Không thành công!', 'Chưa điền thông tin người dùng');
//     } else {
//       fetch('http://192.168.1.41:3001/api/login', {
//         method: 'POST',
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: this.state.email,
//           password: this.state.pass,
//         }),
//       })
//         .then(response => response.json())
//         .then(responseJson => {
//           if (responseJson.success == true) {
//             Alert.alert(responseJson.user.username);
//             console.log(responseJson);
//             AsyncStorage.setItem('username', responseJson.user.username);
//             var user = this.getUsername;
//             console.log(user);
//             return responseJson;
//           } else {
//             Alert.alert('Failed to Login');
//           }
//         })
//         .catch(error => {
//           // Alert.alert('Failed to Login');
//           // console.error(error);
//         });
//     }
//     // try {
//     //   const response = await fetch('http://192.168.1.41:3001/api/login', {
//     //     method: 'POST',
//     //     headers: {
//     //       Accept: 'application/json',
//     //       'Content-Type': 'application/json',
//     //     },
//     //     body: JSON.stringify({
//     //       email: this.state.email,
//     //       password: this.state.pass
//     //     }),
//     //   });
//     //   const data = await response.json();
//     //   console.log(data)
//     //   return data;
//     // } catch (error) {
//     //   return error;
//     // }
//   };
//
//   doSignUp = () => {
//     this.props.navigation.navigate('SignUp');
//   };
//
//   UNSAFE_componentWillReceiveProps = nextProps => {
//     console.log('Component receive prop!');
//     if (nextProps.status === 'OK') {
//       this.props.navigation.navigate('Home');
//     }
//   };
//
//   // componentDidMount = () => {
//   //   console.log('Component did mount!');
//   //   //
//   //   // this.setState({
//   //   //   email: null,
//   //   //   pass: null,
//   //   //   error: null,
//   //   // });
//   // };
//   toggleModal = () => {
//     this.setState({isVisible: !this.state.isVisible});
//   };
//
//   get gradient() {
//     return (
//       <LinearGradient
//         colors={[
//           colors.background1Login,
//           colors.background2Login,
//           colors.background3Login,
//         ]}
//         startPoint={{x: 1, y: 0}}
//         endPoint={{x: 0, y: 1}}
//         style={styless.gradient}
//       />
//     );
//   }
//   // static getDerivedStateFromProps() {
//   //   this.state = {
//   //     email: null,
//   //     pass: null,
//   //     error: null,
//   //   };
//   // }
//   // shouldComponentUpdate() {
//   //   this.setState({
//   //     email: null,
//   //     pass: null,
//   //     error: null,
//   //   });
//   // }
//   signIn = async (email, pass) => {
//     console.log('dosignup');
//     await this.props.login(email, pass);
//     if (this.props.status === 'OK') {
//       this.props.navigation.navigate('Home');
//     } else {
//       // handle delay update state from redux maybe react UI render slow
//       // don't fix
//       this._interval = setInterval(() => {
//         this.setState({error: this.props.status});
//       }, 5000);
//     }
//   };
//
//   componentWillUnmount() {
//     console.log('unmount');
//     this.state = {
//       email: null,
//       pass: null,
//       error: null,
//       isVisible: false,
//     };
//     this.keyboardWillShowSub.remove();
//     this.keyboardWillHideSub.remove();
//   }
//   toggleSwitch = () => {
//     this.setState({showPassword: !this.state.showPassword});
//   };
//   render() {
//     const {login} = this.props;
//     return (
//       <SafeAreaView style={{flex: 1}}>
//         <CustomHeader
//           isHome="true"
//           title="ĐĂNG NHẬP"
//           navigation={this.props.navigation}
//         />
//         <View style={styles.container}>
//           {this.gradient}
//           <Animated.Image
//             source={require('../../assets/imgs/logo.png')}
//             style={{width: '70%', height: this.imageHeight}}
//           />
//           <Text style={styles.title}>
//             cinemas
//             <Text
//               style={{
//                 color: '#ff7c7c',
//                 fontWeight: 'bold',
//                 fontStyle: 'italic',
//               }}>
//               HTV
//             </Text>
//           </Text>
//           <View style={styles.inputView}>
//             {/*<TextInput*/}
//             {/*  style={styles.inputText}*/}
//             {/*  placeholder="Email..."*/}
//             {/*  placeholderTextColor="#003f5c"*/}
//             {/*  onChangeText={text => this.setState({email: text})}*/}
//             {/*/>*/}
//             <Input
//               placeholder="Email..."
//               style={styles.inputText}
//               leftIcon={<Icon name="user" size={24} color="black" />}
//               placeholderTextColor="#003f5c"
//               onChangeText={text => this.setState({email: text})}
//             />
//           </View>
//           <View style={styles.inputView}>
//             {/*<TextInput*/}
//             {/*  secureTextEntry*/}
//             {/*  style={styles.inputText}*/}
//             {/*  placeholder="Mật khẩu..."*/}
//             {/*  placeholderTextColor="#003f5c"*/}
//             {/*  onChangeText={text => this.setState({pass: text})}*/}
//             {/*/>*/}
//             <Input
//               placeholder="Mật khẩu..."
//               // secureTextEntry
//               secureTextEntry={this.state.showPassword}
//               style={styles.inputText}
//               leftIcon={<Icon name="lock" size={24} color="black" />}
//               placeholderTextColor="#003f5c"
//               // errorStyle={{color: 'red', fontSize: 14}}
//               // errorMessage={
//               //   this.state.error !== null
//               //     ? 'EMAIL/MẬT KHẨU KHÔNG CHÍNH XÁC'
//               //     : ''
//               // }
//               onChangeText={text => this.setState({pass: text})}
//               rightIcon={
//                 <Switch
//                   onValueChange={this.toggleSwitch}
//                   value={!this.state.showPassword}
//                 />
//               }
//             />
//           </View>
//           {/*handel wrong*/}
//           <Text
//             style={{
//               fontSize: 15,
//               fontWeight: 'bold',
//               fontStyle: 'italic',
//               color: 'red',
//             }}>
//             {this.state.error !== null ? 'Thông tin đăng nhập sai' : ''}
//           </Text>
//           {/*<Overlay*/}
//           {/*  isVisible={this.state.isVisible}*/}
//           {/*  windowBackgroundColor="rgba(255, 255, 255, .5)"*/}
//           {/*  overlayBackgroundColor="white"*/}
//           {/*  width="auto"*/}
//           {/*  height="auto"*/}
//           {/*  onBackdropPress={() => this.setState({isVisible: false})}>*/}
//           {/*  <Text style={{fontSize: 15}}>Thông tin đăng nhập sai</Text>*/}
//           {/*  <Button*/}
//           {/*    title="OK"*/}
//           {/*    onPress={() => this.setState({isVisible: false})}*/}
//           {/*  />*/}
//           {/*</Overlay>*/}
//           <TouchableOpacity
//             onPress={() => this.props.navigation.navigate('Forgot')}>
//             <Text style={styles.forgot}>Quên mật khẩu</Text>
//           </TouchableOpacity>
//           {/* login button */}
//           <View
//             style={[
//               styles.loginBtn,
//               {
//                 overflow: 'hidden',
//                 borderRadius: 10,
//                 width: '80%',
//               },
//             ]}>
//             <LinearGradient
//               // start={{x: 0, y: 0}}
//               // end={{x: 1, y: 1}}
//               startPoint={{x: 1, y: 0}}
//               endPoint={{x: 0, y: 1}}
//               start={{x: 0, y: 0}}
//               end={{x: 1, y: 1}}
//               locations={[0.1, 0.9]}
//               colors={['#0AC4BA', '#2BDA8E']}
//               style={styless.gradient}
//             />
//             <TouchableOpacity
//               // style={styles.loginBtn}
//               onPress={() => this.signIn(this.state.email, this.state.pass)}>
//               <Text style={styles.loginText}>ĐĂNG NHẬP</Text>
//             </TouchableOpacity>
//           </View>
//
//           {/*sing up button*/}
//           <TouchableOpacity>
//             <Text style={styles.loginText} onPress={this.doSignUp}>
//               ĐĂNG KÝ
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//     );
//   }
// }
// const styles = StyleSheet.create({
//   title: {
//     color: '#21243d',
//     fontWeight: 'bold',
//     fontSize: 60,
//     marginBottom: 50,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#E8E8C9',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   logo: {
//     fontWeight: 'bold',
//     fontSize: 50,
//     color: '#fb934f',
//     marginBottom: 40,
//   },
//   inputView: {
//     width: '80%',
//     backgroundColor: 'rgba(250,255,241,0.95)',
//     borderRadius: 25,
//     height: 50,
//     marginBottom: 20,
//     justifyContent: 'center',
//     padding: 20,
//   },
//   inputText: {
//     height: 50,
//     color: 'black',
//   },
//   forgot: {
//     color: 'black',
//     fontSize: 16,
//   },
//   loginBtn: {
//     width: '70%',
//     backgroundColor: '#fb5b5a',
//     borderRadius: 50,
//     height: 50,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 40,
//     marginBottom: 10,
//   },
//   loginText: {
//     color: 'black',
//     fontSize: 17,
//     fontWeight: 'bold',
//   },
// });
//
// // MapStateToProps =(state ) =>({
// //   status: state.loginIn.status,
// //   isSuccess: state.loginIn.isSuccess,
// //   user: state.loginIn.user,
// // });
// // MapDispatchToProps = (dispatch) => ({
// //   login: () => dispatch(loginAction.login()),
// // });
//
// // export default connect(MapStateToProps, MapDispatchToProps)(Login);
//
// export default connect(
//   state => ({
//     status: state.loginIn.status,
//     isSuccess: state.loginIn.isSuccess,
//     user: state.loginIn.user,
//   }),
//   dispatch => ({
//     login: (email, pass) => dispatch(LoginAction.login(email, pass)),
//   }),
// )(Login);
