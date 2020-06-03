import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {Sections, type Section} from '../components/animationList';
import LinearGradient from 'react-native-linear-gradient';
import TicketUnuse from '../tab/TicketUnuse';
import TicketUsed from '../tab/TicketUsed';

const mariner = '#3B5F8F';
const mediumPurple = '#8266D4';
const tomato = '#F95B57';
const mySin = '#F3A646';

const {width} = Dimensions.get('window');
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
const MaterialTopTicketTabs = createMaterialTopTabNavigator();
function Ticket({navigation, route}) {
  const user = useSelector(state => state.loginIn.user);
  const [ready, setReady] = useState(false);
  const colors = [mediumPurple, tomato];

  return (
    // <View style={{flex: 1, width}}>
    //   <View style={{flex: 1}}>
    //     <TouchableOpacity style={{flex: 1, borderRadius: 20}}>
    //       <LinearGradient
    //         style={{flex: 1}}
    //         start={{x: 0, y: 0}}
    //         end={{x: 1, y: 0}}
    //         /// {...{colors}}
    //         colors={[tomato, mediumPurple]}>
    //         <Text style={styles.text}>Vé Chưa Sử Dụng</Text>
    //       </LinearGradient>
    //     </TouchableOpacity>
    //   </View>
    //   <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    //     <TouchableOpacity style={{flex: 1, width}}>
    //       <LinearGradient
    //         style={{flex: 1}}
    //         start={{x: 0, y: 0}}
    //         end={{x: 1, y: 0}}
    //         /// {...{colors}}
    //         colors={[mariner, mediumPurple]}>
    //         <Text style={styles.text}>Vé Đã Sử Dụng</Text>
    //       </LinearGradient>
    //     </TouchableOpacity>
    //   </View>
    // </View>

    <MaterialTopTicketTabs.Navigator
      initialRouteName="Tab1"
      tabBarOptions={{
        labelStyle: {fontSize: 15, fontWeight: 'bold'},
        style: {backgroundColor: '#bfdde7'},
        activeTintColor: 'red',
        inactiveTintColor: 'gray',
        showIcon: true,
      }}>
      <MaterialTopTicketTabs.Screen
        name="Tab1"
        // component={Tab1}
        options={{tabBarLabel: 'Vé Chưa Sử Dụng'}}>
        {/*

           Sử dụng cách đưới để truyền props được khi khởi tạo stack
            Dung component={} không truyền được props đi

           */}
        {props => <TicketUnuse user={user} />}
      </MaterialTopTicketTabs.Screen>
      <MaterialTopTicketTabs.Screen
        name="Tab2"
        // component={Tab2}
        options={{tabBarLabel: 'Vé Đã Sử Dụng'}}>
        {props => <TicketUsed user={user} />}
      </MaterialTopTicketTabs.Screen>
    </MaterialTopTicketTabs.Navigator>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: null,
    height: null,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.9,
  },
  text: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'uppercase',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '40%',
  },
});
export default Ticket;
