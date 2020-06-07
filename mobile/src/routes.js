import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import MeetUps from './pages/MeetUps';
import Subscriptions from './pages/Subscriptions';
import Profile from './pages/Profile';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

export default function Routes({ isSigned }) {
  return (
    <NavigationContainer>
      {!isSigned ? (
        <Stack.Navigator initialRouteName="SignIn" headerMode="none">
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      ) : (
        <BottomTab.Navigator
          initialRouteName="MeetUps"
          tabBarOptions={{
            keyboardHidesTabBar: true,
            activeTintColor: '#fff',
            inactiveTintColor: 'rgba(255,255,255,0.5)',
            style: {
              backgroundColor: '#2B1A2F',
            },
          }}
        >
          <BottomTab.Screen
            name="MeetUps"
            component={MeetUps}
            options={{
              tabBarLabel: 'Meetups',
              tabBarIcon: ({ color }) => (
                <Icon name="list" size={20} color={color} />
              ),
            }}
          />
          <BottomTab.Screen
            name="Subscriptions"
            component={Subscriptions}
            options={{
              tabBarLabel: 'Inscrições',
              tabBarIcon: ({ color }) => (
                <Icon name="local-offer" size={20} color={color} />
              ),
            }}
          />
          <BottomTab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarLabel: 'Perfil',
              tabBarIcon: ({ color }) => (
                <Icon name="person" size={20} color={color} />
              ),
            }}
          />
        </BottomTab.Navigator>
      )}
    </NavigationContainer>
  );
}

Routes.propTypes = {
  isSigned: PropTypes.bool.isRequired,
};
