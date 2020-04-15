import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

class Tab2 extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Tab 3</Text>
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
export default Tab2;
