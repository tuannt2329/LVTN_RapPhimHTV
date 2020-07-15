import React, {useEffect, useState} from 'react';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import * as types from '../constants';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';

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
  const [listSchedule, setListSchedule] = useState([]);
  const [listFilm, setListFilm] = useState([]);
  const [data, setData] = useState(null);
  const [date, setDate] = useState([]);
  const [donFirst, setDoneFirst] = useState(false);
  const [doneTwo, setDoneTwo] = useState(false);
  const [done, setDone] = useState(false);
  const [selectDate, setSelectDate] = useState(null);
  useEffect(() => {
    async function call() {
      await fetch(`${types.API}schedule/find/`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      })
        .then(res => res.json())
        .then(async a => {
          await setListSchedule(a.schedule);
        });
      await fetch(`${types.API}film/find/`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      })
        .then(res => res.json())
        .then(async a => {
          await setListFilm(a.film);
          setDoneFirst(true);
        });
    }
    call();
  }, []);

  useEffect(() => {
    if (donFirst === true) {
      async function b() {
        const today = moment().format('YYYY-MM-DD[T]HH:mm:ss');
        [0, 1, 2, 3, 4, 5, 6].map(async a => {
          let day = moment(today, 'YYYY-MM-DD[T]HH:mm:ss')
            .add(a, 'd')
            .format('YYYY-MM-DD[T]HH:mm:ss');
          await setDate(date => [...date, day]);
        });
      }
      b();
      setDoneTwo(true);
    }
  }, [donFirst]);

  useEffect(() => {
    if (doneTwo === true && date !== [] && listSchedule !== []) {
      setSelectDate(date[0]);
      const todaymoment = moment().format('YYYY-MM-DD[T]HH:mm:ss');
      let arr = [];
      async function handle() {
        // let arr = [];
        await date.forEach(a => {
          listSchedule.forEach(item => {
            if (item.ThoiGianChieu.split('T')[0] === a.slice(0, 10)) {
              if (
                item.ThoiGianChieu.split('T')[0] === todaymoment.split('T')[0]
              ) {
                // revert after use moment.format(), not a moment object ;
                let start = moment(
                  moment(item.ThoiGianChieu.slice(0, 19)).format(
                    'YYYY-MM-DD[T]HH:mm:ss',
                  ),
                );
                let diff = moment.duration(start.diff(moment(todaymoment)));
                if (parseInt(diff.asMinutes()) > 5) {
                  if (
                    arr.filter(e => e.date === a && e.film === item.TenFilm)
                      .length <= 0
                  )
                    arr.push({date: a, film: item.TenFilm, detail: {}});
                }
              } else {
                // setData(data => [...data, {date: a, Film: item}]);
                if (
                  arr.filter(e => e.date === a && e.film === item.TenFilm)
                    .length <= 0
                )
                  arr.push({date: a, film: item.TenFilm, detail: {}});
              }
            }
          });
        });
      }
      handle()
        .then(async res => {
          await listFilm.forEach(a => {
            arr.map(item => {
              if (a.TenFilm === item.film) {
                item.image = a.AnhBia;
                item.detail = a;
              }
            });
          });
        })
        .then(async c => await setData([...new Set(arr)]))
        .then(a => setDone(true));
    }
  }, [doneTwo]);

  function renderScrollHorizontal({item}) {
    let dayOfWeek = moment(item).day();
    // console.log(selectDate);
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          width: 120,
          borderRadius: 10,
          justifyContent: 'center',
          margin: 3,
          elevation: 25,
          alignSelf: 'center',
          textAlign: 'center',
        }}>
        <LinearGradient
          start={{x: 0.0, y: 0.2}}
          end={{x: 0, y: 1.0}}
          locations={[0.1, 0.5, 0.2]}
          colors={['#5F9AF2', '#D8B4D8', '#5465D6']}
          style={{
            backgroundColor: 'transparent',
            borderRadius: 10,
            borderWidth: 1,
            width: 120,
            borderColor: 'red',
            borderBottomWidth: 2,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 10,
            // height: 120,
          }}>
          <TouchableOpacity onPress={() => setSelectDate(item)}>
            <Text
              style={{
                color: 'white',
                margin: 10,
                textAlign: 'center',
                fontSize: 17,
                fontWeight: 'bold',
                textTransform: 'uppercase',
              }}>
              {dayOfWeek === 0
                ? `Chủ Nhật`
                : dayOfWeek === 1
                ? `Thứ 2`
                : dayOfWeek === 2
                ? `Thứ 3`
                : dayOfWeek === 3
                ? 'Thứ 4'
                : dayOfWeek === 4
                ? `Thứ 5`
                : dayOfWeek === 5
                ? `Thứ 6`
                : dayOfWeek === 6
                ? `Thứ 7`
                : null}
            </Text>
            <Text
              style={{
                color: 'red',
                margin: 5,
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: 30,
              }}>
              {item.split('T')[0].slice(8, 10)}
            </Text>
            <Text
              style={{
                color: 'black',
                margin: 5,
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: 16,
              }}>
              Tháng {item.split('T')[0].slice(5, 7)}
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  }

  function renderScrollVertical({item}) {
    console.log('detail', item.detail);
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          width: '90%',
          borderRadius: 10,
          justifyContent: 'center',
          margin: 3,
          elevation: 25,
          alignSelf: 'center',
          textAlign: 'center',
        }}>
        <LinearGradient
          start={{x: 0.0, y: 0.2}}
          end={{x: 0, y: 1.0}}
          locations={[0.1, 0.5, 0.2]}
          colors={['#5F9AF2', '#D8B4D8', 'pink']}
          style={{
            // backgroundColor: 'transparent',
            borderRadius: 25,
            borderWidth: 1,
            width: '100%',
            borderColor: 'red',
            borderBottomWidth: 2,
            elevation: 10,
            // height: 120,
          }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('DetailFilm', {film: item.detail})
            }>
            <Image
              source={{uri: `${types.API}/images/${item.image}`}}
              style={{
                height: 250,
                width: '100%',
                alignSelf: 'stretch',
                resizeMode: 'cover',
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
              }}
            />
            <Text
              style={{
                color: 'red',
                margin: 5,
                textAlign: 'center',
                fontWeight: 'bold',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
              }}>
              {item.film}
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  }
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        {done === true ? (
          <View style={{height: '100%', margin: '2%'}}>
            <FlatList
              style={{
                backgroundColor: 'white',
                borderRadius: 30,
                // opacity: 0.5,
              }}
              horizontal={true}
              data={date}
              renderItem={renderScrollHorizontal}
            />
          </View>
        ) : null}
      </View>
      <View style={{flex: 3}}>
        <Text
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
            textAlign: 'center',
            marginTop: '4%',
            fontWeight: 'bold',
            flexWrap: 'wrap',
          }}>
          {selectDate !== null
            ? ` Danh sách phim ngày ${selectDate
                .split('T')[0]
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-')}`
            : null}
          {}
        </Text>
        <View style={{height: '90%'}}>
          {done === true ? (
            <FlatList
              style={{
                backgroundColor: 'white',
                borderRadius: 30,
              }}
              horizontal={false}
              data={data.filter(a => a.date === selectDate)}
              renderItem={renderScrollVertical}
            />
          ) : null}
        </View>
      </View>
    </View>
  );
}

export default ListFilmSearchDate;
