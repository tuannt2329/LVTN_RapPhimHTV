import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
  FlatList,
} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const data = [
  {key: 'A1', color: 'white'},
  {key: 'A2', color: 'white'},
  {key: 'A3', color: 'white'},
  {key: 'A4', color: 'white'},
  {key: 'A5', color: 'white'},
  {key: 'A6', color: 'white'},
  {key: 'A7', color: 'white'},
  {key: 'A8', color: 'white'},
  {key: 'A9', color: 'white'},
  {key: 'A10', color: 'white'},

  {key: 'B1', color: 'white'},
  {key: 'B2', color: 'white'},
  {key: 'B3', color: 'white'},
  {key: 'B4', color: 'white'},
  {key: 'B5', color: 'white'},
  {key: 'B6', color: 'white'},
  {key: 'B7', color: 'white'},
  {key: 'B8', color: 'white'},
  {key: 'B9', color: 'white'},
  {key: 'B10', color: 'white'},

  {key: 'C1', color: 'white'},
  {key: 'C2', color: 'white'},
  {key: 'C3', color: 'white'},
  {key: 'C4', color: 'white'},
  {key: 'C5', color: 'white'},
  {key: 'C6', color: 'white'},
  {key: 'C7', color: 'white'},
  {key: 'C8', color: 'white'},
  {key: 'C9', color: 'white'},
  {key: 'C10', color: 'white'},

  {key: 'D1', color: 'white'},
  {key: 'D2', color: 'white'},
  {key: 'D3', color: 'white'},
  {key: 'D4', color: 'white'},
  {key: 'D5', color: 'white'},
  {key: 'D6', color: 'white'},
  {key: 'D7', color: 'white'},
  {key: 'D8', color: 'white'},
  {key: 'D9', color: 'white'},
  {key: 'D10', color: 'white'},

  // { key: 'K' },
  // { key: 'L' },
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
const numColumns = 10;

function Seat({route, navigation}) {
  // const {film} = route.params;
  navigation.setOptions({
    // title: `Chọn Ghế ${film.TenFilm}`,
    title: `Chọn Ghế `,
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
  const numColumns = 10;
  const [seatPick, setSeatPick] = useState([]);
  // const seat = JSON.parse(JSON.stringify(data));

  function pressItems(key) {
    console.log(key);
    if (seatPick.includes(key)) {
      console.log('ton tai');
      setSeatPick(seatPick.filter(e => e !== key));
      // Khong su dung map vi map se copy shadow, va reformat stucture
      // Using map to reformat objects in an array // mozilla
      for (var i = 0; i < seat.length; i++) {
        if (seat[i].key === key) {
          seat[i].color = 'white';
        }
      }
      console.log('SAu khi xoa', seat);
    } else {
      setSeatPick(item => [...item, key]);

      // seat.map((val, index) => {
      //   if (val.key === key) {
      //     val.color = 'red';
      //   }
      // });

      for (var i = 0; i < seat.length; i++) {
        if (seat[i].key === key) {
          seat[i].color = 'red';
          console.log(seat[i].color);
        }
      }
      console.log('SAu khi them', seat);
      console.log(seatPick);
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
      <View style={[styles.item, {borderColor: item.color, borderWidth: 2}]}>
        <Text onPress={() => pressItems(item.key)} style={styles.itemText}>
          {item.key}
          <MaterialCommunityIcons name={'seat'} color={item.color} size={20} />
        </Text>
      </View>
    );
  }
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}} />
      <View
        style={{
          flex: 0.5,
          backgroundColor: 'yellow',
          margin: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>Man Hinh</Text>
      </View>
      <View
        style={{
          flex: 3,
          opacity: 1,
          marginLeft: 15,
        }}>
        <View>
          <FlatList
            data={formatData(seat, numColumns)}
            style={styles.container}
            renderItem={renderItem}
            numColumns={numColumns}
          />
        </View>
        {/* <View>
          <FlatList
            data={formatData(data1, numColumns)}
            style={styles.container}
            renderItem={renderItem}
            numColumns={numColumns}
          />
        </View> */}
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
    backgroundColor: '#4D243D',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 2,
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
