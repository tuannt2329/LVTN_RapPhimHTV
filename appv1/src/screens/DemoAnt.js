import React, {useEffect, useState} from 'react';
import {
  Text,
  Modal,
  View,
  Alert,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {WebView} from 'react-native-webview';
import * as types from '../constants';

const data = [
  {hour: 'Á'},
  {hour: 'Á'},
  {hour: 'Áasdsad'},
  {hour: 'Á'},
  {hour: 'Á'},
  {hour: 'Á'},
  {hour: 'Á'},
  {hour: 'Á'},
  {hour: 'Á'},
  {hour: 'Á'},
  {hour: 'Á'},
  {hour: 'Á'},
  {hour: 'Á'},
];

function DemoAnt({navigation, route}, props) {
  function renderScrollHorizontal({item}) {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          width: 90,
          borderColor: 'red',
          borderWidth: 1,
          backgroundColor: 'blue',
        }}>
        <Text style={{color: 'white', fontSize: 16}}>{item.hour}</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <View style={{height: 200}}>
        <Text>asdsad</Text>
        <FlatList
          style={{backgroundColor: 'black', opacity: 0.5}}
          horizontal={true}
          data={data}
          renderItem={MO}
        />
      </View>
    </View>
  );
}

export default DemoAnt;
