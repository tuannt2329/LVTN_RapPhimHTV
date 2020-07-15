import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
  FlatList,
  Alert,
  Modal,
  TouchableHighlight,
} from 'react-native';
import {ButtonGroup} from 'react-native-elements';
import {WebView} from 'react-native-webview';
import {CommonActions} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as types from '../constants';
import {useSelector} from 'react-redux';
import DotIndicator from '../components/indicator/DotIndicator';
import LinearGradient from 'react-native-linear-gradient';
import styless from '../constants/index.style';
import {useIsFocused} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';

const couple = [
  {key: 'Y1', color: 'pink'},
  {key: 'Y2', color: 'pink'},
  {key: 'Y3', color: 'pink'},
];

const numColumns = 15;

function Seat({route, navigation}) {
  const {schedule} = route.params;
  const {detailfilm} = route.params;
  const isFocused = useIsFocused();

  navigation.setOptions({
    // title: `Chọn Ghế ${film.TenFilm}`,
    title: 'Chọn Ghế ',
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
  const [pick, setPick] = useState(false);
  const [color, setColor] = useState('white');

  // const numColumns = 15;
  const [seatPick, setSeatPick] = useState([]);
  // const seat = JSON.parse(JSON.stringify(data));
  const [seatPicked, setSeatPicked] = useState([]);
  const [seatPickedCouple, setSeatPickedCouple] = useState([]);
  const [listSeat, setListSeat] = useState([]);
  const [listSeatCouple, setListSeatCouple] = useState([]);
  const [amount, setAmount] = useState(0);
  // tạo biến seat để tránh sự thay đổi trực tiếp vào [data] ghế
  // su dung JSON.parse(JSON.stringify()) để deep copy
  const [seat, setSeat] = useState(JSON.parse(JSON.stringify(listSeat)));
  const [cost, setCost] = useState([]);

  const [done, setDone] = useState(false);
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalTicket, setShowModalTicket] = useState(false);
  const user = useSelector(state => state.loginIn.user);
  const buttons = ['Online', 'Tại Quầy'];
  const [selectedIndex, setSelectedIndex] = useState(0);
  let a = '',
    b = '';

  const [url, setUrl] = useState(null);
  const [showModalWebview, setShowModalWebview] = useState(false);
  const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
    while (
      numberOfElementsLastRow !== numColumns &&
      numberOfElementsLastRow !== 0
    ) {
      data.push({key: `blank-${numberOfElementsLastRow}`, empty: true});
      numberOfElementsLastRow++;
    }
    return data;
  };

  function pressItems(item) {
    // console.log(item);
    if (item.Color === 'red') {
      Alert.alert('Không thể chọn', 'Ghế đã được đặt, chọn ghế trống', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else {
      // nhấn vào ghế đã được chọn
      if (seatPick.includes(item.key)) {
        // console.log('ton tai');
        setSeatPick(seatPick.filter(e => e !== item.key));
        // Khong su dung map vi map se copy shadow, va reformat stucture của đối tượng
        // Using map to reformat objects in an array // mozilla

        // Xử lý mảng ghế couple bằng slice key
        // để nhận biết đang chọn loại ghế nào

        // Khong phai ghe couple
        if (item.key.slice(0, 1) !== 'R') {
          for (let i = 0; i < seat.length; i++) {
            if (seat[i].key === item.key) {
              seat[i].Color = '#e2ab32';
            }
          }
          cost.map(value => {
            if (value.LoaiVe === 'VIP') {
              setAmount(res => res - value.GiaVe);
            }
          });
        } else {
          for (let i = 0; i < listSeatCouple.length; i++) {
            if (listSeatCouple[i].key === item.key) {
              listSeatCouple[i].Color = 'pink';
            }
          }
          cost.map(value => {
            if (value.LoaiVe === 'COUPLE') {
              setAmount(res => res - value.GiaVe);
            }
          });
        }
      }
      // nhấn vào ghế chưa chọn
      else {
        setSeatPick(items => [...items, item.key]);
        // Khong phai ghe couple
        if (item.key.slice(0, 1) !== 'R') {
          for (let i = 0; i < seat.length; i++) {
            if (seat[i].key === item.key) {
              seat[i].Color = 'blue';
            }
          }
          cost.map(value => {
            if (value.LoaiVe === 'VIP') {
              setAmount(res => res + value.GiaVe);
            }
          });
        } else {
          for (let i = 0; i < listSeatCouple.length; i++) {
            if (listSeatCouple[i].key === item.key) {
              listSeatCouple[i].Color = 'blue';
            }
          }
          cost.map(value => {
            if (value.LoaiVe === 'COUPLE') {
              setAmount(res => res + value.GiaVe);
            }
          });
        }
      }
    }
  }

  function takeTicket() {
    setShowModal(true);
  }

  function checkOut() {
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
    let hr = currentTime + ':' + currentMinute;

    function CompareTime(time_1, time_2) {
      if (time_1.split(':')[0] === time_2.split(':')[0]) {
        let s1 = time_1.split(':')[0] * 60 + time_1.split(':')[1];
        let s2 = time_2.split(':')[0] * 60 + time_2.split(':')[1];
        if (Math.abs(s1 - s2) < 5) return 1; // Gets difference in seconds
      } else if (time_1.split(':')[0] > time_2.split(':')[0]) {
        let s1 = time_1.split(':')[1];
        let s2 = time_2.split(':')[1];
        if (Math.abs(60 - s2 + Number(s1)) < 5) return 1; // Gets difference in seconds
      }
    }

    if (
      CompareTime(schedule.ThoiGianChieu.split('T')[1].slice(0, 5), hr) === 1
    ) {
      Alert.alert(
        'Phim đã quá giờ chọn vé',
        'Đặt vé trước thời gian chiếu 5 phút',
      );
    } else if (selectedIndex === 0) {
      fetch(`${types.APIWEB}paypal/pay/`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.user.email,
          TenFilm: schedule.TenFilm,
          TenPhong: schedule.TenPhong,
          TenGhe: seatPick,
          ThoiGianChieu: schedule.ThoiGianChieu,
          GiaVe: amount,
          payed: true,
          ThoiGianDat: currentyear,
        }),
      })
        .then(res => res.json())
        .then(res => {
          setUrl(res.result);
          setShowModal(false);
          setShowModalWebview(true);
        })
        .catch(e => {
          console.log('catch payment online');
          console.log(e);
        });
    } else {
      fetch(`${types.API}ticket/createticket/`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.user.email,
          TenFilm: schedule.TenFilm,
          TenPhong: schedule.TenPhong,
          TenGhe: seatPick,
          ThoiGianChieu: schedule.ThoiGianChieu,
          GiaVe: amount,
          payed: false,
          ThoiGianDat: currentyear,
        }),
      })
        .then(a => a.json())
        .then(r => {
          if (!r.error) {
            fetch(`${types.API}film/updatefilm/`, {
              method: 'PUT',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                TenFilm: detailfilm.TenFilm,
                TongThu: amount + detailfilm.TongThu,
                DaoDien: detailfilm.DaoDien,
                TheLoai: detailfilm.TheLoai,
                TenNuocSX: detailfilm.TenNuocSX,
                TomTat: detailfilm.TomTat,
                TongChi: detailfilm.TongChi,
                NgayChieu: detailfilm.NgayChieu,
                NgayKetThuc: detailfilm.NgayKetThuc,
              }),
            }).then(kq => {
              setShowModal(false);
              setShowModalTicket(true);
            });
          } else {
            Alert.alert('Ghế bạn chọn đã được đặt trước', 'Trở về', [
              {
                text: 'OK',
                onPress: () => {
                  setShowModal(false);
                  navigation.goBack();
                },
              },
            ]);
          }
        });
    }
  }
  function _onNavigationStateChange(data) {
    if (data.url === 'http://htvcinemas.live/successpayment') {
      setShowModalWebview(false);
      setShowModalTicket(true);
    }
    if (
      data.title.includes(
        'htvcinemas.live:8000/paypal/success?paymentId=PAYID-',
      )
    ) {
      Alert.alert('Ghế bạn chọn đã được đặt trước', 'Trở về', [
        {
          text: 'OK',
          onPress: () => {
            navigation.goBack();
            setShowModalWebview(false);
          },
        },
      ]);
    }
  }
  useEffect(() => {
    if (seatPick.length > 0) {
      // console.log('seatpick', seatPick.length);
      setColor('red');
    }
  }, [seatPick]);

  // mount
  useEffect(() => {
    let isSubscribed = true;
    async function fetchSeatPicked() {
      let res = await fetch(`${types.API}ticket/find/`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          TenFilm: schedule.TenFilm,
          ThoiGianChieu: schedule.ThoiGianChieu,
        }),
      });
      let dataa = await res.json();
      if (dataa.ticket !== undefined) {
        await Promise.all(
          dataa.ticket.map(value => {
            value.TenGhe.map(value2 => {
              if (value2.slice(0, 1) !== 'R')
                setSeatPicked(r => [...r, value2]);
              else setSeatPickedCouple(r => [...r, value2]);
            });
          }),
        );
      }

      // return kq;
    }

    async function fetchSeat() {
      let res = await fetch(`${types.API}ghe/find/`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          TenPhong: schedule.TenPhong,
        }),
      });
      let dataa = await res.json();

      await dataa.ghe.sort((a, b) =>
        a.TenGhe > b.TenGhe ? 1 : b.TenGhe > a.TenGhe ? -1 : 0,
      );
      let arr = [];
      let arrCouple = [];
      await dataa.ghe.map(async value => {
        if (value.TenGhe.slice(0, 1) === 'R') {
          await arrCouple.push({
            key: value.TenGhe,
            Color: 'pink',
          });
        } else {
          await arr.push({
            key: value.TenGhe,
            Color: '#e2ab32',
          });
        }
      });

      await setListSeat(arr);
      await setListSeatCouple(arrCouple);
      await setDone(true);
      // return kq;
    }

    if (isSubscribed === true) {
      let t = fetch(`${types.API}giave/find/`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(r => r.json())
        .then(res => {
          console.log('gia', res);
          setCost(res);
        });
    }

    fetchSeatPicked();
    fetchSeat();

    return () => (isSubscribed = false);
  }, []);

  useEffect(() => {
    async function handleSeatFromAPI() {
      // let t = async function() {
      if (done === true) {
        if (seatPicked.length > 0) {
          await listSeat.map(async value => {
            await seatPicked.map(value1 => {
              if (value1 === value.key) {
                value.Color = 'red';
              }
            });
          });
        }
        if (listSeatCouple.length > 0) {
          await listSeatCouple.map(value => {
            seatPickedCouple.map(value1 => {
              if (value1 === value.key) {
                value.Color = 'red';
              }
            });
          });
        }
        await setSeat(JSON.parse(JSON.stringify(listSeat)));
        await setShow(true);
      }
      // };
      // await t();
    }
    handleSeatFromAPI();
  }, [done]);

  function renderItem({item, index}) {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    if (item.key === 'R04') {
      return (
        <View
          style={[
            styles.item,
            {
              borderColor: 'white',
              borderWidth: 2,
              backgroundColor: 'white',
            },
          ]}
        />
      );
    }
    return (
      <View
        style={[
          styles.item,
          {
            borderColor: item.Color,
            borderWidth: 2,
            backgroundColor: item.Color,
          },
        ]}>
        <Text onPress={() => pressItems(item)} style={[styles.itemText]}>
          {item.key}
          <MaterialCommunityIcons name={'seat'} color={'white'} size={8} />
        </Text>
      </View>
    );
  }
  return (
    <View style={{flex: 1}}>
      <Modal
        visible={showModal}
        animationType={'slide'}
        transparent={true}
        backdropOpacity={0.9}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={300}
        animationOutTiming={300}
        backdropTransitionInTiming={300}
        backdropTransitionOutTiming={300}
        onRequestClose={() => {
          setShowModal(false);
        }}>
        <View style={{flex: 1}}>
          <View style={{flex: 3.5}} />
          <View
            style={{
              flex: 1,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 10,
              paddingBottom: 0,
            }}>
            <View
              style={{
                flex: 1,
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
                name="circledown"
                size={40}
                color="red"
                style={styles.btnCloseModal}
                onPress={() => {
                  setShowModal(false);
                }}
              />
            </View>
            <View
              style={{
                flex: 3,
                width: '100%',
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
              <ButtonGroup
                selectedIndex={selectedIndex}
                onPress={setSelectedIndex}
                buttons={buttons}
                containerStyle={{
                  height: 50,
                  borderRadius: 25,
                  width: '80%',
                  backgroundColor: 'white',
                }}
              />
              <View style={{width: '90%'}}>
                <TouchableOpacity
                  style={styles.btn_Choose}
                  onPress={() => checkOut()}>
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
                  <Text style={styles.text}>Thanh toán</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={showModalTicket}
        animationType={'slide'}
        transparent={true}
        backdropOpacity={0.9}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={300}
        animationOutTiming={300}
        backdropTransitionInTiming={300}
        backdropTransitionOutTiming={300}
        onRequestClose={() => {
          setShowModalTicket(true);
        }}>
        <View style={{flex: 1}}>
          <View style={{flex: 0.5}} />
          <View
            style={{
              flex: 2,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 10,
              paddingBottom: 0,
            }}>
            <View
              style={{
                flex: 3,
                width: '100%',
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
              <View
                style={{
                  flex: 2.5,
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity style={styles.card}>
                  <Text
                    style={{
                      color: 'red',
                      fontSize: 18,
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                    }}>
                    {selectedIndex === 0
                      ? 'Mua vé thành công'
                      : 'Đặt vé thành công'}
                  </Text>
                  <Text style={(styles.cardSize, {color: 'red'})}>
                    Thông Tin Vé
                  </Text>
                  <Image
                    style={styles.cardImage}
                    source={{uri: `${types.API}/images/${detailfilm.AnhBia}`}}
                  />
                  <View style={{alignItems: 'flex-start'}}>
                    {seatPick.map(val => {
                      if (val.slice(0, 1) === 'R') {
                        a += `${val} `;
                      } else {
                        b += `${val} `;
                      }
                    })}
                    <Text style={styles.cardSize}>
                      Phim
                      <Text style={{color: 'red'}}> {detailfilm.TenFilm} </Text>
                    </Text>
                    <Text style={styles.cardSize}>
                      Ngày chiếu{' '}
                      <Text style={{color: 'red'}}>
                        {schedule.ThoiGianChieu.split('T')[0].slice(0, 10)}{' '}
                      </Text>
                    </Text>
                    <Text style={styles.cardSize}>
                      Thời gian chiếu{' '}
                      <Text style={{color: 'red'}}>
                        {schedule.ThoiGianChieu.split('T')[1].slice(0, 5)}{' '}
                      </Text>
                    </Text>
                    <Text style={styles.cardSize}>
                      Phòng chiếu{' '}
                      <Text style={{color: 'red'}}> {schedule.TenPhong} </Text>
                    </Text>
                    <Text style={styles.cardSize}>
                      Chỗ Ngồi{' '}
                      <Text style={{color: 'red'}}>
                        {b !== '' ? (
                          <Text style={{color: 'red'}}> VIP {b} </Text>
                        ) : null}

                        {a !== '' ? (
                          <Text style={{color: 'red'}}> COUPLE {a} </Text>
                        ) : null}
                      </Text>
                    </Text>
                    {/* <Text style={styles.cardSize}>
                      Thời gian đặt vé{' '}
                      <Text style={{color: 'red'}}>
                        {' '}
                        {.ThoiGianDat.split('T')[0].slice(0, 10)}{' '}
                      </Text>
                    </Text> */}
                    <Text
                      style={{
                        fontSize: 17,
                        // height: 50,
                        // padding: 1,
                        color: 'blue',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                      }}>
                      Giá vé:{' '}
                      <Text style={{color: 'blue'}}>
                        {
                          Number(amount)
                            .toFixed(1)
                            .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                            .split('.0')[0]
                        }
                        VND
                      </Text>
                    </Text>
                    <Text style={styles.cardSize}>
                      <Text style={{color: 'red', textAlign: 'center'}}>
                        {selectedIndex === 0
                          ? 'Đã thanh toán'
                          : 'Chưa thanh toán, thanh toán trước 15 phút để giữ ghế'}
                      </Text>
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{width: '90%'}}>
                <TouchableOpacity
                  style={styles.btn_Choose}
                  onPress={() => {
                    setShowModalTicket(false);
                    navigation.goBack();
                  }}>
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
                  <Text style={styles.text}>Đồng Ý</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{flex: 1, backgroundColor: 'white'}} />
        </View>
      </Modal>
      <Modal
        visible={showModalWebview}
        animationType={'slide'}
        transparent={true}
        backdropOpacity={0.9}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={300}
        animationOutTiming={300}
        backdropTransitionInTiming={300}
        backdropTransitionOutTiming={300}
        onRequestClose={() => {
          setShow(false);
        }}>
        <View style={{flex: 1, alignItems: 'center', width: '100%'}}>
          <View style={{flex: 2}} />
          <View
            style={{
              flex: 1,
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
              name="circledown"
              size={40}
              color="red"
              style={styles.btnCloseModal}
              onPress={() => {
                setShowModalWebview(false);
              }}
            />
          </View>
        </View>
        <View style={{flex: 3}}>
          <WebView
            source={{
              uri: url,
            }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            onHttpError={syntheticEvent => {
              const {nativeEvent} = syntheticEvent;
              console.warn(
                'WebView received error status code: ',
                nativeEvent.statusCode,
              );
            }}
            renderError={errorName => console.log('error', errorName)}
            onNavigationStateChange={event => _onNavigationStateChange(event)}
          />
        </View>
      </Modal>

      <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
        <View style={{flex: 1}}>
          {/*<Text>Phim:</Text>*/}
          <Text style={{fontWeight: 'bold'}}>
            <Text style={{color: 'red'}}>{schedule.TenFilm}</Text>
          </Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
          <Text style={{fontWeight: 'bold'}}>
            Ngày chiếu: {`\n`}{' '}
            <Text style={{color: 'red'}}>
              {schedule.ThoiGianChieu.split('T')[0]
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-')}
            </Text>
          </Text>
        </View>
        <View style={{flex: 1}}>
          <Text style={{fontWeight: 'bold'}}>
            Thời gian:
            <Text style={{color: 'red'}}>
              {schedule.ThoiGianChieu.split('T')[1].slice(0, 5)}-
              {schedule.ThoiGianKetThuc.split('T')[1].slice(0, 5)}
            </Text>
          </Text>
        </View>
        <View>
          <Text style={{fontWeight: 'bold'}}>
            Rạp{`\n`}
            <Text style={{color: 'red'}}>{schedule.TenPhong}</Text>
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 0.1,
          backgroundColor: '#fff',
          marginBottom: 20,
        }}>
        <View
          style={{flex: 0.5, alignItems: 'center', justifyContent: 'center'}}>
          <AntDesign name={'laptop'} color={'black'} size={40} />
        </View>
        <View
          style={{
            flex: 0.5,
            flexDirection: 'row',
            // backgroundColor: 'blue',
            height: '100%',
          }}>
          <View style={{position: 'relative'}}>
            <AntDesign name={'arrowdown'} color={'black'} size={30} />
            {/*<Text>Loi di</Text>*/}
          </View>
          <View
            style={{
              position: 'absolute',
              left: '93%',
              // backgroundColor: 'red',
              height: '100%',
            }}>
            <AntDesign name={'arrowdown'} color={'black'} size={30} />
            {/*<Text>Loi di</Text>*/}
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 6,
          opacity: 1,
          marginLeft: 6,
          marginRight: 6,
          borderColor: 'blue',
          borderWidth: 1,
          borderRadius: 10,
          padding: 2,
        }}>
        {show === true ? (
          <>
            <FlatList
              data={formatData(seat, numColumns)}
              style={styles.container}
              renderItem={renderItem}
              numColumns={numColumns}
            />
            <FlatList
              data={formatData(listSeatCouple, 7)}
              style={styles.container}
              renderItem={renderItem}
              numColumns={7}
            />
          </>
        ) : (
          <DotIndicator />
        )}
      </View>
      <View
        style={{
          flex: 0.5,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: '33.3%',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '2%',
          }}>
          <View
            style={[
              {
                backgroundColor: '#e2ab32',
                width: '30%',
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}>
            <MaterialCommunityIcons name={'seat'} color={'white'} size={15} />
          </View>
          <Text style={{fontSize: 10}}>Ghế còn trống</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '33.3%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={[
              {
                backgroundColor: 'red',
                alignItems: 'center',
                justifyContent: 'center',
                width: '30%',
              },
            ]}>
            <MaterialCommunityIcons name={'seat'} color={'white'} size={15} />
          </View>
          <Text style={{fontSize: 10}}> Ghế đã đặt</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '33.3%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={[
              {
                width: '30%',
                backgroundColor: 'blue',
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}>
            <MaterialCommunityIcons name={'seat'} color={'white'} size={15} />
          </View>
          <Text style={{fontSize: 10}}> Ghế đang chọn</Text>
        </View>
        <View
          style={{flexDirection: 'row', width: '30%', alignItems: 'center'}}>
          <View
            style={[
              {
                width: '30%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'pink',
              },
            ]}>
            <MaterialCommunityIcons name={'seat'} color={'white'} size={15} />
          </View>
          <Text style={{fontSize: 10}}>Ghế đôi</Text>
        </View>
        <View
          style={{flexDirection: 'row', width: '30%', alignItems: 'center'}}>
          <View
            style={[
              {
                width: '30%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
              },
            ]}>
            <AntDesign name={'arrowdown'} color={'black'} size={15} />
          </View>
          <Text style={{fontSize: 10}}>Lối đi</Text>
        </View>
      </View>
      <View style={{flex: 1.5, flexDirection: 'row', flexWrap: 'wrap'}}>
        <View style={{width: '100%'}}>
          <Text>
            Ghế đang chọn{' '}
            <Text>
              {' '}
              {seatPick.map(val => (
                <Text>{val} </Text>
              ))}{' '}
            </Text>
          </Text>
          <Text>
            Tiền thanh toán{' '}
            <Text style={{fontWeight: 'bold', color: 'blue'}}>
              {' '}
              {amount !== 0
                ? amount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
                : null}
              {' VNĐ '}
            </Text>
            {cost !== []
              ? cost.map(a =>
                  a.LoaiVe === 'VIP' ? (
                    <Text style={{fontSize: 11}}>/ Ghế thường {a.GiaVe} </Text>
                  ) : (
                    <Text style={{fontSize: 11}}> Ghế đôi {a.GiaVe} </Text>
                  ),
                )
              : null}
          </Text>
        </View>
        <View style={{width: '100%'}}>
          {amount > 0 ? (
            <TouchableOpacity
              onPress={() => takeTicket()}
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
              <Text style={styles.text}>Đặt Vé</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.btn_Choose}>
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
              <Text style={styles.text}>Xin Mời Chọn Ghế</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // marginVertical: 5,
  },
  text: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  btn_Choose: {
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
    marginRight: 20,
    marginBottom: 5,
    // marginLeft: 20,
    borderWidth: 1,
    overflow: 'hidden',
  },
  item: {
    backgroundColor: '#e2ab32',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 2,
    width: '10%',
    marginBottom: 3,
    height: Dimensions.get('window').width / numColumns, // approximate a square
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
    fontSize: 10,
  },
  cardSize: {
    fontSize: 15,
    // height: 50,
    // padding: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  card: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginBottom: 10,
    // marginLeft: '5%',
    // marginRight: '1%',
    width: '90%',
    marginTop: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 7,
    },
    shadowOpacity: 0.41,
    elevation: 14,
  },
  cardImage: {
    width: '100%',
    height: 130,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: 'red',
  },
  buttonFilter: {
    backgroundColor: 'blue',
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
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
    marginBottom: 5,
    paddingBottom: 10,

    borderWidth: 1,
    overflow: 'hidden',
  },
  filter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
export default Seat;
