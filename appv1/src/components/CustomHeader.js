import * as React from 'react';
import {
  Text,
  View,
  FlexStyle,
  Image,
  Button,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styless, {colors} from '../constants/index.style';
import {StackActions} from '@react-navigation/native';

export default class CustomHeader extends React.Component {
  constructor(props) {
    super(props);
  }
  checkBack = () => {
    if (this.props.isHome === 'true') {
      return true;
    } else {
      return false;
    }
  };

  get gradient() {
    return (
      <LinearGradient
        colors={[
          colors.background1Header,
          colors.background2Header,
          colors.background3Header,
        ]}
        startPoint={{x: 1, y: 0}}
        endPoint={{x: 0, y: 1}}
        style={styless.gradient}
      />
    );
  }
  render() {
    const {navigation, title} = this.props;
    const popAction = StackActions.pop(1);

    return (
      <View
        style={{
          // flex: 1,
          flexDirection: 'row',
          height: 50,
          backgroundColor: '#caffca',
        }}>
        {this.gradient}
        <View style={{flex: 2, justifyContent: 'center'}}>
          {this.checkBack() ? (
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <View style={{justifyContent: 'center'}}>
                <Image
                  style={{width: 40, height: 40}}
                  source={require('../assets/imgs/home.png')}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <View style={{justifyContent: 'center'}}>
                <Image
                  style={{width: 40, height: 40}}
                  source={require('../assets/imgs/home.png')}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
          )}
        </View>

        <View style={{flex: 3, justifyContent: 'center'}}>
          <Text
            style={{
              textAlign: 'center',
              justifyContent: 'center',
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            {title}
          </Text>
        </View>
        <View
          style={{flex: 2, justifyContent: 'center', alignItems: 'flex-end'}}>
          <Image
            style={{width: 100, height: 60}}
            // style={{marginLeft: '12%'}}
            source={require('../assets/imgs/logo.png')}
            resizeMode="contain"
          />
        </View>
      </View>
    );
  }
}

// export default function CustomHeader({title, isHome, navigation}) {
//   return (
//     <View style={{flexDirection: 'row', height: 50}}>
//       {isHome ? (
//         /*<TouchableOpacity onPress={() => navigation.openDrawer()}>*/
//         <TouchableOpacity onPress={() => navigation.navigate('Tab3')}>
//           <View style={{flex: 1, justifyContent: 'center'}}>
//             <Image
//               style={{width: 40, height: 40}}
//               source={require('../assets/imgs/menu.png')}
//               resizeMode="contain"
//             />
//           </View>
//         </TouchableOpacity>
//       ) : (
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <View style={{flex: 1, justifyContent: 'center'}}>
//             <Image
//               style={{width: 40, height: 40}}
//               source={require('../assets/imgs/menu.png')}
//               resizeMode="contain"
//             />
//           </View>
//         </TouchableOpacity>
//       )}
//       <View style={{flex: 1.5, justifyContent: 'center'}}>
//         <Text style={{textAlign: 'center'}}>{title}</Text>
//       </View>
//       <View style={{flex: 1}} />
//     </View>
//   );
// }
