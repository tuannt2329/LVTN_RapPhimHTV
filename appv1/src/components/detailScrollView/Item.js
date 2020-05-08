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
  KeyboardAvoidingView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Header} from '@react-navigation/stack';
import TriggeringView from './TriggeringView';
import HeaderImageScrollView from './ImageHeaderScrollView';
import * as Constant from '../../constants';
import LinearGradient from 'react-native-linear-gradient';
import styless, {colors} from '../../constants/index.style';

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
  },
  sectionTitle: {
    fontSize: 18,
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
});

class Item extends Component {
  constructor() {
    super();
    this.state = {showNavTitle: false};
  }

  render() {
    const {film} = this.props;
    const date = new Date(film.NgayChieu).toLocaleDateString('en-US');
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle="light-content" />
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
              <Text style={styles.name}>{film.TenFilm}</Text> (Ngày chiếu {date}
              )
            </Text>
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
