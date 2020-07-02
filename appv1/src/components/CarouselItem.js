import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  Alert,
  TouchableOpacity,
} from 'react-native';
import * as Constant from '../constants/index';
const {width, height} = Dimensions.get('window');

const CarouselItem = ({item}) => {
  return (
    <TouchableOpacity
      style={styles.cardView}
      onPress={() => {
        Alert.alert(
          `Khởi chiếu ngày: ${item.NgayChieu.split('T')[0]
            .split('-')
            .reverse()
            .join('-')}`,
        );
      }}>
      <Image
        style={styles.image}
        source={{uri: `${Constant.API}/images/${item.AnhBia}`}}
      />
      <View style={styles.textView}>
        <Text style={styles.itemTitle}> {item.TenFilm}</Text>
        <Text style={styles.itemDescription}>{` `}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardView: {
    flex: 1,
    width: width - 20,
    height: height / 4,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },

  textView: {
    position: 'absolute',
    bottom: 10,
    margin: 10,
    left: 5,
  },
  image: {
    width: width - 20,
    height: height / 3,
    borderRadius: 10,
  },
  itemTitle: {
    color: 'white',
    fontSize: 22,
    shadowColor: '#000',
    shadowOffset: {width: 0.8, height: 0.8},
    shadowOpacity: 1,
    shadowRadius: 3,
    marginBottom: 5,
    fontWeight: 'bold',
    elevation: 5,
  },
  itemDescription: {
    color: 'white',
    fontSize: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0.8, height: 0.8},
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default CarouselItem;
