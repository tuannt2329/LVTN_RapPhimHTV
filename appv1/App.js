/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * s
 * @format
 * @flow
 */

import React, {Fragment, useEffect} from 'react';
import {Platform, Image, Dimensions, Animated, StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
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
import DetailAccount from './src/screens/DetailAccount';
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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Animatedd from 'react-native-reanimated';
import Block from './src/components/block';
import Text from './src/components/text';

import Index from './src/navigation/index';

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

// function createHomeStack() {
//   return (
//     <Stack.Navigator
//       initialRouteName="HomeStack"
//       // thiết lập định dạng chung cho các header của các screen
//       screenOptions={{
//         headerStyle: {
//           height: 50,
//           // backgroundColor: theme.colors.white, // or 'white
//           //  backgroundColor: , // or 'white
//           borderBottomColor: 'transparent',
//           elevation: 0, // for android only
//         },
//         headerBackImage: () => (
//           <Image source={require('./src/assets/imgs/back1.png')} />
//         ),
//         headerBackground: () => (
//           <LinearGradient
//             colors={[
//               colors.background1Header,
//               colors.background2Header,
//               colors.background3Header,
//             ]}
//             startPoint={{x: 1, y: 0}}
//             endPoint={{x: 0, y: 1}}
//             style={styless.gradient}
//           />
//         ),
//         headerPressColorAndroid: theme.colors.secondary,
//         headerBackTitle: null,
//         headerLeftContainerStyle: {
//           alignItems: 'flex-start',
//           marginLeft: theme.sizes.base, //for iOS multiply the value by 2
//           paddingRight: theme.sizes.base,
//         },
//         headerTitleAlign: 'center',
//       }}>
//       <Stack.Screen
//         name="Login"
//         options={{
//           // headerShown: false,
//           cardStyleInterpolator: forFade,
//           headerStyleInterpolator: forFadeHeader,
//         }}
//         component={LoginHook}
//       />
//       <Stack.Screen
//         name="HomeStack"
//         options={{
//           headerShown: false, // set header của 2 bottom tab
//           cardStyleInterpolator: forFade,
//         }}
//         component={createBottomTab}
//       />
//       <Stack.Screen
//         name="User"
//         options={{
//           // headerShown: true,
//           cardStyleInterpolator: forFade,
//         }}
//         component={User}
//       />
//       <Stack.Screen
//         name="SignUp"
//         options={{
//           // headerShown: false,
//           cardStyleInterpolator: forFade,
//           headerStyleInterpolator: forFadeHeader,
//         }}
//         component={SignUpHook}
//       />
//       <Stack.Screen
//         name="Forgot"
//         options={{
//           // headerShown: false,
//           cardStyleInterpolator: forFade,
//           headerStyleInterpolator: forFadeHeader,
//         }}
//         component={ForgetPassword}
//       />
//       <Stack.Screen
//         name="DetailFilm"
//         component={DetailFilm}
//         options={{
//           // headerShown: false,
//           cardStyleInterpolator: forFade,
//           headerStyleInterpolator: forFadeHeader,
//         }}
//       />
//       <Stack.Screen
//         name="ListFilm"
//         options={{
//           cardStyleInterpolator: forFade,
//           headerStyleInterpolator: forFadeHeader,
//         }}
//         component={ListFilm}
//       />
//
//       {/*<Stack.Screen name="SliderEntry" component={SliderEntry} />*/}
//     </Stack.Navigator>
//   );
// }

// const DrawerContent = props => {
//   return (
//     <DrawerContentScrollView
//       {...props}
//       scrollEnabled={false}
//       contentContainerStyle={{flex: 1}}>
//       <Block>
//         <Block flex={0.4} margin={20} bottom>
//           <Image
//             source={{
//               uri:
//                 'https://react-ui-kit.com/assets/img/react-ui-kit-logo-green.png',
//               height: 60,
//               width: 60,
//               scale: 0.5,
//             }}
//             resizeMode="center"
//             style={styles.avatar}
//           />
//           <Text white>React UI Kit</Text>
//           <Text white>contact@react-ui-kit.com</Text>
//         </Block>
//         <Block>
//           <DrawerItem
//             label="Login"
//             labelStyle={styles.drawerLabel}
//             style={styles.drawerItem}
//             onPress={() => props.navigation.navigate('Login')}
//             icon={() => <FontAwesome5 name={'user'} size={16} />}
//           />
//           <DrawerItem
//             label="Messages"
//             labelStyle={{color: 'white', marginLeft: -16}}
//             style={{alignItems: 'flex-start', marginVertical: 0}}
//             onPress={() => props.navigation.navigate('Login')}
//             // icon={() => <AntDesign name="message1" color="white" size={16} />}
//           />
//           {/*<DrawerItem*/}
//           {/*  label="Contact us"*/}
//           {/*  labelStyle={{color: 'white', marginLeft: -16}}*/}
//           {/*  style={{alignItems: 'flex-start', marginVertical: 0}}*/}
//           {/*  onPress={() => props.navigation.navigate('Login')}*/}
//           {/*  icon={() => <AntDesign name="phone" color="white" size={16} />}*/}
//           {/*/>*/}
//         </Block>
//       </Block>
//
//       <Block flex={false}>
//         <DrawerItem
//           label="Logout"
//           labelStyle={{color: 'white'}}
//           // icon={() => <AntDesign name="logout" color="white" size={16} />}
//           onPress={() => alert('Are your sure to logout?')}
//         />
//       </Block>
//     </DrawerContentScrollView>
//   );
// };

// function createHome() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="ListFilm" options={showHeader} component={ListFilm} />
//     </Stack.Navigator>
//   );
// }

// function createDrawer() {
//   return (
//     <Drawer.Navigator>
//       <Drawer.Screen name="Home" component={Home} />
//       <Drawer.Screen name="User" component={User} />
//     </Drawer.Navigator>
//   );
// }

// function createBottomTab() {
//   return (
//     <Tab.Navigator
//       // activeColor="red"
//       // inactiveColor="black"
//       tabBarOptions={{
//         activeBackgroundColor: 'red',
//         width: '100%',
//       }}
//       labeled={false}
//       shifting={true}
//       activeColor="red"
//       barStyle={{
//         backgroundColor: '#fafff1',
//         width: '100%',
//       }}
//       screenOptions={{
//         paddingRight: 90,
//       }}>
//       <Tab.Screen
//         name="Home"
//         options={{
//           // tabBarColor: '#aae5ff',
//           // tabBarLabel: false,
//           cardStyleInterpolator: forFade,
//           tabBarIcon: ({focused, tintColor}) =>
//             focused ? (
//               <Image
//                 source={require('./src/assets/imgs/home.png')}
//                 resizeMode="contain"
//                 style={[{width: 30, height: 25}, {tintColor: tintColor}]}
//               />
//             ) : (
//               <Image
//                 source={require('./src/assets/imgs/home-run.png')}
//                 resizeMode="contain"
//                 style={[{width: 30, height: 25}, {tintColor: tintColor}]}
//               />
//               // <FontAwesome5 name={'home'} size={30} solid />
//             ),
//           showHeader,
//         }}
//         component={Home}
//       />
//       <Tab.Screen
//         name="User"
//         component={User}
//         options={{
//           // tabBarColor: '#b5fcff',
//           cardStyleInterpolator: forFade,
//           tabBarIcon: ({focused, tintColor}) =>
//             focused ? (
//               <Image
//                 source={require('./src/assets/imgs/user.png')}
//                 resizeMode="contain"
//                 style={[{width: 30, height: 25}, {tintColor: tintColor}]}
//               />
//             ) : (
//               <Image
//                 source={require('./src/assets/imgs/user-run.png')}
//                 resizeMode="contain"
//                 style={[{width: 30, height: 25}, {tintColor: tintColor}]}
//               />
//             ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// }

// const Drawerr = () => {
//   const [progress, setProgress] = React.useState(new Animatedd.Value(0));
//   const scale = Animatedd.interpolate(progress, {
//     inputRange: [0, 1],
//     outputRange: [1, 0.8],
//   });
//   const borderRadius = Animatedd.interpolate(progress, {
//     inputRange: [0, 1],
//     outputRange: [0, 16],
//   });
//
//   const animatedStyle = {borderRadius, transform: [{scale}]};
//
//   return (
//     <LinearGradient style={{flex: 1}} colors={['#E94057', '#4A00E0']}>
//       <Drawer.Navigator
//         // hideStatusBar
//         drawerType="slide"
//         overlayColor="transparent"
//         drawerStyle={styles.drawerStyles}
//         contentContainerStyle={{flex: 1}}
//         drawerContentOptions={{
//           activeBackgroundColor: 'transparent',
//           activeTintColor: 'white',
//           inactiveTintColor: 'white',
//         }}
//         sceneContainerStyle={{backgroundColor: 'transparent'}}
//         drawerContent={props => {
//           setProgress(props.progress);
//           return <DrawerContent {...props} />;
//         }}>
//         <Drawer.Screen name="Screens">
//           {props => <Screens {...props} style={animatedStyle} />}
//         </Drawer.Screen>
//       </Drawer.Navigator>
//     </LinearGradient>
//   );
// };

// function createTopTabs() {
//   return (
//     <MaterialTopTabs.Navigator initialRouteName="Tab3">
//       <MaterialTopTabs.Screen
//         name="Tab2"
//         option={{showHeader}}
//         component={Tab1}
//       />
//       <MaterialTopTabs.Screen
//         name="Tab3"
//         option={{showHeader}}
//         component={Tab2}
//       />
//     </MaterialTopTabs.Navigator>
//   );
// }

// function AccountDetail() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="DetailAccount"
//         options={showHeader}
//         component={DetailAccount}
//       />
//     </Stack.Navigator>
//   );
// }

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
            {/*{createHomeStack()}*/}
            <Index />
            {/*{AccountDetail()}*/}
            {/*{createTopTabs()}*/}
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  stack: {
    flex: 1,
    shadowColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 5,
    // overflow: 'scroll',
    // borderWidth: 1,
  },
  drawerStyles: {flex: 1, width: '50%', backgroundColor: 'transparent'},
  drawerItem: {alignItems: 'flex-start', marginVertical: 0},
  drawerLabel: {color: 'white', marginLeft: -16},
  avatar: {
    borderRadius: 60,
    marginBottom: 16,
    borderColor: 'white',
    borderWidth: StyleSheet.hairlineWidth,
  },
});
export default App;
