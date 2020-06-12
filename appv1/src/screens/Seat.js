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
  TouchableHighlight,
} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as types from '../constants';
import {useSelector} from 'react-redux';
import DotIndicator from '../components/indicator/DotIndicator';
import LinearGradient from 'react-native-linear-gradient';
import styless from '../constants/index.style';

const couple = [
  {key: 'Y1', color: 'pink'},
  {key: 'Y2', color: 'pink'},
  {key: 'Y3', color: 'pink'},
];

const numColumns = 15;

function Seat({route, navigation}) {
  const {schedule} = route.params;
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
        <Image
          source={require('../assets/imgs/home.png')}
          style={{height: 30, width: 50}}
          resizeMode="contain"
        />
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
  const user = useSelector(state => state.loginIn.user);
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

        console.log('SAu khi xoa', seat);
      }
      // nhấn vào ghế chưa chọn
      else {
        setSeatPick(items => [...items, item.key]);
        // Khong phai ghe couple
        if (item.key.slice(0, 1) !== 'R') {
          for (let i = 0; i < seat.length; i++) {
            if (seat[i].key === item.key) {
              console.log(seat[i].key);
              seat[i].Color = 'green';
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
              listSeatCouple[i].Color = 'green';
            }
          }
          cost.map(value => {
            if (value.LoaiVe === 'COUPLE') {
              setAmount(res => res + value.GiaVe);
            }
          });
        }
        console.log(seatPick);
      }
    }
  }

  function takeTicket() {
    let take = fetch(`${types.API}ticket/create/`, {
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
      }),
    })
      .then(a => a.json())
      .then(r => console.log(r));
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
            console.log('promise all');
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

      let arr = [];
      let arrCouple = [];
      await dataa.ghe.map(value => {
        if (value.TenGhe.slice(0, 1) === 'R') {
          arrCouple.push({
            key: value.TenGhe,
            Color: 'pink',
          });
        } else {
          arr.push({
            key: value.TenGhe,
            Color: '#e2ab32',
          });
        }
      });

      await setListSeat(arr);
      await setListSeatCouple(arrCouple);
      await console.log('Geh couple', listSeatCouple);

      await setDone(true);
      // return kq;
    }

    if (isSubscribed === true) {
      let t = fetch(`${types.API}giave/find/`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(r => r.json())
        .then(res => setCost(res.loaive));
    }

    fetchSeatPicked();
    fetchSeat();

    return () => (isSubscribed = false);
  }, []);

  useEffect(() => {
    async function handleSeatFromAPI() {
      // let t = async function() {
      console.log('handle from seate api');
      if (done === true) {
        console.log('done', done);
        if (seatPicked.length > 0) {
          await listSeat.map(value => {
            seatPicked.map(value1 => {
              console.log('key', value.key);
              if (value1 === value.key) {
                value.Color = 'red';
              }
            });
          });
        }
        if (seatPicked.length > 0) {
          await listSeatCouple.map(value => {
            seatPickedCouple.map(value1 => {
              console.log('key', value.key);
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
          <MaterialCommunityIcons name={'seat'} color={'white'} size={10} />
        </Text>
      </View>
    );
  }
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
        <View style={{flex: 1}}>
          {/*<Text>Phim:</Text>*/}
          <Text style={{fontWeight: 'bold'}}> {schedule.TenFilm}</Text>
        </View>
        <View style={{flex: 1}}>
          <Text>
            Suất chiếu
            {schedule.ThoiGianChieu.split('T')[0]
              .slice(0, 10)
              .split('-')
              .reverse()
              .join('-')}
          </Text>
        </View>
        <View style={{flex: 1}}>
          <Text style={{fontWeight: 'bold'}}>
            Thời Gian:
            {schedule.ThoiGianChieu.split('T')[1].slice(0, 5)}-
            {schedule.ThoiGianKetThuc.split('T')[1].slice(0, 5)}
          </Text>
        </View>
        <View>
          <Text>Rạp {schedule.TenPhong}</Text>
        </View>
      </View>
      <View
        style={{
          flex: 0.5,
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
          flex: 5,
          opacity: 1,
          marginLeft: 6,
          marginRight: 6,
          borderColor: 'blue',
          borderWidth: 1,
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
          flex: 1,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: '33%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={[
              styles.item,
              {
                backgroundColor: '#e2ab32',
                // width: '10%',
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}>
            <MaterialCommunityIcons name={'seat'} color={'white'} size={15} />
          </View>
          <Text>Ghế còn trống</Text>
        </View>
        <View
          style={{flexDirection: 'row', width: '33%', alignItems: 'center'}}>
          <View style={[styles.item, {backgroundColor: 'red', width: '10%'}]}>
            <MaterialCommunityIcons name={'seat'} color={'white'} size={15} />
          </View>
          <Text>Ghế đã đặt</Text>
        </View>
        <View
          style={{flexDirection: 'row', width: '33%', alignItems: 'center'}}>
          <View style={[styles.item, {backgroundColor: 'green', width: '10%'}]}>
            <MaterialCommunityIcons name={'seat'} color={'white'} size={15} />
          </View>
          <Text>Ghế đang chọn</Text>
        </View>
        <View
          style={{flexDirection: 'row', width: '50%', alignItems: 'center'}}>
          <View style={[styles.item, {backgroundColor: 'pink', width: '30%'}]}>
            <MaterialCommunityIcons name={'seat'} color={'white'} size={15} />
          </View>
          <Text>Ghế đôi</Text>
        </View>
        <View
          style={{flexDirection: 'row', width: '30%', alignItems: 'center'}}>
          <View style={[styles.item, {backgroundColor: 'white', width: '20%'}]}>
            <AntDesign name={'arrowdown'} color={'black'} size={15} />
          </View>
          <Text>Lối đi</Text>
        </View>
      </View>
      <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
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
              {amount} VNĐ{' '}
            </Text>
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
});
export default Seat;
