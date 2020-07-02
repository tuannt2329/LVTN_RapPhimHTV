import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
  Picker,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import * as Constant from '../constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
import {CommonActions} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';

export default function ListFilmSort({navigation, route}) {
  const carouselRef = useRef(null);
  const {data} = route.params;
  // const [lista, setLista] = useState(data);

  const [list, setList] = useState(data);

  const [activeIndex, setActiveIndex] = useState(0);

  // type b;

  // const for render
  // sử dụng cho hàm 2 cái useEffect đầu tiên
  const [show, setShow] = useState('no');
  const [load, setLoad] = useState('f');

  // const for selected value
  const [selectedValueType, setSelectedValueType] = useState('all');
  const [selectedValueCountry, setSelectedValueCountry] = useState('all');

  const [selectedValueSort, setSelectedValueSort] = useState('all');

  // type of film
  const [type, setType] = useState([]);
  // country of film
  const [country, setCountry] = useState([]);

  //  state hold variable of list after filter
  const [listFilter, setListFilter] = useState(data);
  const [background, setBackground] = useState(
    `${Constant.API}/images/${list[0].AnhBia}`,
  );

  navigation.setOptions({
    title: 'Danh sách phim',
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
    async function a() {
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
      console.log('will mount');
      // lấy các thể loại
      data.forEach((val, index) => {
        if (val.NgayKetThuc > currentyear)
          setType(type => [...type, val.TheLoai]);
      });
      // lấy các quốc gia
      await data.forEach((val, index) => {
        if (val.NgayKetThuc > currentyear)
          setCountry(country => [...country, val.TenNuocSX]);
      });
      await setLoad('t');
    }
    a();
  }, []);

  useEffect(() => {
    async function a() {
      if (load === 't') {
        // xử lý mảng
        await setType([...new Set(type)]);
        await setCountry([...new Set(country)]);
      }
      await setShow('yes');
    }
    a();
  }, [load]);
  // Header

  async function selectedType(value, index) {
    await setSelectedValueType(value);
  }

  async function selectedCountry(value, index) {
    await setSelectedValueCountry(value);
  }

  async function selectedSort(value, index) {
    await setSelectedValueSort(value);
  }

  useEffect(() => {
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
    // async function hii() {
    if (selectedValueType === 'all' && selectedValueCountry === 'all') {
      if (selectedValueSort === 'tang') {
        setActiveIndex(0);
        setListFilter(list.filter(a => a.NgayChieu > currentyear));
      }
      if (selectedValueSort === 'giam') {
        setActiveIndex(0);
        setListFilter(
          list.filter(
            a => a.NgayChieu < currentyear && currentyear < a.NgayKetThuc,
          ),
        );
      }
      if (selectedValueSort === 'all') {
        setActiveIndex(0);
        setListFilter(list.filter(a => a.NgayKetThuc > currentyear));
      }
    }
    if (selectedValueType !== 'all' && selectedValueCountry === 'all') {
      if (selectedValueSort === 'tang') {
        setActiveIndex(0);
        setListFilter(
          list.filter(
            r => r.TheLoai === selectedValueType && r.NgayChieu > currentyear,
          ),
        );
      }
      if (selectedValueSort === 'giam') {
        setActiveIndex(0);
        setListFilter(
          list.filter(
            r =>
              r.TheLoai === selectedValueType &&
              r.NgayChieu < currentyear &&
              currentyear < r.NgayKetThuc,
          ),
        );
      }
      if (selectedValueSort === 'all') {
        setActiveIndex(0);
        setListFilter(
          list.filter(
            r => r.TheLoai === selectedValueType && r.NgayKetThuc > currentyear,
          ),
        );
      }
    }
    if (selectedValueType === 'all' && selectedValueCountry !== 'all') {
      if (selectedValueSort === 'tang') {
        setActiveIndex(0);

        setListFilter(
          list.filter(
            r =>
              r.TenNuocSX === selectedValueCountry && r.NgayChieu > currentyear,
          ),
        );
      }
      if (selectedValueSort === 'giam') {
        setActiveIndex(0);

        setListFilter(
          list.filter(
            r =>
              r.TenNuocSX === selectedValueCountry &&
              r.NgayChieu < currentyear &&
              currentyear < r.NgayKetThuc,
          ),
        );
      }
      if (selectedValueSort === 'all') {
        setActiveIndex(0);

        setListFilter(
          list.filter(
            r =>
              r.TenNuocSX === selectedValueCountry &&
              r.NgayKetThuc > currentyear,
          ),
        );
      }
    }
    if (selectedValueCountry !== 'all' && selectedValueType !== 'all') {
      if (selectedValueSort === 'tang') {
        setActiveIndex(0);
        setListFilter(
          list.filter(
            r =>
              r.TheLoai === selectedValueType &&
              r.TenNuocSX === selectedValueCountry &&
              r.NgayChieu > currentyear,
          ),
        );
      }
      if (selectedValueSort === 'giam') {
        setActiveIndex(0);

        setListFilter(
          list.filter(
            r =>
              r.TheLoai === selectedValueType &&
              r.TenNuocSX === selectedValueCountry &&
              r.NgayChieu < currentyear &&
              currentyear < r.NgayKetThuc,
          ),
        );
      }
      if (selectedValueSort === 'all') {
        setActiveIndex(0);
        setListFilter(
          list.filter(
            r =>
              r.TheLoai === selectedValueType &&
              r.TenNuocSX === selectedValueCountry &&
              r.NgayKetThuc > currentyear,
          ),
        );
      }
    }
    // hii();
  }, [selectedValueType, selectedValueCountry, selectedValueSort]);

  const _renderItem = ({item, index}) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            // alert(`You've clicked '${TenFilm}'`);
            navigation.navigate('DetailFilm', {film: item});
          }}>
          <Image
            source={{uri: `${Constant.API}/images/${item.AnhBia}`}}
            style={styles.carouselImg}
          />
          <Text style={styles.carouselText}>{item.TenFilm}</Text>
          {/* <Icon
            name="play-circle-outline"
            size={30}
            color="#FFF"
            style={styles.carouselIcon}
          /> */}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{flex: 1, height: screenHeight}}>
        <View style={{...StyleSheet.absoluteFill, backgroundColor: '#000'}}>
          <ImageBackground
            source={{uri: background}}
            style={styles.imgBg}
            blurRadius={8}>
            <View style={styles.viewSearch}>
              {/* <TextInput style={styles.input} placeholder="go vao ten phim ?" />
              <TouchableOpacity style={styles.icon}>
                <Icon name="search" color="#000" size={25} />
              </TouchableOpacity> */}

              <View
                style={{
                  flex: 1,
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
                    <Picker.Item label="Tất cả" value="all" />
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
                    <Picker.Item label="Tất cả" value="all" />
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
                <View style={{flex: 1, width: '100%'}}>
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
                    TRẠNG THÁI
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
                    <Picker.Item label="Tất cả" value="all" />
                    <Picker.Item label="Đang chiếu" value="giam" />
                    <Picker.Item label="Sắp chiếu" value="tang" />
                  </Picker>
                </View>
              </View>
            </View>

            {/* <Text
              style={{
                color: '#FFF',
                fontSize: 20,
                fontWeight: 'normal',
                marginLeft: 10,
                marginVertical: 10,
              }}>
              Danh Sách Phim
            </Text> */}

            <View style={styles.slideView}>
              <Carousel
                style={styles.carousel}
                ref={carouselRef}
                data={listFilter}
                renderItem={_renderItem}
                sliderWidth={screenWidth}
                itemWidth={200}
                inactiveSlideOpacity={0.5}
                onSnapToItem={index => {
                  setBackground(
                    `${Constant.API}/images/${listFilter[index].AnhBia}`,
                  );
                  setActiveIndex(index);
                }}
              />
            </View>

            <View style={styles.moreInfo}>
              <View style={{marginTop: 10}}>
                <Text style={styles.movieTitle}>
                  {listFilter === [] ||
                  typeof listFilter[activeIndex] === 'undefined'
                    ? null
                    : listFilter[activeIndex].TenFilm}
                </Text>
                <Text style={styles.movieDesc}>
                  {/* {listFilter !== []
                    ? listFilter[activeIndex].TomTat.slice(0, 200)
                    : 'Không có phim trùng khớp'} */}
                  {listFilter === [] ||
                  typeof listFilter[activeIndex] === 'undefined'
                    ? 'Không có phim như yêu cầu'
                    : listFilter[activeIndex].TomTat.slice(0, 150)}
                  ...
                  {'\n'}
                  <Text style={{color: 'red'}}>Thể loại: </Text>
                  {listFilter === [] ||
                  typeof listFilter[activeIndex] === 'undefined'
                    ? ''
                    : listFilter[activeIndex].TheLoai}
                </Text>
              </View>
              {/* <TouchableOpacity
                style={{marginRight: 15, marginTop: 10}}
                onPress={() => alert('CLICOU')}>
                <Icon name="queue" color="#131313" size={30} />
              </TouchableOpacity> */}
            </View>
          </ImageBackground>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgBg: {
    flex: 1,
    width: null,
    height: null,
    opacity: 1,
    justifyContent: 'flex-start',
    // backgroundColor: '#000',
    backgroundColor: 'transparent',
    resizeMode: 'cover',
  },
  viewSearch: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#FFF',
    elevation: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: '95%',
    flexDirection: 'row',
    alignSelf: 'center',
    flexWrap: 'wrap',
  },
  input: {
    width: '90%',
    padding: 13,
    paddingLeft: 20,
    fontSize: 17,
  },
  icon: {
    position: 'absolute',
    right: 20,
    top: 15,
  },
  slideView: {
    flex: 4,
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carousel: {
    flex: 1,
    overflow: 'visible',
  },
  carouselImg: {
    alignSelf: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  carouselText: {
    padding: 15,
    color: '#FFF',
    position: 'absolute',
    bottom: 10,
    left: 2,
    fontWeight: 'bold',
  },
  carouselIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  moreInfo: {
    backgroundColor: '#fff',
    opacity: 0.8,
    flex: 2,
    width: screenWidth,
    // height: screenHeight,
    // height: '30%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  movieTitle: {
    paddingLeft: 15,
    fontSize: 22,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 5,
  },
  movieDesc: {
    paddingLeft: 15,
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
