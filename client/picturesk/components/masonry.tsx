import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import * as MediaLibrary from 'expo-media-library';
import { useFocusEffect } from '@react-navigation/native';
import { Card } from 'react-native-paper';

export default function MasonryScreen({ path }: { path: string }) {
    const [focus, setFocus] = React.useState(false);
    const [images, setImages] = useState([
        // {image: require('./6062504.jpeg'), id: 1},
        // {image: require('./5990678.jpeg'), id: 2},
        // {image: require('./4617822.jpeg'), id: 3},
        // {image: require('./6062504.jpeg'), id: 4},
        // {image: require('./6062504.jpeg'), id: 5},
        // {image: require('./5990678.jpeg'), id: 6},
        // {image: require('./4617822.jpeg'), id: 7},
        // {image: require('./4617822.jpeg'), id: 8},
        // {image: require('./6062504.jpeg'), id: 9},
        // {image: require('./4617822.jpeg'), id: 10},
        // {image: require('./5990678.jpeg'), id: 11},
        // {image: require('./5990678.jpeg'), id: 12},
        // {uri: "file:///storage/emulated/0/DCIM/Camera/IMG_20180811_182608.jpg", id: 1}
    ])

    React.useEffect(() => {
        (async () => {
            let newImages = await MediaLibrary.getAssetsAsync({first: 10})
            let objs = []
            let i = 0
            for(const asset of newImages.assets) {
                objs.push({uri: asset.uri, id: images.length+i})
                i++
            }
            setImages(images.concat(objs))
            // console.log(images)
        })();
      }, [focus]);

    useFocusEffect(() => {
        setFocus(true);
        MediaLibrary.getPermissionsAsync()
        return () => setFocus(false)
      })

  return (
    <FlatList
    style={{margin: 5}}
    scrollEnabled={true}
    numColumns={2}
    columnWrapperStyle={styles.row}
    removeClippedSubviews={true}
      data={images}
      keyExtractor={(item) => `row-${item.id}`}
      renderItem={({item, index}) => (
        <View style={styles.image}>
        <Image source={{uri: item.uri}} 
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