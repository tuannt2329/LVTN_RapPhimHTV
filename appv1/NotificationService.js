import PushNotification from 'react-native-push-notification';
import {Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as types from './src/constants';

export default class NotificationService {
  //onNotificaitn is a function passed in that is to be called when a
  //notification is to be emitted.
  constructor(onNotification) {
    this.configure(onNotification);
    this.lastId = 0;
  }

  configure(onNotification) {
    PushNotification.configure({
      onNotification: onNotification,
      requestPermissions: Platform.OS === 'ios',

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: true,
    });
  }

  //Appears right away
  localNotification() {
    this.lastId++;
    let ab = '';
    var thoigianthuc = new Date();
    var thoigianxacthuc = thoigianthuc.getFullYear() + '-';
    if (thoigianthuc.getMonth() + 1 < 10) {
      thoigianxacthuc += '0';
    }
    thoigianxacthuc += thoigianthuc.getMonth() + 1 + '-';
    if (thoigianthuc.getDate() < 10) {
      thoigianxacthuc += '0';
    }
    thoigianxacthuc += thoigianthuc.getDate() + 'T';
    if (thoigianthuc.getHours() < 10) {
      thoigianxacthuc += '0';
    }
    thoigianxacthuc += thoigianthuc.getHours() + ':';
    if (thoigianthuc.getMinutes() < 10) {
      thoigianxacthuc += '0';
    }
    thoigianxacthuc += thoigianthuc.getMinutes() + ':';
    if (thoigianthuc.getSeconds() < 10) {
      thoigianxacthuc += '0';
    }
    thoigianxacthuc += thoigianthuc.getSeconds() + '.000Z';
    async function data() {
      ab = await AsyncStorage.getItem('username');
    }
    let call = [];
    async function getListTicket() {
      if (ab !== '') {
        let call1 = await fetch(`${types.API}ticket/find/`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: ab,
          }),
        });
        call = await call1.json();

        if (!call.error) {
          return await call.ticket.filter(
            a =>
              a.ThoiGianChieu.split('T')[0] === thoigianxacthuc.split('T')[0] &&
              parseTime(a.ThoiGianChieu.split('T')[1].slice(0, 5)) -
                parseTime(thoigianxacthuc.split('T')[1].slice(0, 5)) >
                1,
          );
        }
        return [];
      }
    }
    function parseTime(s) {
      var c = s.split(':');
      return parseInt(c[0]) * 60 + parseInt(c[1]);
    }
    data().then(
      async a1 =>
        await getListTicket().then(async a => {
          if (a.length > 0) {
            PushNotification.localNotification({
              title: 'HTV cinemas',
              message: `Bạn có ${a.length} vé phim chiếu hôm nay`,
              playSound: true,
              soundName: 'default',
              // actions: '["Yes", "No"]',
            });
          }
        }),
    );
  }

  //Appears after a specified time. App does not have to be open.
  scheduleNotification() {
    this.lastId++;
    // let t = this.getData();
    let ab = '';
    var thoigianthuc = new Date();
    var thoigianxacthuc = thoigianthuc.getFullYear() + '-';
    if (thoigianthuc.getMonth() + 1 < 10) {
      thoigianxacthuc += '0';
    }
    thoigianxacthuc += thoigianthuc.getMonth() + 1 + '-';
    if (thoigianthuc.getDate() < 10) {
      thoigianxacthuc += '0';
    }
    thoigianxacthuc += thoigianthuc.getDate() + 'T';
    if (thoigianthuc.getHours() < 10) {
      thoigianxacthuc += '0';
    }
    thoigianxacthuc += thoigianthuc.getHours() + ':';
    if (thoigianthuc.getMinutes() < 10) {
      thoigianxacthuc += '0';
    }
    thoigianxacthuc += thoigianthuc.getMinutes() + ':';
    if (thoigianthuc.getSeconds() < 10) {
      thoigianxacthuc += '0';
    }
    thoigianxacthuc += thoigianthuc.getSeconds() + '.000Z';
    async function data() {
      ab = await AsyncStorage.getItem('username');
    }
    let call = [];
    async function getListTicket() {
      if (ab !== '') {
        let call1 = await fetch(`${types.API}ticket/find/`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: ab,
          }),
        });
        call = await call1.json();
        if (!call.error) {
          return await call.ticket.filter(
            a =>
              a.ThoiGianChieu.split('T')[0] === thoigianxacthuc.split('T')[0] &&
              parseTime(a.ThoiGianChieu.split('T')[1].slice(0, 5)) -
                parseTime(thoigianxacthuc.split('T')[1].slice(0, 5)) >
                61,
          );
        }
        return [];
      }
    }
    function parseTime(s) {
      var c = s.split(':');
      return parseInt(c[0]) * 60 + parseInt(c[1]);
    }
    data().then(
      async a1 =>
        await getListTicket().then(async a => {
          if (a.length > 0) {
            let minutes =
              parseTime(a[0].ThoiGianChieu.split('T')[1].slice(0, 5)) -
              parseTime(thoigianxacthuc.split('T')[1].slice(0, 5));
            if (minutes > 60) {
              let plus = minutes - 60;
              await PushNotification.localNotificationSchedule({
                date: new Date(Date.now() + 60 * 1000 * plus), //30 seconds
                title: 'HTV cinemas',
                message: `Phim ${
                  a[0].TenFilm
                } của bạn còn 60 phút nữa đến giờ chiếu `,
                playSound: true,
                soundName: 'default',
              });
            }
          } else {
          }
        }),
    );
  }
  async getData() {
    return await AsyncStorage.getItem('username');
  }
  checkPermission(cbk) {
    return PushNotification.checkPermissions(cbk);
  }

  cancelNotif() {
    PushNotification.cancelLocalNotifications({id: '' + this.lastId});
  }

  cancelAll() {
    PushNotification.cancelAllLocalNotifications();
  }
}
