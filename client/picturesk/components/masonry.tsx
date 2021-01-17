import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';

import { Card } from 'react-native-paper';

export default function MasonryScreen({ path }: { path: string }) {
    const [images, setImages] = useState([
        {image: require('./6062504.jpeg'), id: 1},
        {image: require('./5990678.jpeg'), id: 2},
        {image: require('./4617822.jpeg'), id: 3},
        {image: require('./6062504.jpeg'), id: 4},
        {image: require('./6062504.jpeg'), id: 5},
        {image: require('./5990678.jpeg'), id: 6},
        {image: require('./4617822.jpeg'), id: 7},
        {image: require('./4617822.jpeg'), id: 8},
        {image: require('./6062504.jpeg'), id: 9},
        {image: require('./4617822.jpeg'), id: 10},
        {image: require('./5990678.jpeg'), id: 11},
        {image: require('./5990678.jpeg'), id: 12},
    ])

  return (
    <FlatList
    style={{margin: 5}}
    scrollEnabled={true}
    numColumns={2}
    columnWrapperStyle={styles.row}
      data={images}
      keyExtractor={(item) => `row-${item.id}`}
      renderItem={({item, index}) => (
        <View style={styles.image}>
        <Image source={item.image} 
        key={index}
        style={{
          width:175,
          height:225,
          resizeMode:'contain',
        }}
        
      />
      </View>

    )}
    />
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'transparent',
    },
    image: {
      backgroundColor: "transparent",
    },
    row: {
        flex: 1,
        justifyContent: "space-around"
    }
  });