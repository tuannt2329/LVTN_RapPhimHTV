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
} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
const data = [
  {key: 'A1', color: '#e2ab32'},
  {key: 'A2', color: '#e2ab32'},
  {key: 'A3', color: '#e2ab32'},
  {key: 'A4', color: '#e2ab32'},
  {key: 'A5', color: '#e2ab32'},
  {key: 'A6', color: '#e2ab32'},
  {key: 'A7', color: '#e2ab32'},
  {key: 'A8', color: '#e2ab32'},
  {key: 'A9', color: '#e2ab32'},
  {key: 'A10', color: '#e2ab32'},
  {key: 'A11', color: '#e2ab32'},
  {key: 'A12', color: '#e2ab32'},
  {key: 'A13', color: '#e2ab32'},
  {key: 'A14', color: '#e2ab32'},
  {key: 'A15', color: '#e2ab32'},

  {key: 'B1', color: '#e2ab32'},
  {key: 'B2', color: '#e2ab32'},
  {key: 'B3', color: '#e2ab32'},
  {key: 'B4', color: '#e2ab32'},
  {key: 'B5', color: '#e2ab32'},
  {key: 'B6', color: '#e2ab32'},
  {key: 'B7', color: '#e2ab32'},
  {key: 'B8', color: '#e2ab32'},
  {key: 'B9', color: '#e2ab32'},
  {key: 'B10', color: '#e2ab32'},
  {key: 'B11', color: '#e2ab32'},
  {key: 'B12', color: '#e2ab32'},
  {key: 'B13', color: '#e2ab32'},
  {key: 'B14', color: '#e2ab32'},
  {key: 'B15', color: '#e2ab32'},

  {key: 'C1', color: '#e2ab32'},
  {key: 'C2', color: '#e2ab32'},
  {key: 'C3', color: '#e2ab32'},
  {key: 'C4', color: '#e2ab32'},
  {key: 'C5', color: '#e2ab32'},
  {key: 'C6', color: '#e2ab32'},
  {key: 'C7', color: '#e2ab32'},
  {key: 'C8', color: '#e2ab32'},
  {key: 'C9', color: '#e2ab32'},
  {key: 'C10', color: '#e2ab32'},
  {key: 'C11', color: '#e2ab32'},
  {key: 'C12', color: '#e2ab32'},
  {key: 'C13', color: '#e2ab32'},
  {key: 'C14', color: '#e2ab32'},
  {key: 'C15', color: '#e2ab32'},

  {key: 'D1', color: '#e2ab32'},
  {key: 'D2', color: '#e2ab32'},
  {key: 'D3', color: '#e2ab32'},
  {key: 'D4', color: '#e2ab32'},
  {key: 'D5', color: '#e2ab32'},
  {key: 'D6', color: '#e2ab32'},
  {key: 'D7', color: '#e2ab32'},
  {key: 'D8', color: '#e2ab32'},
  {key: 'D9', color: '#e2ab32'},
  {key: 'D10', color: '#e2ab32'},
  {key: 'D11', color: '#e2ab32'},
  {key: 'D12', color: '#e2ab32'},
  {key: 'D13', color: '#e2ab32'},
  {key: 'D14', color: '#e2ab32'},
  {key: 'D15', color: '#e2ab32'},

  {key: 'E1', color: '#e2ab32'},
  {key: 'E2', color: '#e2ab32'},
  {key: 'E3', color: '#e2ab32'},
  {key: 'E4', color: '#e2ab32'},
  {key: 'E5', color: '#e2ab32'},
  {key: 'E6', color: '#e2ab32'},
  {key: 'E7', color: '#e2ab32'},
  {key: 'E8', color: '#e2ab32'},
  {key: 'E9', color: '#e2ab32'},
  {key: 'E10', color: '#e2ab32'},
  {key: 'E11', color: '#e2ab32'},
  {key: 'E12', color: '#e2ab32'},
  {key: 'E13', color: '#e2ab32'},
  {key: 'E14', color: '#e2ab32'},
  {key: 'E15', color: '#e2ab32'},

  {key: 'F1', color: '#e2ab32'},
  {key: 'F2', color: '#e2ab32'},
  {key: 'F3', color: '#e2ab32'},
  {key: 'F4', color: '#e2ab32'},
  {key: 'F5', color: '#e2ab32'},
  {key: 'F6', color: '#e2ab32'},
  {key: 'F7', color: '#e2ab32'},
  {key: 'F8', color: '#e2ab32'},
  {key: 'F9', color: '#e2ab32'},
  {key: 'F10', color: '#e2ab32'},
  {key: 'F11', color: '#e2ab32'},
  {key: 'F12', color: '#e2ab32'},
  {key: 'F13', color: '#e2ab32'},
  {key: 'F14', color: '#e2ab32'},
  {key: 'F15', color: '#e2ab32'},

  {key: 'G1', color: '#e2ab32'},
  {key: 'G2', color: '#e2ab32'},
  {key: 'G3', color: '#e2ab32'},
  {key: 'G4', color: '#e2ab32'},
  {key: 'G5', color: '#e2ab32'},
  {key: 'G6', color: '#e2ab32'},
  {key: 'G7', color: '#e2ab32'},
  {key: 'G8', color: '#e2ab32'},
  {key: 'G9', color: '#e2ab32'},
  {key: 'G10', color: '#e2ab32'},
  {key: 'G11', color: '#e2ab32'},
  {key: 'G12', color: '#e2ab32'},
  {key: 'G13', color: '#e2ab32'},
  {key: 'G14', color: '#e2ab32'},
  {key: 'G15', color: '#e2ab32'},

  {key: 'I1', color: '#e2ab32'},
  {key: 'I2', color: '#e2ab32'},
  {key: 'I3', color: '#e2ab32'},
  {key: 'I4', color: '#e2ab32'},
  {key: 'I5', color: '#e2ab32'},
  {key: 'I6', color: '#e2ab32'},
  {key: 'I7', color: '#e2ab32'},
  {key: 'I8', color: '#e2ab32'},
  {key: 'I9', color: '#e2ab32'},
  {key: 'I10', color: '#e2ab32'},
  {key: 'I11', color: '#e2ab32'},
  {key: 'I12', color: '#e2ab32'},
  {key: 'I13', color: '#e2ab32'},
  {key: 'I14', color: 'red'},
  {key: 'I15', color: '#e2ab32'},

  {key: 'K1', color: '#e2ab32'},
  {key: 'K2', color: '#e2ab32'},
  {key: 'K3', color: '#e2ab32'},
  {key: 'K4', color: '#e2ab32'},
  {key: 'K5', color: '#e2ab32'},
  {key: 'K6', color: '#e2ab32'},
  {key: 'K7', color: '#e2ab32'},
  {key: 'K8', color: '#e2ab32'},
  {key: 'K9', color: '#e2ab32'},
  {key: 'K10', color: '#e2ab32'},
  {key: 'K11', color: '#e2ab32'},
  {key: 'K12', color: '#e2ab32'},
  {key: 'K13', color: '#e2ab32'},
  {key: 'K14', color: '#e2ab32'},
  {key: 'K15', color: '#e2ab32'},

  // { key: 'K' },
  // { key: 'L' },
];

const couple = [
  {key: 'Y1', color: 'pink'},
  {key: 'Y2', color: 'pink'},
  {key: 'Y3', color: 'pink'},
];

const formatData = (data, numColumns) => {
  console.log(data);
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({key: `blank-${numberOfElementsLastRow}`, empty: true});
    numberOfElementsLastRow++;
  }
  console.log(data);
  return data;
};
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
  // tạo biến seat để tránh sự thay đổi trực tiếp vào [data] ghế
  // su dung JSON.parse(JSON.stringify()) để deep copy
  const [seat, setSeat] = useState(JSON.parse(JSON.stringify(data)));
  // const numColumns = 15;
  const [seatPick, setSeatPick] = useState([]);
  // const seat = JSON.parse(JSON.stringify(data));

  function pressItems(item) {
    console.log(item);
    if (item.color === 'red') {
      Alert.alert('Không thể chọn', 'Ghế đã được đặt, chọn ghế trống', [
        // {
        //   text: 'Ask me later',
        //   onPress: () => console.log('Ask me later pressed'),
        // },
        // {
        //   text: 'Cancel',
        //   onPress: () => console.log('Cancel Pressed'),
        //   style: 'cancel',
        // },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else {
      // nhấn vào ghế đã được chọn
      if (seatPick.includes(item.key)) {
        console.log('ton tai');
        setSeatPick(seatPick.filter(e => e !== item.key));
        // Khong su dung map vi map se copy shadow, va reformat stucture của đối tượng
        // Using map to reformat objects in an array // mozilla

        // Xử lý mảng ghế couple bằng slice key
        // để nhận biết đang chọn loại ghế nào

        // Khong phai ghe couple
        if (item.key.slice(0, 1) !== 'Y') {
          for (let i = 0; i < seat.length; i++) {
            if (seat[i].key === item.key) {
              seat[i].color = '#e2ab32';
            }
          }
        } else {
          for (let i = 0; i < couple.length; i++) {
            if (couple[i].key === item.key) {
              couple[i].color = 'pink';
            }
          }
        }

        console.log('SAu khi xoa', seat);
      }
      // nhấn vào ghế chưa chọn
      else {
        setSeatPick(items => [...items, item.key]);
        // Khong phai ghe couple
        if (item.key.slice(0, 1) !== 'Y') {
          for (let i = 0; i < seat.length; i++) {
            if (seat[i].key === item.key) {
              seat[i].color = 'green';
              // console.log(seat[i].color);
            }
          }
        } else {
          for (let i = 0; i < couple.length; i++) {
            if (couple[i].key === item.key) {
              couple[i].color = 'green';
              // console.log(seat[i].color);
            }
          }
        }
        console.log('SAu khi them', seat);
        console.log(seatPick);
      }
    }
    //   alert(seatPick.length);
    // console.log(seat);
  }

  useEffect(() => {
    console.log('use Effect');
    if (seatPick.length > 0) {
      console.log(seatPick.length);
      setColor('red');
    }
  }, [seatPick]);

  // unmount
  useEffect(() => {
    return function clear() {
      // seat =;
    };
  }, []);
  function renderItem({item, index}) {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <View
        style={[
          styles.item,
          {
            borderColor: item.color,
            borderWidth: 2,
            backgroundColor: item.color,
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
      <View style={{flex: 1}}>
        <Text> {schedule.TenFilm}</Text>
      </View>
      <View
        style={{
          flex: 0.5,
          backgroundColor: '#fff',
          marginBottom: 20,
        }}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>Màn hình</Text>
        </View>
        <View
          style={{
            flex: 2,
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
          marginLeft: 10,
          marginRight: 10,
          borderColor: 'blue',
          borderWidth: 1,
        }}>
        <View>
          <FlatList
            data={formatData(seat, numColumns)}
            style={styles.container}
            renderItem={renderItem}
            numColumns={numColumns}
          />
          <FlatList
            data={formatData(couple, 3)}
            style={styles.container}
            renderItem={renderItem}
            numColumns={3}
          />
        </View>
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
            <MaterialCommunityIcons name={'seat'} color={'white'} size={20} />
          </View>
          <Text>Ghế còn trống</Text>
        </View>
        <View
          style={{flexDirection: 'row', width: '33%', alignItems: 'center'}}>
          <View style={[styles.item, {backgroundColor: 'red', width: '10%'}]}>
            <MaterialCommunityIcons name={'seat'} color={'white'} size={20} />
          </View>
          <Text>Ghế đã đặt</Text>
        </View>
        <View
          style={{flexDirection: 'row', width: '33%', alignItems: 'center'}}>
          <View style={[styles.item, {backgroundColor: 'green', width: '10%'}]}>
            <MaterialCommunityIcons name={'seat'} color={'white'} size={20} />
          </View>
          <Text>Ghế đang chọn</Text>
        </View>
        <View
          style={{flexDirection: 'row', width: '50%', alignItems: 'center'}}>
          <View style={[styles.item, {backgroundColor: 'pink', width: '30%'}]}>
            <MaterialCommunityIcons name={'seat'} color={'white'} size={20} />
          </View>
          <Text>Ghế đôi</Text>
        </View>
        <View
          style={{flexDirection: 'row', width: '30%', alignItems: 'center'}}>
          <View style={[styles.item, {backgroundColor: 'white', width: '20%'}]}>
            <AntDesign name={'arrowdown'} color={'black'} size={20} />
          </View>
          <Text>Lối đi</Text>
        </View>
      </View>
      <View style={{flex: 1}}>
        <Text>Cac ghế da dat {seatPick}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // marginVertical: 5,
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
