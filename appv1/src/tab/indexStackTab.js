//
// for user must login before doing smt

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Tab1 from './Tab1';
import Tab2 from './Tab2';
import Home from '../screens/Home';
import Screen2 from '../drawer/Screen2';
import User from '../screens/User';
import {NavigationContainer} from '@react-navigation/native';
import {Image} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
const Tab = createMaterialBottomTabNavigator();
import {connect} from 'react-redux';
const Stack = createStackNavigator();
const showHeader = () => ({
  headerShown: false,
});

function createBottomTab() {
  return (
    <Tab.Navigator
      // activeColor="red"
      // inactiveColor="black"
      tabBarOptions={{
        activeBackgroundColor: 'red',
        width: '100%',
      }}
      labeled={false}
      shifting={true}
      activeColor="red"
      barStyle={{
        backgroundColor: '#fafff1',
        width: '100%',
      }}
      screenOptions={{
        paddingRight: 90,
      }}>
      <Tab.Screen
        name="Home"
        options={{
          // tabBarColor: '#aae5ff',
          // tabBarLabel: false,
          tabBarIcon: ({focused, tintColor}) =>
            focused ? (
              <Image
                source={require('../assets/imgs/home.png')}
                resizeMode="contain"
                style={[{width: 30, height: 25}, {tintColor: tintColor}]}
              />
            ) : (
              <Image
                source={require('../assets/imgs/home-run.png')}
                resizeMode="contain"
                style={[{width: 30, height: 25}, {tintColor: tintColor}]}
              />
              // <FontAwesome5 name={'home'} size={30} solid />
            ),
          showHeader,
        }}
        component={Home}
      />
      <Tab.Screen
        name="User"
        component={User}
        options={{
          // tabBarColor: '#b5fcff',
          tabBarIcon: ({focused, tintColor}) =>
            focused ? (
              <Image
                source={require('../assets/imgs/user.png')}
                resizeMode="contain"
                style={[{width: 30, height: 25}, {tintColor: tintColor}]}
              />
            ) : (
              <Image
                source={require('../assets/imgs/user-run.png')}
                resizeMode="contain"
                style={[{width: 30, height: 25}, {tintColor: tintColor}]}
              />
            ),
          showHeader,
        }}
      />
    </Tab.Navigator>
  );
}

class indexStackTab extends React.Component {
  render() {
    return (
      <Stack.Navigator initialRouteName="HomeStack">
        {this.props.user !== null ? (
          <>
            <Stack.Screen
              name="HomeStack"
              options={showHeader}
              component={createBottomTab}
            />
            <Stack.Screen name="User" options={showHeader} component={User} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" options={showHeader} />
          </>
        )}
      </Stack.Navigator>
    );
  }
}

export default connect(state => ({user: state.loginIn.user}))(indexStackTab);
