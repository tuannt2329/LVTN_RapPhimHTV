import React from 'react';
import {View, Text, StyleSheet, StatusBar, ScrollView} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import Carousel from 'react-native-snap-carousel';
import {ENTRIES1, ENTRIES2} from '../constants/entries';
import {sliderWidth, itemWidth} from '../constants/SliderEntry.style';
import styless, {colors} from '../constants/index.style';
import SliderEntry from '../components/SliderEntry';
import SafeAreaView from 'react-native-safe-area-view';
import LinearGradient from 'react-native-linear-gradient';
import * as types from '../constants';
import {CommonActions} from '@react-navigation/native';

class Tab1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // nhận luôn props film từ indexTopTab
      list: this.props.film,
    };
  }
  _renderItem({item, index}) {
    return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
  }

  getListFilm() {
    let result = fetch(`${types.API}film/find/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })
      .then(res => res.json())
      .then(res => {
        this.setState({list: res.film});
      })
      .catch(e => {
        console.log('catch Get list Film from tab1');
      });
    return result;
  }

  get gradient() {
    return (
      <LinearGradient
        colors={[colors.background1, colors.background2, colors.background3]}
        startPoint={{x: 1, y: 0}}
        endPoint={{x: 0, y: 1}}
        style={styless.gradient}
      />
    );
  }

  momentumExample(number, title) {
    return (
      <View style={styless.exampleContainer}>
        <Text style={styless.title}>{'Phim hiện đang công chiếu'}</Text>
        <Text style={styless.subtitle}>
          {'Nhấn vào phim bạn yêu thích và đặt vé ngay'}
        </Text>
        <Carousel
          data={this.state.list.filter(
            item =>
              Date.parse(item.NgayChieu) <= Date.parse(Date()) &&
              Date.parse(Date()) < Date.parse(item.NgayKetThuc),
          )}
          renderItem={this._renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          inactiveSlideScale={0.95}
          inactiveSlideOpacity={1}
          enableMomentum={true}
          activeSlideAlignment={'start'}
          containerCustomStyle={styless.slider}
          contentContainerCustomStyle={styless.sliderContentContainer}
          activeAnimationType={'spring'}
          activeAnimationOptions={{
            friction: 4,
            tension: 40,
          }}
        />
      </View>
    );
  }
  render() {
    if (this.state.list !== null) {
      const example2 = this.momentumExample(
        2,
        'Momentum | Left-aligned | Active animation',
      );
      return (
        <View style={styles.center}>
          {/*<Text style={styles.title}>Tab 1</Text>*/}
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
              {/*<StatusBar*/}
              {/*  translucent={true}*/}
              {/*  backgroundColor={'rgba(0, 0, 0, 0.3)'}*/}
              {/*  barStyle={'light-content'}*/}
              {/*/>*/}
              {this.gradient}
              <ScrollView
                style={styless.scrollview}
                scrollEventThrottle={200}
                directionalLockEnabled={true}>
                {example2}
              </ScrollView>
            </View>
          </SafeAreaView>
        </View>
      );
    } else {
      {
        return null;
      }
    }
  }
}
const styles = StyleSheet.create({
  center: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    marginBottom: 16,
  },
  androidButtonText: {
    color: 'blue',
    fontSize: 20,
  },
});
export default Tab1;
