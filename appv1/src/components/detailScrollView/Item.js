// chỉ dùng để render dữ liệu film từ đetailfilm
//
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  StatusBar,
  Modal,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {WebView} from 'react-native-webview';

import * as Animatable from 'react-native-animatable';
import {Header} from '@react-navigation/stack';
import TriggeringView from './TriggeringView';
import HeaderImageScrollView from './ImageHeaderScrollView';
import * as Constant from '../../constants';
import LinearGradient from 'react-native-linear-gradient';
import styless, {colors} from '../../constants/index.style';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as types from '../../constants';

const MIN_HEIGHT = Header.HEIGHT;
const MAX_HEIGHT = 250;

const styles = StyleSheet.create({
  image: {
    height: MAX_HEIGHT,
    width: Dimensions.get('window').width,
    alignSelf: 'stretch',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 20,
  },
  name: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'red',
    fontSize: 22,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    backgroundColor: 'white',

    borderWidth: 1,
    borderColor: '#29a0c8',
    // shadowColor: '#000',
    // shadowColor: '#29a0c8',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    borderRadius: 9,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionContent: {
    fontSize: 17,
    textAlign: 'justify',
  },
  keywords: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  keywordContainer: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    margin: 10,
    padding: 10,
    borderWidth: 1,

    borderColor: '#ddd',
    borderBottomWidth: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
  },
  keyword: {
    fontSize: 16,
    color: 'white',
  },
  titleContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageTitle: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 24,
  },
  navTitleView: {
    height: MIN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
    opacity: 0,
  },
  navTitle: {
    color: 'white',
    fontSize: 18,
    backgroundColor: 'transparent',
  },
  sectionLarge: {
    height: 600,
  },
  btnCloseModal: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 40,
  },
});

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNavTitle: false,
      modal: false,
      isFollow: null,
      numLike: 0,
      like: false,
      LuotLike: this.props.film.LuotLike,
      iconLike: 'like1',
    };
  }
  onCloseModal = () => {
    this.setState({
      modal: false,
    });
  };
  openModal = () => {
    this.setState({modal: true});
  };
  pressLike = async () => {
    if (this.state.like === false) {
      console.log('like');
      await this.setState({
        like: true,
        LuotLike: this.state.LuotLike + 1,
        iconLike: 'check',
      });
    } else {
      console.log('unlike');
      await this.setState({
        like: false,
        LuotLike: this.state.LuotLike - 1,
        iconLike: 'like1',
      });
    }
    const putUpdate = async () => {
      await fetch(`${types.API}film/updatefilm/`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          TenFilm: this.props.film.TenFilm,
          LuotLike: this.state.LuotLike,
        }),
      })
        .then(res => res.json())
        .then(a => {
          if (a.error) {
            console.log('err');
          } else {
            console.log('ok');
          }
        });
    };
    putUpdate();
  };
  pressFollow = () => {
    if (this.props.user !== null) {
      let followArray = this.props.film.TheoDoi;

      if (this.state.isFollow === false) {
        followArray.push(this.props.user.user.email);
        this.setState({isFollow: true});
      } else {
        followArray.map((value, index) => {
          if (value === this.props.user.user.email) {
            followArray.splice(index, 1);
            this.setState({isFollow: false});
          }
        });
      }
      let popo = fetch(`${types.API}film/updatefilm/`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          TenFilm: this.props.film.TenFilm,
          TheoDoi: followArray,
        }),
      });
    } else {
      Alert.alert('Cần Đăng Nhập', 'Bạn phải đăng nhập để theo dõi');
    }
  };
  UNSAFE_componentWillMount() {
    if (this.props.user !== null) {
      if (this.props.film.TheoDoi) {
        this.props.film.TheoDoi.includes(this.props.user.user.email)
          ? this.setState({isFollow: true})
          : this.setState({isFollow: false});
      }
    }
  }
  render() {
    const {film} = this.props;
    const date = film.NgayChieu.split('T')[0]
      .slice(0, 10)
      .split('-')
      .reverse()
      .join('-');

    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle="light-content" />
        <Modal
          animationType={'slide'}
          transparent={true}
          visible={this.state.modal}
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
                // {
                //   text: 'Ok',
                //   onPress: () => setModal(false),
                // },
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
              flex: 5,
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
                flex: 0.5,
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
                  this.onCloseModal();
                }}
              />
            </View>
            <View
              style={{
                flex: 5,
                alignContent: 'center',
                width: '100%',
                justifyContent: 'center',
                backgroundColor: 'white',
                alignItems: 'stretch',
                borderWidth: 2,
                borderTopEndRadius: 20,
                borderTopStartRadius: 20,
              }}>
              <WebView
                source={{uri: film.Trailer}}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                style={{flex: 1}}
              />
            </View>
          </View>
        </Modal>
        <HeaderImageScrollView
          maxHeight={MAX_HEIGHT}
          minHeight={MIN_HEIGHT}
          maxOverlayOpacity={0.6}
          minOverlayOpacity={0.3}
          fadeOutForeground
          renderHeader={() => (
            <Image
              source={{uri: `${Constant.API}/images/${film.AnhBia}`}}
              style={styles.image}
            />
          )}
          renderFixedForeground={() => (
            <Animatable.View
              style={styles.navTitleView}
              ref={navTitleView => {
                this.navTitleView = navTitleView;
              }}>
              <Text style={styles.navTitle}>{film.TenFilm}</Text>
            </Animatable.View>
          )}
          renderForeground={() => (
            <View style={styles.titleContainer}>
              <Text style={styles.imageTitle}>{film.TenFilm}</Text>
            </View>
          )}>
          <TriggeringView
            style={styles.section}
            onHide={() => this.navTitleView.fadeInUp(200)}
            onDisplay={() => this.navTitleView.fadeOut(100)}>
            {/*<LinearGradient*/}
            {/*  colors={[*/}
            {/*    colors.background1Login,*/}
            {/*    colors.background2Login,*/}
            {/*    colors.background3Login,*/}
            {/*  ]}*/}
            {/*  startPoint={{x: 1, y: 0}}*/}
            {/*  endPoint={{x: 0, y: 1}}*/}
            {/*  style={styless.gradient}*/}
            {/*/>*/}
            <Text style={styles.title}>
              <Text style={styles.name}>{film.TenFilm}</Text>
              {'\n'}Khởi chiếu: {date}
            </Text>
            <View style={styles.keywords}>
              <TouchableOpacity
                style={styles.title}
                onPress={() => this.openModal()}>
                <LinearGradient
                  start={{x: 0.0, y: 0.25}}
                  end={{x: 0.5, y: 1.0}}
                  locations={[0.2, 0.5, 0.6]}
                  colors={['#4c669f', '#3b5998', '#192f6a']}
                  style={styles.keywordContainer}>
                  <Text style={styles.keyword}>Trailer</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.title}
                onPress={() => this.pressLike()}>
                <LinearGradient
                  start={{x: 0.0, y: 0.25}}
                  end={{x: 0.5, y: 1.0}}
                  locations={[0.2, 0.5, 0.6]}
                  colors={['#4c669f', '#3b5998', '#192f6a']}
                  style={styles.keywordContainer}>
                  <Text style={styles.keyword}>
                    <AntDesign
                      // name="closecircle"
                      name={this.state.iconLike}
                      size={20}
                      color="white"
                    />
                    Thích {this.state.LuotLike}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.title}
                onPress={() => this.pressFollow()}>
                <LinearGradient
                  start={{x: 0.0, y: 0.25}}
                  end={{x: 0.5, y: 1.0}}
                  locations={[0.2, 0.5, 0.6]}
                  colors={['#4c669f', '#3b5998', '#192f6a']}
                  style={styles.keywordContainer}>
                  {this.state.isFollow === true ? (
                    <Text style={styles.keyword}>Bỏ Theo dõi</Text>
                  ) : (
                    <Text style={styles.keyword}>Theo dõi</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </TriggeringView>
          <View style={styles.section}>
            {/*<LinearGradient*/}
            {/*  colors={[*/}
            {/*    colors.background1Login,*/}
            {/*    colors.background2Login,*/}
            {/*    colors.background3Login,*/}
            {/*  ]}*/}
            {/*  startPoint={{x: 1, y: 0}}*/}
            {/*  endPoint={{x: 0, y: 1}}*/}
            {/*  style={styless.gradient}*/}
            {/*/>*/}
            <Text style={styles.sectionTitle}>Nội Dung</Text>
            <Text style={styles.sectionContent}>{film.TomTat}</Text>
          </View>
          <View style={[styles.section, styles.sectionLarge]}>
            <Text style={styles.sectionTitle}>Thông Tin </Text>
            <View style={styles.keywords}>
              <View>
                <LinearGradient
                  start={{x: 0.0, y: 0.25}}
                  end={{x: 0.5, y: 1.0}}
                  locations={[0.2, 0.5, 0.6]}
                  colors={['#4c669f', '#3b5998', '#192f6a']}
                  style={styles.keywordContainer}
                  // colors={['#4c669f', '#29a0c8', '#192f6a']}
                >
                  <Text style={styles.keyword}>Lượt Xem: {film.LuotXem}</Text>
                </LinearGradient>
              </View>
              <View>
                <LinearGradient
                  start={{x: 0.0, y: 0.25}}
                  end={{x: 0.5, y: 1.0}}
                  locations={[0.2, 0.5, 0.6]}
                  colors={['#4c669f', '#3b5998', '#192f6a']}
                  style={styles.keywordContainer}>
                  <Text style={styles.keyword}>Đạo diễn: {film.DaoDien}</Text>
                </LinearGradient>
              </View>
              <View>
                <LinearGradient
                  start={{x: 0.0, y: 0.25}}
                  end={{x: 0.5, y: 1.0}}
                  locations={[0.2, 0.5, 0.6]}
                  colors={['#4c669f', '#3b5998', '#192f6a']}
                  style={styles.keywordContainer}>
                  <Text style={styles.keyword}>{film.TheLoai}</Text>
                </LinearGradient>
              </View>
              <View>
                <LinearGradient
                  start={{x: 0.0, y: 0.25}}
                  end={{x: 0.5, y: 1.0}}
                  locations={[0.2, 0.5, 0.6]}
                  colors={['#4c669f', '#3b5998', '#192f6a']}
                  style={styles.keywordContainer}>
                  <Text style={styles.keyword}>{film.TenNuocSX}</Text>
                </LinearGradient>
              </View>
            </View>
          </View>
        </HeaderImageScrollView>
      </View>
    );
  }
}

export default Item;
