import * as React from 'react';
import { StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Camera } from 'expo-camera';


export default function TabCameraScreen() {
  const [uris, setUris] = React.useState([]);
  const [hasPermission, setHasPermission] = React.useState(null);
  const [hasPermissionML, setHasPermissionML] = React.useState(null); 
  const [type, setType] = React.useState(Camera.Constants.Type.back);
  const [focus, setFocus] = React.useState(false);
  const [cam, setCam] = React.useState(null)

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      MediaLibrary.requestPermissionsAsync()
      setHasPermission(status === 'granted');
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHasPermissionML(status === 'granted');
    })();
  }, []);

  useFocusEffect(() => {
    setFocus(true);
    return () => {
      setFocus(false)
    }
  })

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const makeGallery = async () => {
    if (hasPermissionML) {  
      let assets : MediaLibrary.Asset[] = []

      for(const uri of uris) {
        let asset = await MediaLibrary.createAssetAsync(uri);
        assets.push(asset);
      }

      if (assets.length > 0) {
        let album = await MediaLibrary.createAlbumAsync(Date.now().toString(), assets[0])
        if (assets.length > 1) {
          MediaLibrary.addAssetsToAlbumAsync(assets.slice(1), album);
        }
      }
    }
    setUris([])
  }

  const takePicture = () => {
    if (cam) {
      cam.takePictureAsync({
        onPictureSaved: (photo) => {
          // if (hasPermissionML) {
          //   MediaLibrary.saveToLibraryAsync(photo.uri);
          // }
          setUris(uris.concat([photo.uri]))
          // FileSystem.readAsStringAsync(photo.uri, {'encoding': FileSystem.EncodingType.Base64}).then((file) => {
          //   const formData = new FormData();

          //   formData.append(photo.uri, file)
            
          //   fetch('http://35.238.1.235:5000/rank', {method: "POST", body: formData})
          //   .then(function(res) { return res.json(); })
          //   .then(function(data) { console.log( JSON.stringify( data ) ) })
          // })
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
            }}
            onPress={() => {
              makeGallery();
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
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  camera: {
    flex: 1,
  },
});
