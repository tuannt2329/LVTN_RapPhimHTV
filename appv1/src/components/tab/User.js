import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CustomHeader from '../CustomHeader';
import SafeAreaView from 'react-native-safe-area-view';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
class User extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <CustomHeader
          isHome="false"
          title="USER"
          navigation={this.props.navigation}
        />
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
            User name
          </Text>
        </View>
        <View
          style={{
            flex: 2,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'pink',
          }}>
          <TouchableOpacity>
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
            <Text>{'\n'}</Text>
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
            <Text>{'\n'}</Text>

            <View style={{flexDirection: 'row'}}>
              <FontAwesome5 name="sign-in-alt" size={30} />
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 20,
                }}>
                {'      '} {'Dang Nhap'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
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
export default User;
