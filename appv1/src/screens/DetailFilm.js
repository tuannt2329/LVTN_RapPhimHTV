import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Block from '../components/block';
import Text from '../components/text';
import {theme} from '../components/theme';
import * as Constant from '../constants';
import Badge from '../components/badge';
import Card from '../components/card';
import Button from '../components/button';

import Item from '../components/detailScrollView/Item';
import CustomHeader from '../components/CustomHeader';
import SafeAreaView from 'react-native-safe-area-view';
const {width} = Dimensions.get('window');

const MIN_HEIGHT = 100;
const MAX_HEIGHT = 250;

// Detail of the movie with data is passing from carousel through route
function DetailFilm({route, navigation}) {
  const {film} = route.params;
  return (
    // <ScrollView showsVerticalScrollIndicator={false}>
    //   <Block style={styles.product}>
    //     <Text h2 bold>
    //       {film.TenFilm}
    //     </Text>
    //     <Block flex={false} row margin={[theme.sizes.base, 0]}>
    //       <Text caption gray style={styles.tag}>
    //         {film.LuotXem}
    //       </Text>
    //       <Text caption gray style={styles.tag}>
    //         Ngày Khởi Chiếu {date}
    //       </Text>
    //     </Block>
    //     <Block center>
    //       <Image
    //         source={{uri: `${Constant.API}/images/${film.AnhBia}`}}
    //         style={{height: 200, width: '90%', borderRadius: 10}}
    //       />
    //     </Block>
    //     <Text black light height={22}>
    //       {film.TomTat}
    //     </Text>
    //
    //     <Block>
    //       <TouchableOpacity style={{backgroundColor: 'red', width: '100%'}} />
    //     </Block>
    //   </Block>
    // </ScrollView>
    <View flex={1}>
      {/*<CustomHeader isHome="true" title="ĐĂNG NHẬP" navigation={navigation} />*/}
      <View flex={6}>
        <Item film={film} />
      </View>
      <View flex={1} style={{justifyContent: 'center'}}>
        <Block padding={[0, theme.sizes.base * 2]}>
          <Block middle center>
            <Button
              gradient
              style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
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
              </Text>
            </Button>
          </Block>
        </Block>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // product: {
  //   paddingHorizontal: theme.sizes.base * 2,
  //   paddingVertical: theme.sizes.padding,
  // },
  // tag: {
  //   borderColor: theme.colors.black,
  //   color: 'red',
  //   borderWidth: StyleSheet.hairlineWidth,
  //   borderRadius: theme.sizes.base,
  //   paddingHorizontal: theme.sizes.base,
  //   paddingVertical: theme.sizes.base / 2.5,
  //   marginRight: theme.sizes.base * 0.625,
  // },
  // category: {
  //   // this should be dynamic based on screen width
  //   minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
  //   maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
  //   maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
  // },
  // shadow: {
  //   alignItems: 'center',
  //   shadowColor: '#000',
  //   shadowOffset: {
  //     width: 200,
  //     height: 200,
  //   },
  //   shadowOpacity: 0.58,
  //   shadowRadius: 16.0,
  //   elevation: 24,
  // },
  // image: {
  //   height: MAX_HEIGHT,
  //   width: Dimensions.get('window').width,
  //   alignSelf: 'stretch',
  //   resizeMode: 'cover',
  // },
  // title: {
  //   fontSize: 20,
  // },
  // name: {
  //   fontWeight: 'bold',
  // },
  // section: {
  //   padding: 20,
  //   borderBottomWidth: 1,
  //   borderBottomColor: '#cccccc',
  //   backgroundColor: 'white',
  // },
  // sectionTitle: {
  //   fontSize: 18,
  //   fontWeight: 'bold',
  // },
  // sectionContent: {
  //   fontSize: 16,
  //   textAlign: 'justify',
  // },
  // keywords: {
  //   flexDirection: 'row',
  //   justifyContent: 'flex-start',
  //   alignItems: 'flex-start',
  //   flexWrap: 'wrap',
  // },
  // keywordContainer: {
  //   backgroundColor: '#999999',
  //   borderRadius: 10,
  //   margin: 10,
  //   padding: 10,
  // },
  // keyword: {
  //   fontSize: 16,
  //   color: 'white',
  // },
  // titleContainer: {
  //   flex: 1,
  //   alignSelf: 'stretch',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // imageTitle: {
  //   color: 'white',
  //   backgroundColor: 'transparent',
  //   fontSize: 24,
  // },
  // navTitleView: {
  //   height: MIN_HEIGHT,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   paddingTop: 16,
  //   opacity: 0,
  // },
  // navTitle: {
  //   color: 'white',
  //   fontSize: 18,
  //   backgroundColor: 'transparent',
  // },
  // sectionLarge: {
  //   height: 600,
  // },
});
export default DetailFilm;
