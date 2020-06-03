// @flow
import * as React from 'react';
import {View, StyleSheet, Image, Dimensions, TouchableOpacity, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type HeaderProps = {
  section: Section,
};

const {width} = Dimensions.get('window');

export default class Header extends React.PureComponent<HeaderProps> {
  render() {
    const {section} = this.props;
    const colors = [section.leftColor, section.rightColor];
    return (
      <View style={styles.container}>
        {/*<TouchableOpacity onPress={()=>console.log('press')}>*/}
        {/*  <Text>asldjasjd</Text>*/}
        {/*</TouchableOpacity>*/}
        <Image source={section.image} style={styles.image} />
        <LinearGradient
          style={styles.gradient}
          // start={{x: 0, y: 0}}
          // end={{x: 1, y: 0}}
          {...{colors}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: null,
    height: null,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.9,
  },
});
