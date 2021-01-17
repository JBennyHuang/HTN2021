import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Camera } from 'expo-camera';


export default function TabCameraScreen() {
  const [hasPermission, setHasPermission] = React.useState(null);
  const [type, setType] = React.useState(Camera.Constants.Type.back);
  const [focus, setFocus] = React.useState(false);
  const [cam, setCam] = React.useState(null)

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useFocusEffect(() => {
    setFocus(true);
    return () => setFocus(false)
  })

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = () => {
    if (cam) {
      cam.takePictureAsync({
        onPictureSaved: (photo) => {
          console.log(photo);
        }
      });
    }
  }

  return (
    <View style={styles.container}>
      {focus && <Camera ref={(ref) => {setCam(ref)}} style={styles.camera} type={type}>
        <View style={{flex:1, flexDirection:"row", justifyContent:"space-between", margin:20, backgroundColor: 'transparent'}}>
          <TouchableOpacity
            style={{
              alignSelf: 'flex-end',
              alignItems: 'center',
              backgroundColor: 'transparent',                  
            }}>
            <FontAwesome
                name="photo"
                style={{ color: "#fff", fontSize: 40}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignSelf: 'flex-end',
              alignItems: 'center',
              backgroundColor: 'transparent',
            }}
            onPress={() => {
              takePicture();
            }}>
            <FontAwesome
                name="camera"
                style={{ color: "#fff", fontSize: 40}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignSelf: 'flex-end',
              alignItems: 'center',
              backgroundColor: 'transparent',
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <MaterialCommunityIcons
                name="camera-switch"
                style={{ color: "#fff", fontSize: 40}}
            />
          </TouchableOpacity>
        </View>
      </Camera>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
  camera: {
    flex: 1,
  },
});
