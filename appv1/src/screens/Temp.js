import React from 'react';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {Image, Text, TouchableOpacity, View} from 'react-native';

function Temp(props) {
  const navigation = useNavigation();

  return (
    <View flex={1}>
      <View
        style={{marginTop: '10%', backgroundColor: 'red', borderColor: 'red'}}>
        <Text>asdasd asda sd asd as d asd as d as dsa d</Text>
      </View>
      <View
        style={{marginTop: '10%', backgroundColor: 'red', borderColor: 'red'}}
      />
    </View>
  );
}

export default Temp;
