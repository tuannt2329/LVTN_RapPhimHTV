import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import CustomHeader from '../CustomHeader';
import SafeAreaView from 'react-native-safe-area-view';
import Toptab from '../tab/indexTopTab';
import Slider from '../tab/Slider';
class Screen1 extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <CustomHeader
          isHome="true"
          title="Homessssss"
          navigation={this.props.navigation}
        />
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Slider />
        </View>
        <View style={{flex: 3}}>
          <Toptab />
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text> from home screen</Text>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  center: {
    flex: 1,
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
export default Screen1;
