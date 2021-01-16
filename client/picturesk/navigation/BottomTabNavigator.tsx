import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import {View, Image, TouchableOpacity, StyleSheet} from 'react-native'

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabExploreScreen from '../screens/TabExploreScreen';
import TabCameraScreen from '../screens/TabCameraScreen';
import TabProfileScreen from '../screens/TabProfileScreen';
import { BottomTabParamList, TabExploreParamList, TabCameraParamList, TabProfileParamList } from '../types';

const BottomTab = createMaterialBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Explore"
      shifting={true}
      >
      <BottomTab.Screen
        name="Explore"
        component={TabExploreNavigator}  
        options={{
          tabBarColor:"#C84771",
          tabBarIcon: ({ focused, color }) => {
            return <Image style={{width: 20, height: 20}}source={require('../assets/images/multiple.png')} /> 
          }
        }}
      />
      <BottomTab.Screen
        name="Camera"
        component={TabCameraNavigator}
        options={{
          tabBarIcon: ({ focused, color }) => {
            return (
              <Image style={{width: 20, height: 20}}source={require('../assets/images/camera.png')} /> 
              )
          }
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={TabProfileNavigator}
        options={{
          tabBarColor:"#4D6CFA",
          tabBarIcon: ({ focused, color }) => {
            return (
              <Image style={{width: 20, height: 20}}source={require('../assets/images/profile.png')} /> 
              )
          }
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={20} style={{ marginBottom: -3 }} {...props} />;
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