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
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionContent: {
    fontSize: 16,
    textAlign: 'justify',
  },
  keywords: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  keywordContainer: {
    backgroundColor: '#999999',
    borderRadius: 10,
    margin: 10,
    padding: 10,
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
              <Text style={styles.name}>{film.TenFilm}</Text>, (Ngày chiếu{' '}
              {date})
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
              <View style={styles.keywordContainer}>
                <Text style={styles.keyword}>Lượt Xem: {film.LuotXem}</Text>
              </View>
              <View style={styles.keywordContainer}>
                <Text style={styles.keyword}>Đạo diễn: {film.DaoDien}</Text>
              </View>
              <View style={styles.keywordContainer}>
                <Text style={styles.keyword}>{film.TheLoai}</Text>
              </View>
              <View style={styles.keywordContainer}>
                <Text style={styles.keyword}>{film.TenNuocSX}</Text>
              </View>
            </View>
          </View>
        </HeaderImageScrollView>
      </View>
    );
  }
}

export default Item;
