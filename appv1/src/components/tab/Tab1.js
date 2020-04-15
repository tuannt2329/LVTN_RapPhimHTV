import React from 'react';
import {View, Text, StyleSheet, StatusBar, ScrollView} from 'react-native';
import CustomHeader from '../CustomHeader';
import Carousel from 'react-native-snap-carousel';
import {ENTRIES1, ENTRIES2} from '../../constants/entries';
import {sliderWidth, itemWidth} from '../../constants/SliderEntry.style';
import styless, {colors} from '../../constants/index.style';
import SliderEntry from '../SliderEntry';
import SafeAreaView from 'react-native-safe-area-view';
import LinearGradient from 'react-native-linear-gradient';

class Tab1 extends React.Component {
  constructor(props) {
    super(props);
  }
  _renderItem({item, index}) {
    return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
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
        <Text style={styless.title}>{`Example ${number}`}</Text>
        <Text style={styless.subtitle}>{title}</Text>
        <Carousel
          data={ENTRIES2}
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
