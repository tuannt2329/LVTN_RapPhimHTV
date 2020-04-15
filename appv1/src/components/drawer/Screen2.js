import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

class Screen2 extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Screen2</Text>
      </View>
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
export default Screen2;
