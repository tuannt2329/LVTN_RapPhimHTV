import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import Toptab from '../tab/indexTopTab';
import Slider from '../tab/Slider';
import * as types from '../constants';
import Carousell from '../components/Carousel';
import Button from '../components/button';
import DotIndicator from '../components/indicator/DotIndicator';

function Home({navigation}) {
  const [film, setFilm] = useState(null);
  // biến count để ngăn chặn rerender vì hàm không dùng unmount
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
          console.log('list film from home', film);
        })
        .catch(e => {
          console.log('catch get list film from home');
          console.log(e);
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
          flex: 2,
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
        ) : (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <DotIndicator />
          </View>
        )}
      </View>
      <View style={{flex: 4}}>
        {/*  */}
        {/*  Truyền thẳng list film vào indexTopTab */}
        {/* */}
        {film !== null ? <Toptab film={film} /> : <DotIndicator />}
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text> </Text>
        <DotIndicator />
        <Button gradient onPress={() => navigation.navigate('Seat')}>
          <Text style={styles.textListFilm}> Các Bộ Phim Đang Chiếu </Text>
        </Button>
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
  textListFilm: {
    color: 'black',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
export default Home;
