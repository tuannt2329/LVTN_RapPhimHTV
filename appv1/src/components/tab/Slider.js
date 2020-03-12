import React from 'react';
import Carousel from 'react-native-snap-carousel';
import {ENTRIES1, ENTRIES2} from '../../constants/entries';
import {sliderWidth, itemWidth} from '../../constants/SliderEntry.style';
import styless, {colors} from '../../constants/index.style';
import SliderEntry from '../SliderEntry';
import SafeAreaView from 'react-native-safe-area-view';
import LinearGradient from 'react-native-linear-gradient';
import {
  Platform,
  View,
  ScrollView,
  Text,
  StatusBar,
  StyleSheet,
} from 'react-native';

export default class Slider extends React.Component {
  _renderLightItem({item, index}) {
    return <SliderEntry data={item} even={false} />;
  }

  layoutExample(number, title, type) {
    const isTinder = type === 'tinder';
    return (
      <View
        style={[
          styles.exampleContainer,
          isTinder ? styles.exampleContainerDark : styles.exampleContainerLight,
        ]}>
        <Carousel
          data={isTinder ? ENTRIES2 : ENTRIES1}
          renderItem={isTinder ? this._renderLightItem : this._renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          layout={type}
          loop={true}
        />
      </View>
    );
  }

  render() {
    const example4 = this.layoutExample(
      4,
      '"Tinder-like" layout | Loop',
      'tinder',
    );
    return <SafeAreaView style={styles.safeArea}>{example4}</SafeAreaView>;
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
