/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment, useEffect} from 'react';
import {
  Platform,
  Image,
  Dimensions,
  Animated,
  StyleSheet,
  Alert,
  TouchableOpacity,
  View,
} from 'react-native';

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
import {Provider, useDispatch, useSelector} from 'react-redux';
import Tab1 from '../tab/Tab1';
import Tab2 from '../tab/Tab2';
import Home from '../screens/Home';
import Screen2 from '../drawer/Screen2';
import User from '../screens/User';
import ForgetPassword from '../screens/ForgetPassword';
// login authentication flow
import indexStackTab from '../tab/indexStackTab';
import LoginHook from '../screens/LoginHook';
import {SignUpHook} from '../screens/SignUpHook';
import DetailFilm from '../screens/DetailFilm';
import ListFilm from '../screens/ListFilm';
import Seat from '../screens/Seat';
import SplashScreen from 'react-native-splash-screen';
// import configureStore from './src/redux/store/index';
// const store = configureStore();
import * as LoginAction from '../redux/actions/auth';

//persist
import {store, persistor} from '../redux/store/index';
import {PersistGate} from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-community/async-storage';
import {theme} from '../components/theme';

const MaterialTopTabs = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Stack1 = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
import LinearGradient from 'react-native-linear-gradient';
import styless, {colors} from '../constants/index.style';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Animatedd from 'react-native-reanimated';
import Block from '../components/block';
import Text from '../components/text';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DetailAccount from '../screens/DetailAccount';
import ListFilmSort from '../screens/ListFilmSort';
import ListFilmSearch from '../screens/ListFilmSearch';
import DemoAnt from '../screens/DemoAnt';
import Ticket from '../screens/Ticket';
import ListFilmSearchName from '../screens/ListFilmSearchName';

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

const Screens = ({navigation, style}) => {
  return (
    <Animatedd.View style={StyleSheet.flatten([styles.stack, style])}>
      <Stack.Navigator
        initialRouteName="Home"
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
            // <Image source={require('../assets/imgs/back1.png')} />
            <FontAwesome5Icon name="angle-left" size={30} color={'white'} />
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
          }}>
          {props => <LoginHook {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name="User"
          options={{
            // headerShown: true,
            cardStyleInterpolator: forFade,
          }}>
          {props => <User {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            // headerShown: true,
            title: 'HTV Cinemas',
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
              backgroundColor: 'transparent',
            },
            headerTintColor: '#fff',
            cardStyleInterpolator: forFade,
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <FontAwesome5Icon
                  name="ellipsis-v"
                  size={18}
                  color="black"
                  style={{paddingHorizontal: 10}}
                />
              </TouchableOpacity>
            ),
          }}>
          {/* {props => <Home {...props} />} */}
        </Stack.Screen>
        <Stack.Screen
          name="SignUp"
          options={{
            // headerShown: false,
            cardStyleInterpolator: forFade,
            headerStyleInterpolator: forFadeHeader,
          }}>
          {props => <SignUpHook {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name="Forgot"
          options={{
            // headerShown: false,
            drawerLockMode: 'locked-closed',
            gestureEnabled: false,
            swipeEnabled: false,
            cardStyleInterpolator: forFade,
            headerStyleInterpolator: forFadeHeader,
          }}>
          {props => <ForgetPassword {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name="DetailFilm"
          options={{
            // headerShown: false,
            cardStyleInterpolator: forFade,
            headerStyleInterpolator: forFadeHeader,
          }}>
          {props => <DetailFilm {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name="ListFilm"
          options={{
            cardStyleInterpolator: forFade,
            headerStyleInterpolator: forFadeHeader,
          }}>
          {props => <ListFilm {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name={'Seat'}
          options={{
            cardStyleInterpolator: forFade,
            headerStyleInterpolator: forFadeHeader,
          }}>
          {props => <Seat {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name="DetailAccount"
          options={{
            cardStyleInterpolator: forFade,
            headerStyleInterpolator: forFadeHeader,
          }}>
          {props => <DetailAccount {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name="ListFilmSort"
          options={{
            cardStyleInterpolator: forFade,
            headerStyleInterpolator: forFadeHeader,
          }}>
          {props => <ListFilmSort {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name="ListFilmSearch"
          options={{
            cardStyleInterpolator: forFade,
            headerStyleInterpolator: forFadeHeader,
          }}>
          {props => <ListFilmSearch {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name="Ticket"
          options={{
            cardStyleInterpolator: forFade,
            headerStyleInterpolator: forFadeHeader,
          }}>
          {props => <Ticket {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name="Demo"
          options={{
            cardStyleInterpolator: forFade,
            headerStyleInterpolator: forFadeHeader,
          }}>
          {props => <DemoAnt {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name="ListFilmSearchName"
          options={{
            cardStyleInterpolator: forFade,
            headerStyleInterpolator: forFadeHeader,
          }}
          component={ListFilmSearchName}>
          {/* {props => <ListFilmSearchName {...props} />} */}
        </Stack.Screen>
        {/*<Stack.Screen name="SliderEntry" component={SliderEntry} />*/}
      </Stack.Navigator>
    </Animatedd.View>
  );
};

const DrawerContent = props => {
  const user = useSelector(state => state.loginIn.user);
  const dispatch = useDispatch();

  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled={false}
      contentContainerStyle={{flex: 1}}>
      <Block top center>
        <Block
          flex={0.5}
          margin={3}
          // style={{marginLeft: '0%'}}
          white
          center
          bottom>
          <FontAwesome5
            name={'user'}
            size={90}
            resizeMode="center"
            color={'white'}
            style={styles.avatar}
          />
          {user === null ? (
            <Text center align={'center'} white>
              Bạn chưa đăng nhập
            </Text>
          ) : (
            <View
              style={{
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                alignContent: 'flex-start',
                margin: 0,
              }}>
              <View
                style={{
                  alignContent: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}>
                <Text center align={'center'} title white>
                  {user.user.email}
                </Text>
              </View>

              <DrawerItem
                label="Tài Khoản"
                labelStyle={{
                  color: 'black',
                  fontWeight: 'bold',
                  // marginLeft: -16,
                  fontSize: 20,
                }}
                style={styles.drawerItem}
                onPress={() => props.navigation.navigate('DetailAccount')}
                icon={() => (
                  <MaterialCommunityIcons name={'account-details'} size={30} />
                )}
              />

              <DrawerItem
                label="Quản Lý Vé"
                labelStyle={{
                  color: 'black',
                  fontWeight: 'bold',
                  // marginLeft: -16,
                  fontSize: 20,
                }}
                style={styles.drawerItem}
                onPress={() => props.navigation.navigate('Ticket')}
                icon={() => (
                  <MaterialCommunityIcons name={'account-details'} size={30} />
                )}
              />
            </View>
          )}
        </Block>
        {user === null ? (
          <Block>
            <DrawerItem
              label=""
              // labelStyle={styles.drawerLabel}
              style={{width: '0%'}}
              onPress={() => {}}
              // icon={() => <FontAwesome5 name={'sign-in-alt'} size={30} />}
            />
            <DrawerItem
              label="Đăng Nhập"
              labelStyle={styles.drawerLabel}
              style={styles.drawerItem}
              onPress={() => props.navigation.navigate('Login')}
              icon={() => <FontAwesome5 name={'sign-in-alt'} size={30} />}
            />
            <DrawerItem
              label="Đăng Ký "
              labelStyle={styles.drawerLabel}
              style={{alignItems: 'flex-start', marginVertical: 0}}
              onPress={() => props.navigation.navigate('SignUp')}
              icon={() => (
                <FontAwesome5 name={'user-plus'} color="black" size={30} />
              )}
            />
            {/*<DrawerItem*/}
            {/*  label="Contact us"*/}
            {/*  labelStyle={{color: 'white', marginLeft: -16}}*/}
            {/*  style={{alignItems: 'flex-start', marginVertical: 0}}*/}
            {/*  onPress={() => props.navigation.navigate('Login')}*/}
            {/*  icon={() => <AntDesign name="phone" color="white" size={16} />}*/}
            {/*/>*/}
          </Block>
        ) : null}
      </Block>
      {user === null ? null : (
        <Block flex={false}>
          <DrawerItem
            label="Đăng Xuất"
            labelStyle={{color: 'black', fontSize: 20, fontWeight: 'bold'}}
            icon={() => (
              <FontAwesome5 name="sign-out-alt" color={'red'} size={20} />
            )}
            onPress={() =>
              Alert.alert(
                'Thoát tài khoản ngay?',
                'Không thể đặt vé khi không có tài khoản',
                [
                  {
                    text: 'Hủy',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: () => {
                      console.log('OK Pressed');
                      dispatch(LoginAction.logout());
                    },
                  },
                ],
              )
            }
          />
        </Block>
      )}
    </DrawerContentScrollView>
  );
};

const Drawerr = () => {
  const [progress, setProgress] = React.useState(new Animatedd.Value(0));
  const scale = Animatedd.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  const borderRadius = Animatedd.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, 16],
  });

  const animatedStyle = {borderRadius, transform: [{scale}]};

  return (
    <LinearGradient
      style={{flex: 1}}
      colors={[colors.background1, colors.background2, colors.background3]}>
      <Drawer.Navigator
        // hideStatusBar
        drawerType="slide"
        overlayColor="transparent"
        drawerStyle={styles.drawerStyles}
        contentContainerStyle={{flex: 1}}
        drawerPosition="right"
        drawerContentOptions={{
          activeBackgroundColor: 'transparent',
          activeTintColor: 'white',
          inactiveTintColor: 'white',
        }}
        sceneContainerStyle={{backgroundColor: 'transparent'}}
        drawerContent={props => {
          setProgress(props.progress);
          return <DrawerContent {...props} />;
        }}>
        <Drawer.Screen name="Screens">
          {props => <Screens {...props} style={animatedStyle} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </LinearGradient>
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
  drawerLabel: {
    color: 'black',
    fontWeight: 'bold',
    marginLeft: -16,
    fontSize: 23,
  },
  avatar: {
    // borderRadius: 20,
    // marginBottom: 17,
    alignItems: 'center',
    justifyContent: 'center',
    // alignSelf: 'center',
    // borderColor: 'white',
    // borderWidth: StyleSheet.hairlineWidth,
  },
});
export default Drawerr;
