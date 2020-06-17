import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
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
import DateTimePickerModal from 'react-native-modal-datetime-picker';
const {width} = Dimensions.get('window');
import {useSelector} from 'react-redux';
import * as types from '../constants';

const MIN_HEIGHT = 100;
const MAX_HEIGHT = 250;

// Detail of the movie with data is passing from carousel through route
function DetailFilm({route, navigation}) {
  const {film} = route.params;
  const [modal, setModal] = useState(false);
  const [start, setStart] = useState(false);
  const [end, setEnd] = useState(false);
  const user = useSelector(state => state.loginIn.user);
  // Luu schedule
  const [schedule, setSchedule] = useState(null);
  // Lưu room
  const [room, setRoom] = useState(null);
  // const xử lý picker ngày giờ
  //
  // biến chính để lưu ngày
  const [date, setDate] = useState(null);
  // biến chính đe lưu giờ
  const [hour, setHours] = useState(null);
  //
  const [time, setTime] = useState(null);
  const [ok, setOK] = useState(false);
  const [show, setShow] = useState(false);
  // xu ly luu ngay gio : theo định dạng
  //  { ngay : gio }

  const [arrDate, setArrDate] = useState([{NgayChieu: null, GioChieu: []}]);
  let arr = [];
  const [haveSchedule, setHaveSchedule] = useState(null);
  // start date time picker
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    // setDate(date.toLocaleDateString());
    hideDatePicker();
  };
  //  start handle picker date
  function _renderPicker(item) {
    console.log('from render', item.ThoiGianChieu);

    return (
      <Picker.Item
        // key={item.ThoiGianChieu}
        value={item.ThoiGianChieu}
        label={item.ThoiGianChieu.split('T')[0]
          .slice(0, 10)
          .toString()}
      />
    );

    // return (
    //   <Picker.Item
    //     // key={item.ThoiGianChieu}
    //     value={item.ThoiGianChieu}
    //     label={item.ThoiGianChieu.split('T')[0]
    //       .slice(0, 10)
    //       .toString()}
    //   />
    // );
  }

  function selectedDate(item, index) {
    console.log('Ngay', item);
    setDate(item);
    arrDate.map(value => {
      if (value.NgayChieu === item) {
        setTime(value.GioChieu);
        setHours(value.GioChieu[0]);
      }
    });
    console.log(hour);
  }
  function selectedHour(item, index) {
    setHours(item);
    console.log('hours', item);
  }
  // end date time picker

  // unmount
  useEffect(() => {
    //month day year
    // const startDate = new Date(film.NgayChieu).toLocaleDateString('en-GB');
    // console.log(startDate);
    // setStart(startDate);
    // const endDate = new Date(film.NgayKetThuc).toLocaleDateString('en-GB');
    // console.log(endDate);
    // setEnd(endDate);

    const getList = async () => {
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
        .then(result =>
          result.schedule.filter(
            item => Date.parse(item.ThoiGianChieu) >= Date.parse(Date()),
          ),
        )
        .then(async res => {
          setSchedule(res);
          // xử lý mảng lưu object là
          // { ngày : giờ }
          await res.map((item, index) => {
            console.log(item.ThoiGianChieu.toString());
            let date = item.ThoiGianChieu;
            let i = 0;
            arr.map((value, vitri) => {
              if (
                date.split('T')[0].slice(0, 10) !==
                arr[vitri].NgayChieu.split('T')[0].slice(0, 10)
              ) {
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
              let date1 = item.ThoiGianChieu.split('T')[0].slice(0, 10);
              let time1 = item.ThoiGianChieu.split('T')[1].slice(0, 5);
              if (date1 === arr[id].NgayChieu.split('T')[0].slice(0, 10)) {
                a.push(time1);
              }
            });
            arr[id].GioChieu = a;
          });
          // await console.log(arr.slice(0, 1));
          await setArrDate(arr);
          // await setOK(true);
          await console.log('final', arrDate);
        })
        .then(r => {
          setOK(true);
        })
        .catch(e => {
          console.log('catch get list film ');
          console.log(e);
        });
    };

    if (Date.parse(film.NgayChieu) < Date.parse(Date())) {
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
            console.log(res);
            await setHaveSchedule(false);
            // await process();
          } else {
            console.log(res);
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
  }, []);

  useEffect(() => {
    const getList = async () => {
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
        .then(result =>
          result.schedule.filter(
            item => Date.parse(item.ThoiGianChieu) >= Date.parse(Date()),
          ),
        )
        .then(async res => {
          setSchedule(res);
          // xử lý mảng lưu object là
          // { ngày : giờ }
          await res.map((item, index) => {
            console.log(item.ThoiGianChieu.toString());
            let date = item.ThoiGianChieu;
            let i = 0;
            arr.map((value, vitri) => {
              if (
                date.split('T')[0].slice(0, 10) !==
                arr[vitri].NgayChieu.split('T')[0].slice(0, 10)
              ) {
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
              let date1 = item.ThoiGianChieu.split('T')[0].slice(0, 10);
              let time1 = item.ThoiGianChieu.split('T')[1].slice(0, 5);
              if (date1 === arr[id].NgayChieu.split('T')[0].slice(0, 10)) {
                a.push(time1);
              }
            });
            arr[id].GioChieu = a;
          });
          // await console.log(arr.slice(0, 1));
          await setArrDate(arr);
          // await setOK(true);
          await console.log('final', arrDate);
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
      console.log('func process');
      console.log(haveSchedule);
      if (haveSchedule === true) {
        await console.log('Co Schedule');
        // await getList().then(r => setOK(true));
        await getList();
      }
      if (haveSchedule === false) {
        await console.log('Chua Co Schedule');
        await setHaveSchedule(false);
        await setShow(true);
      }
    };
    process();
  }, [haveSchedule]);
  
  useEffect(() => {
    async function a() {
      if (ok) {
        console.log('set show');
        await setShow(true);
        await setTime(arrDate[0].GioChieu);
        await setDate(arrDate[0].NgayChieu);
        await setHours(arrDate[0].GioChieu[0]);
      }
    }
    a();
  }, [ok]);
  //
  // var fullDate = new Date(film.NgayKetThuc);
  // console.log(fullDate);
  // var twoDigitMonth = fullDate.getMonth() + '';
  // if (twoDigitMonth.length == 1) twoDigitMonth = '0' + twoDigitMonth;
  // var twoDigitDate = fullDate.getDate() + '';
  // if (twoDigitDate.length == 1) twoDigitDate = '0' + twoDigitDate;
  // const endDate =
  //   twoDigitDate + '/' + twoDigitMonth + '/' + fullDate.getFullYear();
  // console.log(endDate);

  // var startDate = new Date(film.NgayChieu);
  // console.log(startDate);
  // var twoDigitMonth1 = startDate.getMonth() + '';
  // if (twoDigitMonth1.length == 1) twoDigitMonth1 = '0' + twoDigitMonth1;
  // var twoDigitDate2 = startDate.getDate() + '';
  // if (twoDigitDate2.length == 1) twoDigitDate2 = '0' + twoDigitDate2;
  // const start =
  //   twoDigitDate + '/' + twoDigitMonth + '/' + startDate.getFullYear();
  // console.log(endDate);

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
        {/* <Image
          source={require('../assets/imgs/home.png')}
          style={{height: 30, width: 50}}
          resizeMode="contain"
        /> */}
        <AntDesign name={'home'} size={40} color="black" />
      </TouchableOpacity>
    ),
  });
  return (
    <View flex={1}>
      <View flex={8}>
        <Item film={film} />
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
                  'Hủy Quá Trình Đặt Vé.',
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
              <View style={{flex: 2}} />
              {/*
                  view cho phần modal không transparent
                    50 % phía dưới
              */}
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  elevation: 10,
                  paddingBottom: 0,
                }}>
                {/*
                    View Button X đóng modal
                  */}
                <View
                  style={{
                    flex: 1,
                    alignContent: 'center',
                    width: '15%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    borderColor: 'red',
                    // borderTopWidth: 6,
                    borderBottomWidth: 1,

                    marginBottom: 0,

                    elevation: 20,
                    borderRadius: 25,
                    overflow: 'hidden',
                  }}>
                  <AntDesign
                    // name="closecircle"
                    name="circledown"
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
                    backgroundColor: 'white',
                    alignItems: 'center',
                    borderColor: 'red',
                    borderWidth: 2,
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
                      backgroundColor: 'white',
                      width: '100%',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                    }}>
                    <View style={{flex: 1, width: '100%'}}>
                      <Text
                        style={{
                          marginTop: 10,
                        }}>
                        Chọn Ngày:
                      </Text>
                      {/* <TouchableOpacity onPress={showDatePicker}>
                      <FontAwesome5Icon
                        name="calendar"
                        size={40}
                        color="black"
                        style={{width: '100%'}}
                      />
                    </TouchableOpacity>
                    <DateTimePickerModal
                      isVisible={isDatePickerVisible}
                      mode="date"
                      onConfirm={handleConfirm}
                      onCancel={hideDatePicker}
                      // value={new Date(start)}
                      minimumDate={new Date(start)}
                      maximumDate={new Date(end)}
                    />
                    <Text>{date}</Text> */}
                      <Picker
                        itemStyle={{
                          // flex: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                          textAlign: 'center',
                        }}
                        selectedValue={date}
                        style={{top: 15, width: '100%'}}
                        mode="dropdown"
                        onValueChange={(itemValue, itemIndex) =>
                          selectedDate(itemValue, itemIndex)
                        }>
                        {show === false || haveSchedule === false
                          ? null
                          : arrDate.map((item, id) => (
                              <Picker.Item
                                id={id}
                                value={item.NgayChieu}
                                label={item.NgayChieu.split('T')[0]
                                  .slice(0, 10)
                                  .split('-')
                                  .reverse()
                                  .join('-')
                                  .toString()}
                              />
                            ))}
                      </Picker>
                    </View>
                    <View style={{flex: 1, width: '100%'}}>
                      <Text
                        style={{
                          marginTop: 10,
                        }}>
                        Chọn giờ:
                      </Text>
                      <Picker
                        itemStyle={{
                          // flex: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                          textAlign: 'center',
                        }}
                        selectedValue={hour}
                        style={{top: 15, width: '100%'}}
                        mode="dropdown"
                        onValueChange={(itemValue, itemIndex) =>
                          selectedHour(itemValue, itemIndex)
                        }>
                        {date !== null
                          ? time.map(val => (
                              <Picker.Item label={val.toString()} value={val} />
                            ))
                          : null}
                      </Picker>
                      <Text>
                        {haveSchedule ? null : 'Phim chua co lich chieu'}
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
                    <TouchableOpacity
                      onPress={() => {
                        if (date === null || hour === null) {
                          Alert.alert(
                            'Chon thời gian',
                            'Chọn đầy đủ ngày và giờ chiếu',
                          );
                        } else {
                          let a;
                          schedule.map(val => {
                            if (
                              val.ThoiGianChieu.split('T')[0].slice(0, 10) ===
                                date.split('T')[0].slice(0, 10) &&
                              val.ThoiGianChieu.split('T')[1].slice(0, 5) ===
                                hour
                            ) {
                              console.log(val);
                              a = val;
                              console.log(a);
                            }
                          });
                          navigation.navigate('Seat', {schedule: a}),
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
                          width: '40%',
                          overflow: 'hidden',
                        }}>
                        Chọn Ghế
                      </Textt>
                    </TouchableOpacity>
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
                  // if (new Date(start) > new Date()) {
                  //   Alert.alert(
                  //     'Phim chưa được công chiếu',
                  //     `Trở lại vào ngày ${start}`,
                  //   );
                  //   return;
                  // } else {
                  //   {
                  user === null
                    ? Alert.alert(
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
                      )
                    : setModal(true);
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
