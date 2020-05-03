import React from 'react';

import Tab1 from './Tab1';
import Tab2 from './Tab2';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
const MaterialTopTabs = createMaterialTopTabNavigator();
export default class createTopTabs extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <MaterialTopTabs.Navigator
        initialRouteName="Tab2"
        tabBarOptions={{
          labelStyle: {fontSize: 15, fontWeight: 'bold'},
          style: {backgroundColor: '#cfffe4'},
          activeTintColor: '#ff704b',
          showIcon: true,
        }}>
        <MaterialTopTabs.Screen
          name="Tab2"
          component={Tab1}
          options={{tabBarLabel: 'Now'}}
        />
        <MaterialTopTabs.Screen name="Tab3" component={Tab2}     options={{tabBarLabel: 'Comming soon'}}/>
      </MaterialTopTabs.Navigator>
    );
  }
}
