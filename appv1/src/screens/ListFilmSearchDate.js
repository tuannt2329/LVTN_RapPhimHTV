import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import * as types from '../constants';

function ListFilmSearchDate({navigation}) {
  navigation.setOptions({
    title: 'Tìm phim theo ngày',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerRight: () => (
      <TouchableOpacity
        onPress={async () =>
          await navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{name: 'Home'}],
            }),
          )
        }>
        <Entypo name={'home'} size={40} color="black" />
      </TouchableOpacity>
    ),
  });
  const [listFilm, setListFilm] = useState(null);

  useEffect(() => {
    fetch(`${types.API}film/find/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })
      .then(res => res.json())
      .then(a => {
        setListFilm(a.film);
      });
  }, []);
  return <View />;
}

export default ListFilmSearchDate;
