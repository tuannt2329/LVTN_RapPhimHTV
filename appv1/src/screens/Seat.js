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

// const data = [
//   {key: 'A1', color: '#e2ab32'},
//   {key: 'A2', color: '#e2ab32'},
//   {key: 'A3', color: '#e2ab32'},
//   {key: 'A4', color: '#e2ab32'},
//   {key: 'A5', color: '#e2ab32'},
//   {key: 'A6', color: '#e2ab32'},
//   {key: 'A7', color: '#e2ab32'},
//   {key: 'A8', color: '#e2ab32'},
//   {key: 'A9', color: '#e2ab32'},
//   {key: 'A10', color: '#e2ab32'},
//   {key: 'A11', color: '#e2ab32'},
//   {key: 'A12', color: '#e2ab32'},
//   {key: 'A13', color: '#e2ab32'},
//   {key: 'A14', color: '#e2ab32'},
//   {key: 'A15', color: '#e2ab32'},

//   {key: 'B1', color: '#e2ab32'},
//   {key: 'B2', color: '#e2ab32'},
//   {key: 'B3', color: '#e2ab32'},
//   {key: 'B4', color: '#e2ab32'},
//   {key: 'B5', color: '#e2ab32'},
//   {key: 'B6', color: '#e2ab32'},
//   {key: 'B7', color: '#e2ab32'},
//   {key: 'B8', color: '#e2ab32'},
//   {key: 'B9', color: '#e2ab32'},
//   {key: 'B10', color: '#e2ab32'},
//   {key: 'B11', color: '#e2ab32'},
//   {key: 'B12', color: '#e2ab32'},
//   {key: 'B13', color: '#e2ab32'},
//   {key: 'B14', color: '#e2ab32'},
//   {key: 'B15', color: '#e2ab32'},

//   {key: 'C1', color: '#e2ab32'},
//   {key: 'C2', color: '#e2ab32'},
//   {key: 'C3', color: '#e2ab32'},
//   {key: 'C4', color: '#e2ab32'},
//   {key: 'C5', color: '#e2ab32'},
//   {key: 'C6', color: '#e2ab32'},
//   {key: 'C7', color: '#e2ab32'},
//   {key: 'C8', color: '#e2ab32'},
//   {key: 'C9', color: '#e2ab32'},
//   {key: 'C10', color: '#e2ab32'},
//   {key: 'C11', color: '#e2ab32'},
//   {key: 'C12', color: '#e2ab32'},
//   {key: 'C13', color: '#e2ab32'},
//   {key: 'C14', color: '#e2ab32'},
//   {key: 'C15', color: '#e2ab32'},

//   {key: 'D1', color: '#e2ab32'},
//   {key: 'D2', color: '#e2ab32'},
//   {key: 'D3', color: '#e2ab32'},
//   {key: 'D4', color: '#e2ab32'},
//   {key: 'D5', color: '#e2ab32'},
//   {key: 'D6', color: '#e2ab32'},
//   {key: 'D7', color: '#e2ab32'},
//   {key: 'D8', color: '#e2ab32'},
//   {key: 'D9', color: '#e2ab32'},
//   {key: 'D10', color: '#e2ab32'},
//   {key: 'D11', color: '#e2ab32'},
//   {key: 'D12', color: '#e2ab32'},
//   {key: 'D13', color: '#e2ab32'},
//   {key: 'D14', color: '#e2ab32'},
//   {key: 'D15', color: '#e2ab32'},

//   {key: 'E1', color: '#e2ab32'},
//   {key: 'E2', color: '#e2ab32'},
//   {key: 'E3', color: '#e2ab32'},
//   {key: 'E4', color: '#e2ab32'},
//   {key: 'E5', color: '#e2ab32'},
//   {key: 'E6', color: '#e2ab32'},
//   {key: 'E7', color: '#e2ab32'},
//   {key: 'E8', color: '#e2ab32'},
//   {key: 'E9', color: '#e2ab32'},
//   {key: 'E10', color: '#e2ab32'},
//   {key: 'E11', color: '#e2ab32'},
//   {key: 'E12', color: '#e2ab32'},
//   {key: 'E13', color: '#e2ab32'},
//   {key: 'E14', color: '#e2ab32'},
//   {key: 'E15', color: '#e2ab32'},

//   {key: 'F1', color: '#e2ab32'},
//   {key: 'F2', color: '#e2ab32'},
//   {key: 'F3', color: '#e2ab32'},
//   {key: 'F4', color: '#e2ab32'},
//   {key: 'F5', color: '#e2ab32'},
//   {key: 'F6', color: '#e2ab32'},
//   {key: 'F7', color: '#e2ab32'},
//   {key: 'F8', color: '#e2ab32'},
//   {key: 'F9', color: '#e2ab32'},
//   {key: 'F10', color: '#e2ab32'},
//   {key: 'F11', color: '#e2ab32'},
//   {key: 'F12', color: '#e2ab32'},
//   {key: 'F13', color: '#e2ab32'},
//   {key: 'F14', color: '#e2ab32'},
//   {key: 'F15', color: '#e2ab32'},

//   {key: 'G1', color: '#e2ab32'},
//   {key: 'G2', color: '#e2ab32'},
//   {key: 'G3', color: '#e2ab32'},
//   {key: 'G4', color: '#e2ab32'},
//   {key: 'G5', color: '#e2ab32'},
//   {key: 'G6', color: '#e2ab32'},
//   {key: 'G7', color: '#e2ab32'},
//   {key: 'G8', color: '#e2ab32'},
//   {key: 'G9', color: '#e2ab32'},
//   {key: 'G10', color: '#e2ab32'},
//   {key: 'G11', color: '#e2ab32'},
//   {key: 'G12', color: '#e2ab32'},
//   {key: 'G13', color: '#e2ab32'},
//   {key: 'G14', color: '#e2ab32'},
//   {key: 'G15', color: '#e2ab32'},

//   {key: 'I1', color: '#e2ab32'},
//   {key: 'I2', color: '#e2ab32'},
//   {key: 'I3', color: '#e2ab32'},
//   {key: 'I4', color: '#e2ab32'},
//   {key: 'I5', color: '#e2ab32'},
//   {key: 'I6', color: '#e2ab32'},
//   {key: 'I7', color: '#e2ab32'},
//   {key: 'I8', color: '#e2ab32'},
//   {key: 'I9', color: '#e2ab32'},
//   {key: 'I10', color: '#e2ab32'},
//   {key: 'I11', color: '#e2ab32'},
//   {key: 'I12', color: '#e2ab32'},
//   {key: 'I13', color: '#e2ab32'},
//   {key: 'I14', color: '#e2ab32'},
//   {key: 'I15', color: '#e2ab32'},

//   {key: 'N01', color: '#e2ab32'},
//   {key: 'N02', color: '#e2ab32'},
//   {key: 'N03', color: '#e2ab32'},
//   {key: 'N04', color: '#e2ab32'},
//   {key: 'N05', color: '#e2ab32'},
//   {key: 'N06', color: '#e2ab32'},
//   {key: 'N07', color: '#e2ab32'},
//   {key: 'K08', color: '#e2ab32'},
//   {key: 'K09', color: '#e2ab32'},
//   {key: 'K10', color: '#e2ab32'},
//   {key: 'K11', color: '#e2ab32'},
//   {key: 'K12', color: '#e2ab32'},
//   {key: 'K13', color: '#e2ab32'},
//   {key: 'K14', color: '#e2ab32'},
//   {key: 'K15', color: '#e2ab32'},

//   // { key: 'K' },
//   // { key: 'L' },
// ];

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
        let kq = await Promise.all(
          dataa.ticket.map(value => {
            console.log('promise all');
            value.TenGhe.map(value2 => {
              setSeatPicked(r => [...r, value2]);
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
      let kq = await dataa.ghe.map(value => {
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

      await setDone(true);
      // return kq;
    }

    if (isSubscribed === true) {
      fetchSeatPicked();
      fetchSeat();
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

    return () => (isSubscribed = false);
  }, []);

  useEffect(() => {
    async function handleSeatFromAPI() {
      // let t = async function() {
      if (done === true) {
        if (seatPicked.length > 0) {
          await listSeat.map(async value => {
            await seatPicked.map(async value1 => {
              if (value1 === value.key) {
                value.Color = 'red';
              }
            });
          });
        }
        if (seatPicked.length > 0) {
          await listSeatCouple.map(async value => {
            await seatPicked.map(async value1 => {
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
            Suất chiếu {schedule.ThoiGianChieu.split('T')[0].slice(0, 10)}
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
          <Text>Ghế đang chọn {seatPick}</Text>
          <Text>Tiền thanh toán {amount} VNĐ</Text>
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
