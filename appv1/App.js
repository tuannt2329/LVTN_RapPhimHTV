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

import Tab1 from './src/tab/Tab1';
import Tab2 from './src/tab/Tab2';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Screen2 from './src/drawer/Screen2';
import User from './src/screens/User';
import ForgetPassword from './src/screens/ForgetPassword';
// import configureStore from './src/redux/store/index';
// const store = configureStore();

//persist
import {store, persistor} from './src/redux/store/index';
import {PersistGate} from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-community/async-storage';

// login authentication flow
import indexStackTab from './src/tab/indexStackTab';
import Register from './src/screens/Register';
import LoginHook from './src/screens/LoginHook';
import {SignUpHook} from './src/screens/SignUpHook';
import DetailFilm from './src/screens/DetailFilm';
import SliderEntry from './src/components/SliderEntry';
import {theme} from './src/components/theme';
const MaterialTopTabs = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const showHeader = () => ({
  headerShown: false,
});
const backButton = () => ({
  headerStyle: {
    height: theme.sizes.base * 4,
    backgroundColor: theme.colors.white, // or 'white
    borderBottomColor: 'transparent',
    elevation: 0, // for android only
  },
  headerBackImage: () => (
    <Image source={require('./src/assets/imgs/back1.png')} />
  ),
  headerBackTitle: null,
  headerLeftContainerStyle: {
    alignItems: 'flex-start',
    marginLeft: theme.sizes.base, //for iOS multiply the value by 2
    paddingRight: theme.sizes.base,
  },
  // headerRightContainerStyle: {
  //   alignItems: 'center',
  //   paddingRight: theme.sizes.base,
  // },
});
// get username for authentication flow v5

function createHomeStack() {
  return (
    <Stack.Navigator initialRouteName="HomeStack">
      {/*  <Stack.Screen name="Loginn" options={showHeader} component={indexStackTab} />*/}
      <Stack.Screen name="Login" options={showHeader} component={LoginHook} />
      <Stack.Screen
        name="HomeStack"
        options={showHeader}
        component={createBottomTab}
      />
      <Stack.Screen name="User" options={showHeader} component={User} />
      <Stack.Screen name="SignUp" options={showHeader} component={SignUpHook} />
      <Stack.Screen
        name="Forgot"
        options={showHeader}
        component={ForgetPassword}
      />
      <Stack.Screen name="DetailFilm" component={DetailFilm} options={backButton} />
      {/*<Stack.Screen name="SliderEntry" component={SliderEntry} />*/}
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
