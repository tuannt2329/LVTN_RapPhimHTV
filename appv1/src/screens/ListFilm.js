import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Button,
  Picker,
} from 'react-native';
import {Sections, type Section} from '../components/animationList/';
import {CommonActions} from '@react-navigation/native';
import CarouselItem from '../components/CarouselItem';
import * as Constant from '../constants';
import {jsTypeToCppType} from 'react-native/ReactCommon/hermes/inspector/tools/msggen/src/Converters';
import LinearGradient from 'react-native-linear-gradient';
import styless, {colors} from '../constants/index.style';
import Textt from '../components/text';

const mariner = '#3B5F8F';
const mediumPurple = '#8266D4';
const tomato = '#F95B57';
const mySin = '#F3A646';

const sections: Section[] = [
  {
    title: 'Phim Đang Chiếu',
    leftColor: mediumPurple,
    rightColor: mariner,
    image: require('../assets/imgs/logo.png'),
  },
  {
    title: 'Phim Sắp Chiếu',
    leftColor: tomato,
    rightColor: mediumPurple,
    image: require('../assets/imgs/home.png'),
  },
];

// const for create an array for processing initial data
// tạo một mảng chứa tất cả các thể loại, country,
// sau đó sử lý theo Set() và lưu lại vào state
const arrTheLoai = [];
const arrCountry = [];

function ListFilm({navigation, route}) {
  const {data} = route.params;
  const [list, setList] = useState(data);

  // type of film
  const [type, setType] = useState([]);
  // country of film
  const [country, setCountry] = useState([]);

  // const for render
  const [show, setShow] = useState('no');
  const [load, setLoad] = useState('f');

  // const for selected value
  const [selectedValueType, setSelectedValueType] = useState('all');
  const [selectedValueCountry, setSelectedValueCountry] = useState('all');

  const [selectedValueSort, setSelectedValueSort] = useState('all');

  useEffect(() => {
    async function a() {
      console.log('will mount');
      // lấy các thể loại
      // await arrTheLoai.keys(
      data.forEach((val, index) => {
        setType(type => [...type, val.TheLoai]);
      });
      // );
      // lấy các quốc gia
      // await arrCountry.keys(
      await data.forEach((val, index) => {
        setCountry(country => [...country, val.TenNuocSX]);
      });
      // );
      await setLoad('t');
    }
    a();
    console.log('type', type);
  }, []);

  useEffect(() => {
    async function a() {
      if (load === 't') {
        // xử lý mảng
        await setType([...new Set(type)]);
        await setCountry([...new Set(country)]);
      }
      console.log('from type', type);
      console.log('from country', country);
      await setShow('yes');
    }
    a();
  }, [load]);
  // Header
  navigation.setOptions({
    title: 'Danh Sách Phim',
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

  function renderItem({item, index}) {
    return (
      <View style={{flex: 1, width: '100%'}}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            // alert(`You've clicked '${TenFilm}'`);
            navigation.navigate('DetailFilm', {film: item});
          }}>
          <Image
            style={styles.cardImage}
            source={{uri: `${Constant.API}/images/${item.AnhBia}`}}
          />
          <Text style={styles.cardSize}>{item.TenFilm}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  async function selectedType(value, index) {
    await setSelectedValueType(value);
    console.log(selectedValueType);
  }
  async function selectedCountry(value, index) {
    await setSelectedValueCountry(value);
    console.log(selectedValueType);
  }
  async function selectedSort(value, index) {
    await setSelectedValueSort(value);
    console.log(selectedValueSort);
  }

  function filterBy() {
    if (selectedValueType === 'all' && selectedValueCountry === 'all') {
      if (selectedValueSort === 'tang') {
        return list.sort((a, b) => a.TongThu - b.TongThu);
      }
      if (selectedValueSort === 'giam') {
        return list.sort((a, b) => b.TongThu - a.TongThu);
      }
      return list;
    }
    if (selectedValueType !== 'all' && selectedValueCountry === 'all') {
      if (selectedValueSort === 'tang') {
        return list
          .filter(r => r.TheLoai === selectedValueType)
          .sort((a, b) => a.TongThu - b.TongThu);
      }
      if (selectedValueSort === 'giam') {
        return list
          .filter(r => r.TheLoai === selectedValueType)
          .sort((a, b) => b.TongThu - a.TongThu);
      }
      return list.filter(r => r.TheLoai === selectedValueType);
    }
    
    if (selectedValueType === 'all' && selectedValueCountry !== 'all') {
      if (selectedValueSort === 'tang') {
        return list
          .filter(r => r.TenNuocSX === selectedValueCountry)
          .sort((a, b) => a.TongThu - b.TongThu);
      }
      if (selectedValueSort === 'giam') {
        return list
          .filter(r => r.TenNuocSX === selectedValueCountry)
          .sort((a, b) => b.TongThu - a.TongThu);
      }
      return list.filter(r => r.TenNuocSX === selectedValueCountry);
    }

    if (selectedValueCountry !== 'all' && selectedValueType !== 'all') {
      if (selectedValueSort === 'tang') {
        return list
          .filter(
            r =>
              r.TheLoai === selectedValueType &&
              r.TenNuocSX === selectedValueCountry,
          )
          .sort((a, b) => a.TongThu - b.TongThu);
      }
      if (selectedValueSort === 'giam') {
        return list
          .filter(
            r =>
              r.TheLoai === selectedValueType &&
              r.TenNuocSX === selectedValueCountry,
          )
          .sort((a, b) => b.TongThu - a.TongThu);
      }
      return list.filter(
        r =>
          r.TheLoai === selectedValueType &&
          r.TenNuocSX === selectedValueCountry,
      );
    }
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex: 1}}>
        <View
          style={{
            flex: 1.5,
          }}>
          {/* render picker*/}
          <LinearGradient
            colors={['#e3b0bd', '#6b6b83', '#98c6cd']}
            startPoint={{x: 1, y: 0}}
            endPoint={{x: 0, y: 1}}
            style={styless.gradient}
          />
          <View
            style={{
              flex: 2,
              width: '100%',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            {/* Picker
            type of movie */}
            <View style={{flex: 1, width: '100%', position: 'relative'}}>
              <Text
                style={{
                  fontSize: 13,
                  top: 5,
                  bottom: 10,
                  alignItems: 'center',
                  textAlign: 'center',
                  width: '100%',
                  position: 'absolute',
                  justifyContent: 'center',
                }}>
                THỂ LOẠI
              </Text>
              <Picker
                itemStyle={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  // position: 'absolute',
                  // top: 50,
                  // bottom: 10,
                  // marginTop: 20,
                }}
                selectedValue={selectedValueType}
                style={{width: '100%', top: 15}}
                mode="dropdown"
                onValueChange={(itemValue, itemIndex) =>
                  selectedType(itemValue, itemIndex)
                }>
                <Picker.Item label="All" value="all" />
                {show === 'yes'
                  ? type.map((item, id) => (
                      <Picker.Item
                        key={id}
                        value={item.toString()}
                        label={item.toString()}
                      />
                    ))
                  : null}
              </Picker>
            </View>

            {/* Picker
            country */}
            <View style={{flex: 1, width: '100%', position: 'relative'}}>
              <Text
                style={{
                  fontSize: 13,
                  top: 5,
                  bottom: 10,
                  alignItems: 'center',
                  textAlign: 'center',
                  width: '100%',
                  position: 'absolute',
                  justifyContent: 'center',
                }}>
                QUỐC GIA
              </Text>
              <Picker
                itemStyle={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'red',
                }}
                selectedValue={selectedValueCountry}
                style={{top: 15, width: '100%'}}
                mode="dropdown"
                onValueChange={(itemValue, itemIndex) =>
                  selectedCountry(itemValue, itemIndex)
                }>
                <Picker.Item label="All" value="all" />
                {show === 'yes'
                  ? country.map((item, id) => (
                      <Picker.Item
                        key={id}
                        value={item.toString()}
                        label={item.toString()}
                      />
                    ))
                  : null}
              </Picker>
            </View>
          </View>
          {/* Sort
          By DoanhThu
          */}
          <View style={{flexDirection: 'row', flex: 2, width: '100%'}}>
            <View style={{flex: 1, width: '100%', position: 'relative'}}>
              <Text
                style={{
                  fontSize: 13,
                  top: 5,
                  bottom: 10,
                  alignItems: 'center',
                  textAlign: 'center',
                  width: '100%',
                  position: 'absolute',
                  justifyContent: 'center',
                }}>
                DOANH THU
              </Text>
              <Picker
                itemStyle={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
                selectedValue={selectedValueSort}
                style={{top: 15, width: '100%'}}
                mode="dropdown"
                onValueChange={(itemValue, itemIndex) =>
                  selectedSort(itemValue, itemIndex)
                }>
                <Picker.Item label="All" value="all" />
                <Picker.Item label="Giam" value="giam" />
                <Picker.Item label="Tang" value="tang" />
              </Picker>
            </View>
            {/*
             */}
            <View style={{flex: 1, width: '100%', position: 'relative'}}>
              <Text
                style={{
                  fontSize: 13,
                  top: 5,
                  bottom: 10,
                  alignItems: 'center',
                  textAlign: 'center',
                  width: '100%',
                  position: 'absolute',
                  justifyContent: 'center',
                }}>
                QUỐC GIA
              </Text>
              {/*<Picker*/}
              {/*  itemStyle={{*/}
              {/*    flex: 1,*/}
              {/*    alignItems: 'center',*/}
              {/*    justifyContent: 'center',*/}
              {/*    textAlign: 'center',*/}
              {/*  }}*/}
              {/*  selectedValue={selectedValueSort}*/}
              {/*  style={{top: 15, width: '100%'}}*/}
              {/*  mode="dropdown"*/}
              {/*  onValueChange={(itemValue, itemIndex) =>*/}
              {/*    selectedSort(itemValue, itemIndex)*/}
              {/*  }>*/}
              {/*  <Picker.Item label="All" value="all" />*/}
              {/*  <Picker.Item label="Giam" value="giam" />*/}
              {/*  <Picker.Item label="Tang" value="tang" />*/}
              {/*</Picker>*/}
            </View>
          </View>
          {/* render button filter*/}
          <View style={styles.filter}>
            <TouchableOpacity
              style={styles.buttonFilter}
              onPress={() => console.log('press')}>
              <LinearGradient
                // start={{x: 0, y: 0}}
                // end={{x: 1, y: 1}}
                startPoint={{x: 1, y: 0}}
                endPoint={{x: 0, y: 1}}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                locations={[0.1, 0.9]}
                colors={['#d53369', '#cbad6d']}
                style={styless.gradient}>
                <Text
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    textAlign: 'center',
                    fontSize: 20,
                    color: '#fff',
                    fontWeight: 'bold',
                    overflow: 'hidden',
                    textTransform: 'uppercase',
                  }}>
                  Mặc Định
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
        {/*render flat list*/}
        <View
          style={{
            flex: 5,
            // alignItems: '',
            width: '90%',
            justifyContent: 'space-around',
            marginLeft: '10%',
            marginTop: 10,
          }}>
          <FlatList
            data={filterBy()}
            keyExtractor={(item, index) => 'key' + index}
            renderItem={renderItem}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardSize: {
    fontSize: 20,
    height: 50,
    // padding: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  card: {
    alignItems: 'center',
    backgroundColor: '#fff',

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
    shadowRadius: 9.11,
    elevation: 14,
  },
  cardImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
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
export default ListFilm;
