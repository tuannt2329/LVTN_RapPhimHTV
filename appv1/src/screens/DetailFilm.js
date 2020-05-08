import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
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
import * as Constant from '../constants';
import Badge from '../components/badge';
import Card from '../components/card';
import Button from '../components/button';
import Item from '../components/detailScrollView/Item';
import CustomHeader from '../components/CustomHeader';
import SafeAreaView from 'react-native-safe-area-view';
import {CommonActions} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import styless from '../constants/index.style';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
const {width} = Dimensions.get('window');
import {useSelector} from 'react-redux';

const MIN_HEIGHT = 100;
const MAX_HEIGHT = 250;

// Detail of the movie with data is passing from carousel through route
function DetailFilm({route, navigation}) {
  const {film} = route.params;
  const [modal, setModal] = useState(false);
  const [date, setDate] = useState(false);
  const [start, setStart] = useState(false);
  const [end, setEnd] = useState(false);
  const user = useSelector(state => state.loginIn.user);

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
    setDate(date.toLocaleDateString());
    hideDatePicker();
  };

  // end date time picker

  // unmount
  useEffect(() => {
    //month day year
    const startDate = new Date(film.NgayChieu).toLocaleDateString('en-GB');
    console.log(startDate);
    setStart(startDate);
    const endDate = new Date(film.NgayKetThuc).toLocaleDateString('en-GB');
    console.log(endDate);
    setEnd(endDate);
    return function clean() {
      setDate(false);
      setEnd(false);
      setStart(false);
    };
  }, []);

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
              routes: [{name: 'HomeStack'}],
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
  return (
    <View flex={1}>
      {/*<CustomHeader isHome="true" title="ĐĂNG NHẬP" navigation={navigation} />*/}
      <View flex={6}>
        <Item film={film} />
      </View>
      <View flex={1} style={{justifyContent: 'center'}}>
        <Block padding={[0, theme.sizes.base * 2]}>
          <Block middle center>
            {/*
                  modal
            */}
            <Modal
              animationType={'fade'}
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
                      text: 'Hủy Bỏ',
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
                  View for transparent top's modal
              */}
              <View style={{flex: 1}} />
              {/*
                  view cho phần modal không transparent
              */}
              <View
                style={{
                  flex: 1,
                  // height: '95%',
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#98c6cd',
                }}>
                {/*
                    View Button X đóng modal
                  */}
                <View
                  style={{
                    flex: 0.5,
                    alignContent: 'center',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#00000000',
                  }}>
                  <FontAwesome5Icon
                    name="times"
                    size={40}
                    color="red"
                    style={styless.btnCloseModal}
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
                    flex: 2,
                    width: '100%',
                    // justifyContent: 'center',
                    backgroundColor: 'white',
                    alignItems: 'center',
                  }}>
                  {/*<View>*/}
                  <View
                    style={{
                      // flexDirection: 'row',
                      alignContent: 'space-between',
                    }}>
                    {/* <Text
                          style={{
                            marginTop: 10,
                          }}>
                          Chọn Ngày:
                        </Text> */}
                    <TouchableOpacity onPress={showDatePicker}>
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
                    <Text>{date}</Text>
                  </View>
                </View>
                {/*</View>*/}
                <View style={{flex: 2, backgroundColor: 'red', width: '100%'}}>
                  <FontAwesome5Icon name="backspace" size={40} />
                </View>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: 'yellow',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <TouchableOpacity
                    // gradient
                    onPress={() => {
                      {
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
                          : (navigation.navigate('Seat', {film: film}),
                            setModal(false));
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
            </Modal>
            {/*
              button show modal
            */}
            <TouchableOpacity
              // gradient
              onPress={() => {
                if (new Date(start) > new Date()) {
                  Alert.alert('Phim chưa được công chiếu', 'Trở lại sau');
                  return;
                }
                setModal(true);
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
