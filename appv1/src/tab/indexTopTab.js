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
    // Nhận list film từ props Home
    const {film} = this.props;
    return (
      <MaterialTopTabs.Navigator
        initialRouteName="Tab1"
        tabBarOptions={{
          labelStyle: {fontSize: 15, fontWeight: 'bold', },
          style: {backgroundColor: '#bfdde7'},
          activeTintColor: 'red',
          inactiveTintColor: 'gray',

          showIcon: true,
        }}>
        <MaterialTopTabs.Screen
          name="Tab1"
          // component={Tab1}
          options={{tabBarLabel: 'Đang Chiếu'}}>
          {/*

           Sử dụng cách đưới để truyền props được khi khởi tạo stack
            Dung component={} không truyền được props đi

           */}
          {props => <Tab1 film={film} />}
        </MaterialTopTabs.Screen>
        <MaterialTopTabs.Screen
          name="Tab2"
          // component={Tab2}
          options={{tabBarLabel: 'Sắp ra mắt'}}>
          {props => <Tab2 film={film} />}
        </MaterialTopTabs.Screen>
      </MaterialTopTabs.Navigator>
    );
  }
}
