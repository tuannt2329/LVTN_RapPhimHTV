import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  Image,
  FlatList,
  Picker,
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
  Alert,
  Text,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Block from '../components/block';
import Textt from '../components/text';
import {theme} from '../components/theme';
import Item from '../components/detailScrollView/Item';
import {CommonActions} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import styless from '../constants/index.style';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
const {width} = Dimensions.get('window');
import {useSelector} from 'react-redux';
import * as types from '../constants';
import Entypo from 'react-native-vector-icons/Entypo';
import {useIsFocused} from '@react-navigation/native';

const MIN_HEIGHT = 100;
const MAX_HEIGHT = 250;

// Detail of the movie with data is passing from carousel through route
function DetailFilm({route, navigation}) {
  const {film} = route.params;
  const [modal, setModal] = useState(false);
  const isFocused = useIsFocused();

  const user = useSelector(state => state.loginIn.user);
  // Luu schedule
  const [schedule, setSchedule] = useState(null);
  //
  // biến chính để lưu ngày
  const [date, setDate] = useState(null);
  // biến chính đe lưu giờ
  const [hour, setHours] = useState(null);
  //
  const [time, setTime] = useState(null);
  const [ok, setOK] = useState(false);
  const [show, setShow] = useState(false);
  const [filmLoad, setFilmLoad] = useState(null);
  // xu ly luu ngay gio : theo định dạng
  //  { ngay : gio }

  const [arrDate, setArrDate] = useState([{NgayChieu: null, GioChieu: []}]);

  const [haveSchedule, setHaveSchedule] = useState(null);

  function selectedDate(item, index) {
    setDate(item.NgayChieu);
    arrDate.map(value => {
      if (value.NgayChieu === item.NgayChieu) {
        setTime(value.GioChieu);
        setHours(value.GioChieu[0]);
      }
    });
  }
  function selectedHour(item, index) {
    setHours(item);
  }
  // function handle load
  function handle() {
    const getFilmLoad = async () => {
      let popo = await fetch(`${types.API}film/find/`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          TenFilm: film.TenFilm,
        }),
      });
      let popores = await popo.json();
      await setFilmLoad(popores.film[0]);
    };
    getFilmLoad();
    let currentTime = '';
    let currentMonth = '';
    let currentDay = '';
    let currentMinute = '';
    let currentyear = '';
    let now = new Date();
    now.getHours() < 10
      ? (currentTime += `0${now.getHours()}`)
      : (currentTime += now.getHours());
    now.getMonth() < 10
      ? (currentMonth += '0' + (now.getMonth() + 1))
      : (currentMonth += now.getMonth() + 1);
    now.getDate() < 10
      ? (currentDay += `0${now.getDate()}`)
      : (currentDay += now.getDate());
    now.getMinutes() < 10
      ? (currentMinute += `0${now.getMinutes()}`)
      : (currentMinute += now.getMinutes());
    currentyear +=
      now.getFullYear() +
      '-' +
      currentMonth +
      '-' +
      currentDay +
      'T' +
      currentTime +
      ':' +
      currentMinute +
      ':00.000Z';
    if (film.NgayChieu < currentyear) {
      const callhihi = async () => {
        let t = await fetch(`${types.API}schedule/find/`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            TenFilm: film.TenFilm,
          }),
        });
        let res = await t.json();
        async function a() {
          if (res.error === "schedule don't exist!") {
            await setHaveSchedule(false);
            // await process();
          } else {
            await setHaveSchedule(true);
            // await process();
          }
        }
        await a();
        // await process();
      };

      callhihi();
      //process();
    } else {
      setHaveSchedule(false);
    }
  }

  // unmount
  // useEffect(() => handle(), []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      handle();
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const getList = async () => {
    console.log('dang chay trong day ne');

    let currentTime = '';
    let currentMonth = '';
    let currentDay = '';
    let currentMinute = '';
    let currentyear = '';
    let now = new Date();
    now.getHours() < 10
      ? (currentTime += `0${now.getHours()}`)
      : (currentTime += now.getHours());
    now.getMonth() < 10
      ? (currentMonth += '0' + (now.getMonth() + 1))
      : (currentMonth += now.getMonth() + 1);
    now.getDate() < 10
      ? (currentDay += `0${now.getDate()}`)
      : (currentDay += now.getDate());
    now.getMinutes() < 10
      ? (currentMinute += `0${now.getMinutes()}`)
      : (currentMinute += now.getMinutes());
    currentyear +=
      now.getFullYear() +
      '-' +
      currentMonth +
      '-' +
      currentDay +
      'T' +
      currentTime +
      ':' +
      currentMinute +
      ':00.000Z';
    await fetch(`${types.API}schedule/find/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        TenFilm: film.TenFilm,
      }),
    })
      .then(res => res.json())
      .then(result => {
        return result.schedule.filter(item => item.ThoiGianChieu > currentyear);
      })
      .then(async res => {
        setSchedule(res);
        // xử lý mảng lưu object là
        // { ngày : giờ }
        let arr = [];
        await res.map((item, index) => {
          let date = item.ThoiGianChieu.split('T')[0];
          let i = 0;
          arr.map((value, vitri) => {
            if (date !== value.NgayChieu) {
              i++;
            }
          });

          if (i === arr.length) {
            arr.push({NgayChieu: date});
          }
        });
        await arr.map((val, id) => {
          let a = [];
          res.map((item, i) => {
            let currentTime = '';
            let currentMonth = '';
            let currentDay = '';
            let currentMinute = '';
            let currentdatetime = '';
            let currentyear = '';
            let now = new Date();
            now.getHours() < 10
              ? (currentTime += `0${now.getHours()}`)
              : (currentTime += now.getHours());
            now.getMonth() < 10
              ? (currentMonth += '0' + (now.getMonth() + 1))
              : (currentMonth += now.getMonth() + 1);
            now.getDate() < 10
              ? (currentDay += `0${now.getDate()}`)
              : (currentDay += now.getDate());
            now.getMinutes() < 10
              ? (currentMinute += `0${now.getMinutes()}`)
              : (currentMinute += now.getMinutes());
            currentdatetime += currentTime + ':' + currentMinute;
            currentyear +=
              now.getFullYear() + '-' + currentMonth + '-' + currentDay;

            let date1 = item.ThoiGianChieu.split('T')[0].slice(0, 10);
            let time1 = item.ThoiGianChieu.split('T')[1].slice(0, 5);
            if (date1 === val.NgayChieu) {
              // console.log(val[id].NgayChieu);
              if (currentyear === date1 && time1 < currentdatetime) {
              } else {
                a.push(time1);
              }
            }
          });
          // a.sort((a, b) => {
          //   console.log(a,b);
          //   a.slice(0, 2) - b.slice(0, 2);
          // });
          // console.log( a.sort((a, b) => {
          //   a.slice(0, 2) - b.slice(0, 2);
          // }));
          arr[id].GioChieu = a.sort();
        });
        // await console.log(arr.slice(0, 1));
        await setArrDate(arr);
      })
      .then(r => {
        setOK(true);
      })
      .catch(e => {
        console.log('catch get list film ');
        console.log(e);
      });
  };

  const process = async () => {
    if (haveSchedule === true) {
      // await getList().then(r => setOK(true));
      await getList();
    }
    if (haveSchedule === false) {
      await setHaveSchedule(false);
      await setShow(true);
    }
  };

  useEffect(() => {
    process();
  }, [haveSchedule]);

  useEffect(() => {
    async function a() {
      if (ok) {
        await setShow(true);

        await setTime(arrDate[0].GioChieu);
        await setDate(arrDate[0].NgayChieu);
        await setHours(arrDate[0].GioChieu[0]);
      }
    }
    a();
  }, [ok]);

  function renderScrollHorizontal({item}) {
    let day = new Date(item.NgayChieu.split('T')[0]);
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          width: 120,
          borderRadius: 10,
          justifyContent: 'center',
          margin: 2,
          alignSelf: 'center',
          textAlign: 'center',
        }}>
        <LinearGradient
          start={{x: 0.0, y: 0.2}}
          end={{x: 0, y: 1.0}}
          locations={[0.1, 0.5, 0.2]}
          colors={['#5F9AF2', '#D8B4D8', '#5465D6']}
          style={{
            backgroundColor: 'transparent',
            borderRadius: 10,
            borderWidth: 1,
            width: 120,
            borderColor: 'orange',
            borderBottomWidth: 2,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 10,
          }}>
          <TouchableOpacity onPress={() => selectedDate(item)}>
            <Text
              style={{
                color: 'white',
                margin: 10,
                textAlign: 'center',
                fontSize: 17,
                fontWeight: 'bold',
                textTransform: 'uppercase',
              }}>
              {day.getDay() === 0
                ? `Chủ Nhật`
                : day.getDay() === 1
                ? `Thứ 2`
                : day.getDay() === 2
                ? `Thứ 3`
                : day.getDay() === 3
                ? 'Thứ 4'
                : day.getDay() === 4
                ? `Thứ 5`
                : day.getDay() === 5
                ? `Thứ 6`
                : day.getDay() === 6
                ? `Thứ 7`
                : null}
            </Text>
            <Text
              style={{
                color: 'red',
                margin: 5,
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: 30,
              }}>
              {item.NgayChieu.split('T')[0].slice(8, 10)
              // .split('-')
              // .reverse()
              // .join('-')
              }
            </Text>
            <Text
              style={{
                color: 'white',
                margin: 5,
                textAlign: 'center',
                fontSize: 16,
              }}>
              Tháng {item.NgayChieu.split('T')[0].slice(5, 7)}
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  }
  //

  navigation.setOptions({
    title: 'Nội Dung Phim',
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

  return (
    <View flex={1}>
      <View flex={8}>
        {filmLoad !== null ? <Item user={user} film={filmLoad} /> : null}
      </View>
      <View
        flex={1}
        style={{
          justifyContent: 'center',
          backgroundColor: '#fff',
        }}>
        <Block padding={[0, theme.sizes.base * 2]}>
          <Block middle center>
            {/*
                  modal
            */}
            <Modal
              animationType={'slide'}
              transparent={true}
              visible={modal}
              backdropOpacity={0.9}
              animationIn="zoomInDown"
              animationOut="zoomOutUp"
              animationInTiming={300}
              animationOutTiming={300}
              backdropTransitionInTiming={300}
              backdropTransitionOutTiming={300}
              //
              onRequestClose={() => {
                Alert.alert(
                  'Hủy Quá Trình Đặt Vé',
                  'Trở về ?',
                  [
                    {
                      text: 'Ok',
                      onPress: () => setModal(false),
                    },
                    {
                      text: 'Không',
                      style: 'cancel',
                    },
                  ],
                  {cancelable: false},
                );
              }}
              style={{
                margin: 0,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {/*
                  View cho phần modal bị transparent 50% phía trên
              */}
              <View style={{flex: 1}} />
              {/*
                  view cho phần modal không transparent
                    50 % phía dưới
              */}
              <View
                style={{
                  flex: 3,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  // elevation: 10,
                  paddingBottom: 0,
                  borderRadius: 30,
                }}>
                {/*
                    View Button X đóng modal
                  */}
                <View
                  style={{
                    flex: 0.3,
                    alignContent: 'center',
                    width: '15%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    borderColor: 'red',
                    borderBottomWidth: 1,
                    marginBottom: 0,
                    elevation: 20,
                    borderRadius: 25,
                    overflow: 'hidden',
                  }}>
                  <AntDesign
                    // name="closecircle"
                    name="closecircle"
                    size={40}
                    color="red"
                    style={styles.btnCloseModal}
                    onPress={() => {
                      setModal(false);
                    }}
                  />
                </View>
                {/*

                  View another content

                */}
                <View
                  style={{
                    flex: 3,
                    width: '100%',
                    // justifyContent: 'center',
                    backgroundColor: '#f0ede6',
                    alignItems: 'center',
                    // borderColor: 'red',
                    borderWidth: 3,
                    elevation: 40,
                    borderTopEndRadius: 20,
                    borderTopStartRadius: 20,
                  }}>
                  {/*
                  <View>
                  */}
                  <View
                    style={{
                      // flexDirection: 'row',
                      // alignContent: 'space-between',
                      flex: 2,
                      backgroundColor: '#f0ede6',
                      width: '100%',
                      flexDirection: 'column',
                      flexWrap: 'wrap',
                      borderRadius: 30,
                    }}>
                    {show === false ||
                    haveSchedule === false ||
                    arrDate.length <= 0 ? null : (
                      <View style={{flex: 2, width: '100%'}}>
                        <Text
                          style={{
                            marginTop: '3%',
                            fontSize: 17,
                            fontWeight: 'bold',
                            marginLeft: '3%',
                            // textAlign: 'center',
                          }}>
                          Chọn ngày chiếu
                        </Text>

                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'column',
                            width: '100%',
                            // margin: '3%',
                          }}>
                          <View style={{height: '100%'}}>
                            <FlatList
                              style={{
                                backgroundColor: 'white',
                                borderRadius: 30,
                                opacity: 0.8,
                                // margin: '2%',
                              }}
                              horizontal={true}
                              data={arrDate.sort((a, b) =>
                                Date.parse(a.NgayChieu) >
                                Date.parse(b.NgayChieu)
                                  ? 1
                                  : Date.parse(b.NgayChieu) >
                                    Date.parse(a.NgayChieu)
                                  ? -1
                                  : 0,
                              )}
                              renderItem={renderScrollHorizontal}
                            />
                          </View>
                        </View>
                      </View>
                    )}
                    <View
                      style={{flex: 1, width: '100%', alignItems: 'center'}}>
                      {date !== null ? (
                        <>
                          <Text
                            style={{
                              marginTop: 10,
                              fontSize: 17,
                              fontWeight: 'bold',
                              textAlign: 'center',
                            }}>
                            {`Các suất chiếu trong ngày ${date
                              .split('T')[0]
                              .slice(0, 10)
                              .split('-')
                              .reverse()
                              .join('-')}`}
                          </Text>
                          <View
                            style={{
                              borderRadius: 25,
                              borderWidth: 2,
                              margin: '2%',
                              // height: '45%',
                              width: '45%',
                              borderColor: 'orange',
                              alignItems: 'center',
                              justifyContent: 'center',
                              // borderColor: '#bdc3c7',
                              overflow: 'hidden',
                            }}>
                            <Picker
                              itemStyle={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                                alignSelf: 'center',
                                margin: 10,
                                // backgroundColor: '#D8B4D8',
                                // overflow: 'hidden',
                              }}
                              selectedValue={hour}
                              style={{
                                // top: 15,
                                // backgroundColor: '#D8B4D8',
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                                color: 'red',
                                margin: '3%',
                              }}
                              mode="dropdown"
                              onValueChange={(itemValue, itemIndex) =>
                                selectedHour(itemValue, itemIndex)
                              }>
                              {date !== null
                                ? time.map(val => (
                                    <Picker.Item
                                      label={val.toString()}
                                      value={val}
                                    />
                                  ))
                                : null}
                            </Picker>
                          </View>
                          <Text
                            style={{
                              marginTop: 20,
                              fontSize: 17,
                              fontWeight: 'bold',
                              textAlign: 'center',
                            }}>
                            {`Bạn đang chọn suất chiếu: ${hour}
                             `}
                          </Text>
                        </>
                      ) : null}

                      <Text
                        style={{
                          color: 'blue',
                          fontSize: 22,
                          fontWeight: 'bold',
                          width: '100%',
                          top: '50%',
                          alignItems: 'center',
                          textAlign: 'center',
                          justifyContent: 'center',
                        }}>
                        {haveSchedule && arrDate.length > 0
                          ? null
                          : 'Phim tạm thời chưa có lịch chiếu,\n nhấn theo dõi để nhận thông báo về email khi có lịch chiếu mới!'}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: 'transparent',
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    {!haveSchedule || arrDate.length <= 0 ? null : (
                      <TouchableOpacity
                        onPress={() => {
                          let currentTime = '';
                          let currentMonth = '';
                          let currentDay = '';
                          let currentMinute = '';

                          let now = new Date();
                          now.getHours() < 10
                            ? (currentTime += `0${now.getHours()}`)
                            : (currentTime += now.getHours());
                          now.getMonth() < 10
                            ? (currentMonth += `0${now.getMonth()}` + 1)
                            : (currentMonth += now.getMonth() + 1);
                          now.getDate() < 10
                            ? (currentDay += `0${now.getDate()}`)
                            : (currentDay += now.getDate());
                          now.getMinutes() < 10
                            ? (currentMinute += `0${now.getMinutes()}`)
                            : (currentMinute += now.getMinutes());

                          if (user === null) {
                            Alert.alert(
                              'Đăng Nhập Ngay?',
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
                                    setModal(false);
                                    navigation.navigate('Login', {
                                      continueBooking: true,
                                    });
                                  },
                                },
                              ],
                            );
                          } else if (
                            Number(hour.slice(0, 2)) - Number(currentTime) <=
                              1 &&
                            Number(date.split('T')[0].slice(5, 7)) ===
                              Number(currentMonth) &&
                            Number(date.split('T')[0].slice(8, 10)) ===
                              Number(currentDay) &&
                            Number(date.split('T')[1].slice(3, 5)) -
                              Number(currentMinute) >
                              1
                          ) {
                            Alert.alert(
                              'Suất đã kết thúc',
                              'Xin mời chọn suất khác',
                            );
                          } else {
                            let a;
                            schedule.map(val => {
                              if (
                                val.ThoiGianChieu.split('T')[0].slice(0, 10) ===
                                  date &&
                                val.ThoiGianChieu.split('T')[1].slice(0, 5) ===
                                  hour
                              ) {
                                a = val;
                              }
                            });
                            setHaveSchedule(null);
                            setHours(null);
                            setDate(null);
                            setOK(false);
                            setSchedule(null);
                            setShow(false);
                            setTime(null);
                            setFilmLoad(null);
                            setArrDate([{NgayChieu: null, GioChieu: []}]);
                            navigation.navigate('Seat', {
                              schedule: a,
                              detailfilm: film,
                            }),
                              setModal(false);
                          }
                        }}
                        style={styles.btn_Choose}>
                        <LinearGradient
                          // start={{x: 0, y: 0}}
                          // end={{x: 1, y: 1}}
                          startPoint={{x: 1, y: 0}}
                          endPoint={{x: 0, y: 1}}
                          start={{x: 0, y: 0}}
                          end={{x: 1, y: 1}}
                          locations={[0.1, 0.9]}
                          colors={['#d53369', '#cbad6d']}
                          style={styless.gradient}
                        />
                        <Textt
                          bold
                          white
                          h1
                          center
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            overflow: 'hidden',
                          }}>
                          Chọn Ghế
                        </Textt>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
                {/*</View>*/}
                {/*<View style={{flex: 2, backgroundColor: 'red', width: '100%'}}>*/}
                {/*  <FontAwesome5Icon name="backspace" size={40} />*/}
                {/*</View>*/}
              </View>
            </Modal>
            {/*
              button show modal
            */}
            {Date.parse(film.NgayChieu) > Date.parse(Date()) ? (
              <TouchableOpacity
                onPress={() => {
                  // if (new Date(start) > new Date()) {
                  Alert.alert(
                    'Phim chưa được công chiếu',
                    `Trở lại vào ngày ${film.NgayChieu.split('T')[0]
                      .slice(0, 10)
                      .split('-')
                      .reverse()
                      .join('-')}`,
                  );
                  // }
                  // setModal(true);
                }}
                style={styles.btn}>
                <LinearGradient
                  // start={{x: 0, y: 0}}
                  // end={{x: 1, y: 1}}
                  startPoint={{x: 1, y: 0}}
                  endPoint={{x: 0, y: 1}}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  locations={[0.1, 0.9]}
                  colors={['#d53369', '#cbad6d']}
                  style={styless.gradient}
                />
                <Textt
                  bold
                  white
                  h1
                  center
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '80%',
                    overflow: 'hidden',
                  }}>
                  ĐẶT VÉ NGAY
                </Textt>
              </TouchableOpacity>
            ) : show === true ? (
              <TouchableOpacity
                // gradient
                onPress={() => {
                  setModal(true);
                  //   }
                  // }
                  // setModal(true);
                }}
                style={styles.btn}>
                <LinearGradient
                  // start={{x: 0, y: 0}}
                  // end={{x: 1, y: 1}}
                  startPoint={{x: 1, y: 0}}
                  endPoint={{x: 0, y: 1}}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  locations={[0.1, 0.9]}
                  colors={['#d53369', '#cbad6d']}
                  style={styless.gradient}
                />
                <Textt
                  bold
                  white
                  h1
                  center
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '80%',
                    overflow: 'hidden',
                  }}>
                  ĐẶT VÉ NGAY
                </Textt>
              </TouchableOpacity>
            ) : null}
          </Block>
        </Block>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionLarge: {
    height: 600,
  },
  modalContent: {
    top: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',

    borderColor: '#ddd',
    borderBottomWidth: 0,

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,

    borderRadius: 20,
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 5,
    paddingBottom: 10,
    borderWidth: 1,
    overflow: 'hidden',
  },
  btn_Choose: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',

    borderColor: '#ddd',
    borderBottomWidth: 0,

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,

    borderRadius: 20,
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 5,
    paddingBottom: 10,
    borderWidth: 1,
    overflow: 'hidden',
  },
  btnCloseModal: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 40,
  },
  dateTimeText: {
    fontSize: 16,
    fontWeight: 'normal',
  },
});
export default DetailFilm;
