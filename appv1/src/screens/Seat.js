import React from 'react';
import {Text, FlatList, View, StyleSheet, Dimensions} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import CustomHeader from '../components/CustomHeader';
import {ListItemProps, ListItem} from 'react-native-elements';
export default class Seat extends React.Component {
  constructor(props) {
    super();
  }
  componentDidMount(): void {
    console.log(Dimensions.get('screen').width / 2);
  }

  render() {
    let halfWidth = Dimensions.get('screen').width / 2;
    return (
      <SafeAreaView style={{flex: 1}}>
        <CustomHeader
          isHome="false"
          title="CHỌN GHẾ"
          navigation={this.props.navigation}
        />
        <View
          style={{
            flex: 1,
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            backgroundColor: 'red',
          }}
        />
        <View style={style.container_seat}>
          <View style={style.seat} />
          <View style={style.seat} />
          <View style={style.seat} />
          <View style={style.seat} />
          <View style={style.seat} />
          <View style={style.seat} />
          <View style={style.seat} />
          <View style={style.seat} />
          <View style={style.seat} />
          <View style={style.seat} />
        </View>
        <View style={{flex: 1, backgroundColor: 'red'}} />
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  container_seat: {
    flex: 3,
    alignItems: 'flex-start',
    padding: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: '0%',
    width: '100%',
    backgroundColor: 'blue',
  },
  seat: {
    marginLeft: 9,
    marginVertical: 10,
    backgroundColor: 'black',
    height: 15,
    width: 15,
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: 'black',
    borderStyle: 'dotted',
    height: 200,
    borderLeftWidth: 5,
    margin: 10,
  },
});

//   constructor(props) {
//     super(props);
//
//     this.state = {
//       loading: false,
//       data: [],
//       page: 1,
//       seed: 1,
//       error: null,
//       refreshing: false,
//     };
//   }
//
//   componentDidMount() {
//     this.makeRemoteRequest();
//   }
//
//   makeRemoteRequest = () => {
//     const {page, seed} = this.state;
//     const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
//     this.setState({loading: true});
//     fetch(url)
//       .then(res => res.json())
//       .then(res => {
//         this.setState({
//           data: page === 1 ? res.results : [...this.state.data, ...res.results],
//           error: res.error || null,
//           loading: false,
//           refreshing: false,
//         });
//       })
//       .catch(error => {
//         this.setState({error, loading: false});
//       });
//   };
//
//   render() {
//     return (
//       <FlatList
//         data={this.state.data}
//         renderItem={({item}) => (
//           <ListItem
//             roundAvatar
//             title={`${item.name.first} ${item.name.last}`}
//             subtitle={item.email}
//             avatar={{uri: item.picture.thumbnail}}
//           />
//         )}
//       />
//     );
//   }
// }
