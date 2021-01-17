import * as React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import MasonryScreen from '../components/masonry';
import { Text, View } from '../components/Themed';

export default function TabExploreScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/images/bg.png')} style={styles.image}>
        {/* <Text style={styles.title}>Explore</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
        <EditScreenInfo path="/screens/TabExploreScreen.tsx" />
        <MasonryScreen path="/screens/masonry.tsx" />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
