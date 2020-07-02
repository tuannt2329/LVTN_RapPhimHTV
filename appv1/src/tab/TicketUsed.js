import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import * as Constant from '../constants';
import * as types from '../constants';

function TicketUsed({films, image}) {
  //   const [film, setFilm] = useState(props.listTicket);
  const [seatVip, setSeatVip] = useState([]);
  const [seatCouple, setSeatCouple] = useState([]);
  // const [image, setImage] = useState([]);
  useEffect(() => {

    let vip = [],
      couple = [];
  }, []);
  function renderItem({item, index}) {
    let a = '',
      b = '';
    let hinh = '';
    image.map(value => {
      if (value.TenFilm === item.TenFilm) {
        hinh += value.AnhBia;
      }
    });
    return (
      <View style={{flex: 1, width: '100%'}}>
        <TouchableOpacity
          style={styles.card}
          //   onPress={() => {
          //     // alert(`You've clicked '${TenFilm}'`);
          //     navigation.navigate('DetailFilm', {film: item});
          //   }}
        >
          {/* <Image
            style={styles.cardImage}
            source={{uri: `${Constant.API}/images/${image}`}}
          /> */}
          <Image
            style={styles.cardImage}
            source={{uri: `${Constant.API}/images/${hinh}`}}
          />
          <View style={{alignItems: 'flex-start'}}>
            {item.TenGhe.map(val => {
              if (val.slice(0, 1) === 'R') {
                a += `${val} `;
              } else {
                b += `${val} `;
              }
            })}
            <Text style={styles.cardSize}>
              Phim <Text style={{color: 'red'}}> {item.TenFilm} </Text>
            </Text>
            <Text style={styles.cardSize}>
              Ngày chiếu{' '}
              <Text style={{color: 'red'}}>
                {item.ThoiGianChieu.split('T')[0].slice(0, 10)}{' '}
              </Text>
            </Text>
            <Text style={styles.cardSize}>
              Thời gian chiếu{' '}
              <Text style={{color: 'red'}}>
                {item.ThoiGianChieu.split('T')[1].slice(0, 5)}{' '}
              </Text>
            </Text>
            <Text style={styles.cardSize}>
              Phòng chiếu <Text style={{color: 'red'}}> {item.TenPhong} </Text>
            </Text>
            <Text style={styles.cardSize}>
              Chỗ Ngồi{' '}
              <Text style={{color: 'red'}}>
                VIP: {b};
                {a !== '' ? (
                  <Text style={{color: 'red'}}> COUPLE {a} </Text>
                ) : null}
              </Text>
            </Text>
            <Text style={styles.cardSize}>
              Thời gian đặt vé{' '}
              <Text style={{color: 'red'}}>
                {' '}
                {item.ThoiGianDat.split('T')[0].slice(0, 10)}{' '}
              </Text>
            </Text>
            <Text style={styles.cardSize}>
              Ngày xác nhận từ nhân viên{' '}
              <Text style={{color: 'red'}}>
                {' '}
                {item.ThoiGianXacNhan.split('T')[0].slice(0, 10)}{' '}
              </Text>
            </Text>
            <Text style={styles.cardSize}>
              Thời gian xác nhận từ nhân viên{' '}
              <Text style={{color: 'red'}}>
                {' '}
                {item.ThoiGianXacNhan.split('T')[1].slice(0, 5)}{' '}
              </Text>
            </Text>
            <Text
              style={{
                fontSize: 17,
                // height: 50,
                // padding: 1,
                color: 'blue',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
              }}>
              Giá vé:{' '}
              <Text style={{color: 'blue'}}>
                {
                  Number(item.GiaVe)
                    .toFixed(1)
                    .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                    .split('.0')[0]
                }
                VND
              </Text>
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 5,
          // alignItems: '',
          width: '90%',
          justifyContent: 'space-around',
          marginLeft: '10%',
          marginTop: 10,
        }}>
        <FlatList
          data={films.sort((a, b) => {
            b.ThoiGianDat - a.ThoiGianDat;
          })}
          keyExtractor={(item, index) => 'key' + index}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardSize: {
    fontSize: 15,
    // height: 50,
    // padding: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  card: {
    alignItems: 'center',
    backgroundColor: '#fff',

    marginBottom: 10,
    // marginLeft: '5%',
    // marginRight: '1%',
    width: '90%',
    marginTop: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },
  cardImage: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: 'red',
  },
  buttonFilter: {
    backgroundColor: 'blue',
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    borderColor: '#ddd',
    borderBottomWidth: 0,

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,

    borderRadius: 20,

    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 5,
    marginBottom: 5,
    paddingBottom: 10,

    borderWidth: 1,
    overflow: 'hidden',
  },
  filter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
export default TicketUsed;
