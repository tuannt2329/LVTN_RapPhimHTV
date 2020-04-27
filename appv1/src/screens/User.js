import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import SafeAreaView from 'react-native-safe-area-view';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import * as LoginAction from '../redux/actions/auth';
import AsyncStorage from '@react-native-community/async-storage';
import {StackActions} from '@react-navigation/native';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }
  getUser = async () => {
    try {
      const name = await AsyncStorage.getItem('username').then(value => {
        return value;
      });
      console.log('from home', name);
      return name;
    } catch (error) {
      console.log(error, 'from home');
    }
  };
  //componentWillMount = () => {
  // if (this.props.user.firstName !== '') {
  //   console.log(this.props.user.firstName)
  //   this.setState({username: this.props.user.firstName});
  // }
  //};
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      // do something
    });
  }

  UNSAFE_componentWillUnmount() {
    this._unsubscribe();
  }
  // componentDidMount = () => {
  // this.getUser().then(val => {
  //   this.setState({username: val});
  //   console.log('get user', val);
  //   console.log('state', this.state.username);
  // });
  //   AsyncStorage.getItem('user').then(token => {
  //     this.setState({
  //       user: token,
  //     });
  //   });
  // };
  // static getDerivedStateFromProps = (props, state) => {
  //   this.getUser().then(val => {
  //     console.log('get user', val);
  //   });
  // };

  render() {
    return (
      <View style={{flex: 1}}>
        {/*<CustomHeader*/}
        {/*  isHome="false"*/}
        {/*  title="Tài Khoản"*/}
        {/*  navigation={this.props.navigation}*/}
        {/*/>*/}
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: 'bold',
          }}>
          <FontAwesome5 name={'user'} size={100} />
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
            }}>
            {' '}
            {this.props.user !== null
              ? this.props.user.user.email
              : 'Bạn chưa đăng nhập'}
          </Text>
        </View>

        {this.props.user !== null ? (
          <View style={{flex: 1}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              {'      '} {'ĐĂNG NHẬP THANH CONG'}
              <Text>{'\n'}</Text>
            </Text>
            <TouchableOpacity
              onPress={() => {
                this.props.logout();
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 20,
                }}>
                {'      '} {'LOG OUT'}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              flex: 2,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'pink',
            }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Login')}>
              <View style={{flexDirection: 'row'}}>
                <FontAwesome5 name="sign-in-alt" size={30} />
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                  }}>
                  {'      '} {'ĐĂNG NHẬP'}
                </Text>
              </View>
            </TouchableOpacity>
            <Text>{'\n'}</Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('SignUp')}>
                <View style={{flexDirection: 'row'}}>
                  <FontAwesome5 name="user-plus" size={30} />
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 20,
                    }}>
                    {'      '} {'ĐĂNG KÝ'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <Text>{'\n'}</Text>

            {/*<View style={{flexDirection: 'row'}}>*/}
            {/*  <FontAwesome5 name="sign-in-alt" size={30} />*/}
            {/*  <Text*/}
            {/*    style={{*/}
            {/*      fontWeight: 'bold',*/}
            {/*      fontSize: 20,*/}
            {/*    }}>*/}
            {/*    {'      '} {'Dang Nhap'}*/}
            {/*  </Text>*/}
            {/*</View>*/}
          </View>
        )}
        <View
          style={{
            flex: 2,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'blue',
          }}>
          <FontAwesome5 name={'spinner'} size={100} solid />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({

  center: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    marginBottom: 16,
  },
  androidButtonText: {
    color: 'blue',
    fontSize: 20,
  },
});
export default connect(
  state => ({
    status: state.loginIn.status,
    isSuccess: state.loginIn.isSuccess,
    user: state.loginIn.user,
  }),
  dispatch => ({
    logout: () => dispatch(LoginAction.logout()),
  }),
)(User);
