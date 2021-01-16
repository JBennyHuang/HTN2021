import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import {Image} from 'react-native'

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabExploreScreen from '../screens/TabExploreScreen';
import TabCameraScreen from '../screens/TabCameraScreen';
import TabProfileScreen from '../screens/TabProfileScreen';
import { BottomTabParamList, TabExploreParamList, TabCameraParamList, TabProfileParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Explore"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint}}>
        <BottomTab.Screen
        name="Explore"
        component={TabExploreNavigator}
        options={{
          tabBarLabel:() => {return null},
          tabBarIcon: ({ focused, color, size }) => {
            return <Image style={{width: size, height: size}}source={require('../assets/images/profile.png')} /> 
          }
        }}
      />
      <BottomTab.Screen
        name="Camera"
        component={TabCameraNavigator}
        options={{
          tabBarLabel:() => {return null},
          tabBarIcon: ({ focused, color, size }) => {
            return <Image style={{width: size, height: size}}source={require('../assets/images/camera.png')} /> 
          }
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={TabProfileNavigator}
        options={{
          tabBarLabel:() => {return null},
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabExploreStack = createStackNavigator<TabExploreParamList>();

function TabExploreNavigator() {
  return (
    <TabExploreStack.Navigator>
      <TabExploreStack.Screen
        name="TabExploreScreen"
        component={TabExploreScreen}
        options={{ headerShown: false }}
      />
    </TabExploreStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabCameraParamList>();

function TabCameraNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabCameraScreen"
        component={TabCameraScreen}
        options={{ headerShown: false }}
      />
    </TabTwoStack.Navigator>
  );
}

const TabThreeStack = createStackNavigator<TabProfileParamList>();

function TabProfileNavigator() {
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name="TabProfileScreen"
        component={TabProfileScreen}
        options={{ headerShown: false }}
      />
    </TabThreeStack.Navigator>
  );
}