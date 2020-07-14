import Autocomplete from 'react-native-autocomplete-input';
import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import * as types from '../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {CommonActions} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';

class AutocompleteExample extends Component {
  static renderFilm(film, navigation) {
    // const {TenFilm} = film;
    // const roman = episode_id < ROMAN.length ? ROMAN[episode_id] : episode_id;
    return (
      <View>
        {/* <Text style={styles.titleText}>
          {roman}. {title}
        </Text>
        <Text style={styles.directorText}>({director})</Text> */}
        {film.map(a => (
          <>
            <TouchableOpacity
              style={{
                borderColor: 'black',
                borderWidth: 2,
                borderRadius: 25,
                overflow: 'hidden',
                margin: '2%',
              }}
              onPress={() => {
                // console.log('a');
                navigation.navigate('DetailFilm', {film: a});
              }}>
              <Image
                source={{uri: `${types.API}/images/${a.AnhBia}`}}
                style={styles.image}
              />
              <Text style={styles.openingText}>{a.TenFilm}</Text>
            </TouchableOpacity>
          </>
        ))}
      </View>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      films: [],
      query: '',
    };
    this.props.navigation.setOptions({
      title: 'Tìm phim theo tên',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerRight: () => (
        <TouchableOpacity
          onPress={async () =>
            await this.props.navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [{name: 'Home'}],
              }),
            )
          }>
          {/* <Image
            source={require('../assets/imgs/home.png')}
            style={{height: 30, width: 50}}
            resizeMode="contain"
          /> */}
          <Entypo name={'home'} size={40} color="black" />
        </TouchableOpacity>
      ),
    });
  }

  componentDidMount() {
    const getFilmLoad = async () => {
      let currentTime = '';
      let currentMonth = '';
      let currentDay = '';
      let currentMinute = '';
      let currentyear = '';
      let now = new Date();
      now.getHours() < 10
        ? (currentTime += `0${now.getHours()}`)
        : (currentTime += now.getHours());
      now.getMonth() < 10
        ? (currentMonth += '0' + (now.getMonth() + 1))
        : (currentMonth += now.getMonth() + 1);
      now.getDate() < 10
        ? (currentDay += `0${now.getDate()}`)
        : (currentDay += now.getDate());
      now.getMinutes() < 10
        ? (currentMinute += `0${now.getMinutes()}`)
        : (currentMinute += now.getMinutes());
      currentyear +=
        now.getFullYear() +
        '-' +
        currentMonth +
        '-' +
        currentDay +
        'T' +
        currentTime +
        ':' +
        currentMinute +
        ':00.000Z';
      let popo = await fetch(`${types.API}film/find/`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      let popores = await popo.json();
      await this.setState({films: popores.film});
      await this.setState({
        films: this.state.films.filter(a => a.NgayKetThuc > currentyear),
      });
    };
    getFilmLoad();
  }

  findFilm(query) {
    try {
      if (query === '') {
        return [];
      }

      // const {films} = this.state;
      // const regex = new RegExp(`${query.trim()}`, 'i');
      // return films.filter(film => film.TenFilm.search(regex) >= 0);

      const inputValue = query.toLowerCase().trim();
      const inputLength = inputValue.length;

      const {films} = this.state;
      return inputLength === 0 || query === ''
        ? []
        : films.filter(ser => ser.TenFilm.toLowerCase().includes(inputValue));
    } catch (e) {}
  }

  render() {
    const {query} = this.state;
    const films = this.findFilm(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

    return (
      <View style={styles.container}>
        {/* <ScrollView
            nestedScrollEnabled={true}
            keyboardShouldPersistTaps={'handled'}> */}
        {films.length > 0 ? (
          <Text style={styles.itemText}>Có {films.length} phim phù hợp</Text>
        ) : null}

        <ScrollView keyboardShouldPersistTaps={'always'}>
          <SafeAreaView style={{flex: 1}}>
            <Autocomplete
              autoCapitalize="none"
              autoCorrect={true}
              containerStyle={styles.autocompleteContainer}
              data={
                films.length === 1 && comp(query, films[0].TenFilm) ? [] : films
              }
              keyExtractor={(item, i) => {
                return i;
              }}
              inputContainerStyle={{
                backgroundColor: 'green',
                // elevation: 6,
                borderRadius: 20,
                borderWidth: 2,
                margin: '2%',
                borderColor: 'red',
                overflow: 'hidden',
              }}
              listContainerStyle={{
                backgroundColor: 'white',
                // elevation: 6,
                // borderRadius: 20,
                borderWidth: 0,
                borderColor: 'white',
              }}
              listStyle={{
                backgroundColor: 'white',
                elevation: 6,
                borderRadius: 15,
                borderWidth: 0,
                borderColor: 'white',
              }}
              defaultValue={query}
              value={query}
              onChangeText={text => this.setState({query: text})}
              placeholder="Nhập tên phim..."
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({query: item.TenFilm});
                  }}>
                  <Text style={styles.itemText}>{item.TenFilm}</Text>
                </TouchableOpacity>
              )}
            />
          </SafeAreaView>

          <View style={styles.descriptionContainer}>
            {films.length > 0 ? (
              // AutocompleteExample.renderFilm(films[0], this.props.navigation)
              AutocompleteExample.renderFilm(films, this.props.navigation)
            ) : (
              // <Text>asd</Text>
              <Text style={styles.infoText}>Nhập tên bộ phim để tìm kiếm</Text>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 25,
  },
  autocompleteContainer: {
    // flex: 1,
    // left: 0,
    // position: 'absolute',
    // right: 0,
    // top: 0,
    // zIndex: 1,
    // borderRadius: 25,
    // elevation: 6,
    // backgroundColor: 'white',
    // borderColor: 'white',
    // borderWidth: 0,
    overflow: 'hidden',
  },
  itemText: {
    fontSize: 15,
    margin: 2,
  },
  descriptionContainer: {
    // `backgroundColor` needs to be set otherwise the
    // autocomplete input will disappear on text input.
    backgroundColor: '#F5FCFF',
    marginTop: 25,
  },
  infoText: {
    textAlign: 'center',
  },
  titleText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center',
  },
  directorText: {
    color: 'grey',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center',
  },
  openingText: {
    textAlign: 'center',
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
  },
  image: {
    height: 250,
    width: Dimensions.get('window').width,
    alignSelf: 'stretch',
    resizeMode: 'cover',
  },
});

export default AutocompleteExample;
