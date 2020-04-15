import React from 'react';

import Tab1 from './Tab1';
import Tab2 from './Tab2';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
const MaterialTopTabs = createMaterialTopTabNavigator();
export default class createTopTabs extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(): void {
    console.log('From index TopTab');
  }

  render() {
    return (
      <MaterialTopTabs.Navigator
        initialRouteName="Tab1"
        tabBarOptions={{
          labelStyle: {fontSize: 15, fontWeight: 'bold'},
          style: {backgroundColor: '#cfffe4'},
          activeTintColor: '#ff704b',
          showIcon: true,
        }}>
        <MaterialTopTabs.Screen
          name="Tab1"
          component={Tab1}
          options={{tabBarLabel: 'Now'}}
        />
        <MaterialTopTabs.Screen
          name="Tab2"
          component={Tab2}
          options={{tabBarLabel: 'Coming soon'}}
        />
      </MaterialTopTabs.Navigator>
    );
  }
}
