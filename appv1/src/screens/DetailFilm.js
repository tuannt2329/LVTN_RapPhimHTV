import React from 'react';
import {Text} from 'react-native';

// Detail of the movie with data is passing from carousel through route
function DetailFilm({route, navigation}) {
  const {TenFilm} = route.params;
  return <Text>{TenFilm}</Text>;
}
export default DetailFilm;
