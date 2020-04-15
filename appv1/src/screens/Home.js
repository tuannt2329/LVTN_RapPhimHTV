import React, {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import SafeAreaView from 'react-native-safe-area-view';
import Toptab from '../tab/indexTopTab';
import Slider from '../tab/Slider';
import * as types from '../constants';
import Carousell from '../components/Carousel';
function Home({navigation}) {
  const [film, setFilm] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const getList = () => {
      fetch(`${types.API}film/find/`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      })
        .then(res => res.json())
        .then(res => {
          setFilm(res.film);
          console.log(film);
        })
        .catch(e => {
          console.log('catch sign up');
        });
    };
    getList();
  }, [count]);
  return (
    <SafeAreaView style={{flex: 1}}>
      {/*<CustomHeader*/}
      {/*  isHome="true"*/}
      {/*  title="Homessssss"*/}
      {/*  navigation={this.props.navigation}*/}
      {/*/>*/}
      <View
        style={{
          flex: 1.5,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {/*<Slider />*/}
        {film !== null ? (
          <Carousell
            data={film.filter(
              item =>
                Date.parse(item.NgayChieu) <= Date.parse(Date()) &&
                Date.parse(Date()) < Date.parse(item.NgayKetThuc),
            )}
          />
        ) : null}
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
export default Home;
