import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import TicketUnuse from '../tab/TicketUnuse';
import TicketUsed from '../tab/TicketUsed';
import * as types from '../constants';
import {CommonActions} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';

const mariner = '#3B5F8F';
const mediumPurple = '#8266D4';
const tomato = '#F95B57';
const mySin = '#F3A646';

const {width} = Dimensions.get('window');
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
const MaterialTopTicketTabs = createMaterialTopTabNavigator();

function Ticket({navigation, route}) {
  const user = useSelector(state => state.loginIn.user);
  const [ready, setReady] = useState(false);
  const colors = [mediumPurple, tomato];
  const [listTicket, setListTicket] = useState(null);
  const [image, setImage] = useState([]);
  const [done, setDone] = useState(false);
  navigation.setOptions({
    title: 'Lịch sử vé',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerRight: () => (
      <TouchableOpacity
        onPress={async () =>
          await navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{name: 'Home'}],
            }),
          )
        }>
        <Entypo name={'home'} size={40} color="black" />
      </TouchableOpacity>
    ),
  });
  useEffect(() => {
    let objImage = [];

    async function getListTicket() {
      let call = await fetch(`${types.API}ticket/find/`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.user.email,
        }),
      });
      let a = await call.json();
      if (a.ticket) {
        await setListTicket(a.ticket);
        await setReady(true);
      }

      // .then(r => r.json())
      // .then(async res => await setListTicket(res.ticket));
    }

    async function getListFilm() {
      let get = await fetch(`${types.API}film/find/`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      let json = await get.json();
      await json.film.map(async value => {
        await objImage.push({
          TenFilm: value.TenFilm,
          AnhBia: value.AnhBia,
        });
      });
      await setImage(objImage);
      await setReady(true);
    }
    getListTicket();
    getListFilm();
  }, []);

  return (
    <View style={{flex: 1}}>
      {ready === true ? (
        listTicket !== null ? (
          <MaterialTopTicketTabs.Navigator
            initialRouteName="Tab1"
            tabBarOptions={{
              labelStyle: {fontSize: 15, fontWeight: 'bold'},
              style: {backgroundColor: '#bfdde7'},
              activeTintColor: 'red',
              inactiveTintColor: 'gray',
              showIcon: true,
            }}>
            <MaterialTopTicketTabs.Screen
              name="Tab1"
              // component={Tab1}
              options={{tabBarLabel: 'Vé Chưa Sử Dụng'}}>
              {/*
      
                 Sử dụng cách đưới để truyền props được khi khởi tạo stack
                  Dung component={} không truyền được props đi
      
                 */}
              {props => (
                <TicketUnuse
                  films={listTicket
                    .filter(val => val.status === false)
                    .sort(
                      (a, b) =>
                        Date.parse(b.ThoiGianDat) -
                        Date.parse(a.ThoiGianDat),
                    )}
                  image={image}
                />
              )}
            </MaterialTopTicketTabs.Screen>
            <MaterialTopTicketTabs.Screen
              name="Tab2"
              // component={Tab2}
              options={{tabBarLabel: 'Vé Đã Sử Dụng'}}>
              {props => (
                <TicketUsed
                  films={listTicket
                    .filter(val => val.status === true)
                    .sort(
                      (a, b) =>
                        Date.parse(b.ThoiGianDat) -
                        Date.parse(a.ThoiGianDat),
                    )}
                  image={image}
                />
              )}
            </MaterialTopTicketTabs.Screen>
          </MaterialTopTicketTabs.Navigator>
        ) : (
          <View
            style={{
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'red',
                alignItems: 'center',
              }}>
              Bạn Chưa Có Giao Dịch Nào
            </Text>
          </View>
        )
      ) : null}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: null,
    height: null,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.9,
  },
  text: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'uppercase',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '40%',
  },
});
export default Ticket;
