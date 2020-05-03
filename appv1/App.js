/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {Platform, Image, Dimensions} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';

import Tab1 from './src/components/tab/Tab1';
import Tab2 from './src/components/tab/Tab2';
import Home from './src/components/screens/Home';
import Login from './src/components/screens/Login';
import Screen2 from './src/components/drawer/Screen2';
import User from './src/components/screens/User';
import ForgetPassword from './src/components/screens/ForgetPassword';
// import configureStore from './src/redux/store/index';
// const store = configureStore();

//persist
import {store, persistor} from './src/redux/store/index';
import {PersistGate} from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-community/async-storage';

// login authentication flow
import indexStackTab from './src/components/tab/indexStackTab';
import Register from './src/components/screens/Register';

const MaterialTopTabs = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const showHeader = () => ({
  headerShown: false,
});
// get username for authentication flow v5

function createHomeStack() {
  return (
    <Stack.Navigator initialRouteName="HomeStack">
      {/*  <Stack.Screen name="Loginn" options={showHeader} component={indexStackTab} />*/}
      <Stack.Screen name="Login" options={showHeader} component={Login} />
      <Stack.Screen
        name="HomeStack"
        options={showHeader}
        component={createBottomTab}
      />
      <Stack.Screen name="User" options={showHeader} component={User} />
      <Stack.Screen name="SignUp" options={showHeader} component={Register} />
      <Stack.Screen
        name="Forgot"
        options={showHeader}
        component={ForgetPassword}
      />
    </Stack.Navigator>
  );
}
function createHome() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Screen2" options={showHeader} component={Screen2} />
    </Stack.Navigator>
  );
}
function createDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="User" component={User} />
    </Drawer.Navigator>
  );
}
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
                source={require('./src/assets/imgs/home.png')}
                resizeMode="contain"
                style={[{width: 30, height: 25}, {tintColor: tintColor}]}
              />
            ) : (
              <Image
                source={require('./src/assets/imgs/home-run.png')}
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
                source={require('./src/assets/imgs/user.png')}
                resizeMode="contain"
                style={[{width: 30, height: 25}, {tintColor: tintColor}]}
              />
            ) : (
              <Image
                source={require('./src/assets/imgs/user-run.png')}
                resizeMode="contain"
                style={[{width: 30, height: 25}, {tintColor: tintColor}]}
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

function createTopTabs() {
  return (
    <MaterialTopTabs.Navigator initialRouteName="Tab3">
      <MaterialTopTabs.Screen
        name="Tab2"
        option={{showHeader}}
        component={Tab1}
      />
      <MaterialTopTabs.Screen
        name="Tab3"
        option={{showHeader}}
        component={Tab2}
      />
    </MaterialTopTabs.Navigator>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
    };
  }
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            <NavigationContainer>
              {/*{indexStackTab}*/}
              {createHomeStack()}
              {/*{createTopTabs()}*/}
            </NavigationContainer>
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    );
  }
}
export default App;
