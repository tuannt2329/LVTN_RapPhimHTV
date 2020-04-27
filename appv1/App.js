/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment, useEffect} from 'react';
import {Platform, Image, Dimensions, Animated} from 'react-native';

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
import Screen2 from './src/drawer/Screen2';
import User from './src/screens/User';
import ForgetPassword from './src/screens/ForgetPassword';
// login authentication flow
import indexStackTab from './src/tab/indexStackTab';
import LoginHook from './src/screens/LoginHook';
import {SignUpHook} from './src/screens/SignUpHook';
import DetailFilm from './src/screens/DetailFilm';
import ListFilm from './src/screens/ListFilm';
import SplashScreen from 'react-native-splash-screen';
// import configureStore from './src/redux/store/index';
// const store = configureStore();

//persist
import {store, persistor} from './src/redux/store/index';
import {PersistGate} from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-community/async-storage';
import {theme} from './src/components/theme';

const MaterialTopTabs = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
import LinearGradient from 'react-native-linear-gradient';
import styless, {colors} from './src/constants/index.style';

const showHeader = () => ({
  headerShown: false,
});

// animation
const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

// animate screen
const forFade = ({current, closing}) => ({
  cardStyle: {
    opacity: current.progress,
  },
});
const forFadeHeader = ({current, next}) => {
  const opacity = Animated.add(
    current.progress,
    next ? next.progress : 0,
  ).interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  });

  return {
    leftButtonStyle: {opacity},
    rightButtonStyle: {opacity},
    titleStyle: {opacity},
    backgroundStyle: {opacity},
  };
};
function createHomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="HomeStack"
      // thiết lập định dạng chung cho các header của các screen
      screenOptions={{
        headerStyle: {
          height: 50,
          // backgroundColor: theme.colors.white, // or 'white
          //  backgroundColor: , // or 'white
          borderBottomColor: 'transparent',
          elevation: 0, // for android only
        },
        headerBackImage: () => (
          <Image source={require('./src/assets/imgs/back1.png')} />
        ),
        headerBackground: () => (
          <LinearGradient
            colors={[
              colors.background1Header,
              colors.background2Header,
              colors.background3Header,
            ]}
            startPoint={{x: 1, y: 0}}
            endPoint={{x: 0, y: 1}}
            style={styless.gradient}
          />
        ),
        headerPressColorAndroid: theme.colors.secondary,
        headerBackTitle: null,
        headerLeftContainerStyle: {
          alignItems: 'flex-start',
          marginLeft: theme.sizes.base, //for iOS multiply the value by 2
          paddingRight: theme.sizes.base,
        },
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="Login"
        options={{
          // headerShown: false,
          cardStyleInterpolator: forFade,
          headerStyleInterpolator: forFadeHeader,
        }}
        component={LoginHook}
      />
      <Stack.Screen
        name="HomeStack"
        options={{
          headerShown: false, // set header của 2 bottom tab
          cardStyleInterpolator: forFade,
        }}
        component={createBottomTab}
      />
      <Stack.Screen
        name="User"
        options={{
          // headerShown: true,
          cardStyleInterpolator: forFade,
        }}
        component={User}
      />
      <Stack.Screen
        name="SignUp"
        options={{
          // headerShown: false,
          cardStyleInterpolator: forFade,
          headerStyleInterpolator: forFadeHeader,
        }}
        component={SignUpHook}
      />
      <Stack.Screen
        name="Forgot"
        options={{
          // headerShown: false,
          cardStyleInterpolator: forFade,
          headerStyleInterpolator: forFadeHeader,
        }}
        component={ForgetPassword}
      />
      <Stack.Screen
        name="DetailFilm"
        component={DetailFilm}
        options={{
          // headerShown: false,
          cardStyleInterpolator: forFade,
          headerStyleInterpolator: forFadeHeader,
        }}
      />
      <Stack.Screen
        name="ListFilm"
        options={{
          cardStyleInterpolator: forFade,
          headerStyleInterpolator: forFadeHeader,
        }}
        component={ListFilm}
      />

      {/*<Stack.Screen name="SliderEntry" component={SliderEntry} />*/}
    </Stack.Navigator>
  );
}
function createHome() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ListFilm" options={showHeader} component={ListFilm} />
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
          cardStyleInterpolator: forFade,
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
          cardStyleInterpolator: forFade,
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

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
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
};
export default App;
