import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {ParallaxImage} from 'react-native-snap-carousel';
import styles from '../constants/SliderEntry.style';
import {withNavigation} from '@react-navigation/compat';
import * as Constant from '../constants/index';
class SliderEntry extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    even: PropTypes.bool,
    parallax: PropTypes.bool,
    parallaxProps: PropTypes.object,
  };

  get image() {
    const {
      data: {AnhBia},
      parallax,
      parallaxProps,
      even,
    } = this.props;
    return parallax ? (
      <ParallaxImage
        source={{uri: AnhBia}}
        containerStyle={[
          styles.imageContainer,
          even ? styles.imageContainerEven : {},
        ]}
        style={styles.image}
        parallaxFactor={0.35}
        showSpinner={true}
        spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
        {...parallaxProps}
      />
    ) : (
      <Image
        source={{uri: `${Constant.API}/images/${AnhBia}`}}
        style={styles.image}
      />
    );
  }

  render() {
    const {
      data: {TenFilm, LuotXem},
      even,
    } = this.props;
    const film = this.props.data;
    const {navigation} = this.props;
    const uppercaseTitle = TenFilm ? (
      <Text
        style={[styles.title, even ? styles.titleEven : {}]}
        numberOfLines={2}>
        {TenFilm.toUpperCase()}
      </Text>
    ) : (
      false
    );

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.slideInnerContainer}
        onPress={() => {
          // alert(`You've clicked '${TenFilm}'`);
          navigation.navigate('DetailFilm', {film: film});
        }}>
        <View style={styles.shadow} />
        <View
          style={[
            styles.imageContainer,
            even ? styles.imageContainerEven : {},
          ]}>
          {this.image}
          <View
            style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]}
          />
        </View>
        <View
          style={[styles.textContainer, even ? styles.textContainerEven : {}]}>
          {uppercaseTitle}
          <Text
            style={[styles.subtitle, even ? styles.subtitleEven : {}]}
            numberOfLines={2}>
            {LuotXem}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
export default withNavigation(SliderEntry);
