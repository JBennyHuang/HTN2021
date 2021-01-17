import React, { useState } from 'react';
import { StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Text, View } from './Themed';
import * as MediaLibrary from 'expo-media-library';
import { FontAwesome } from '@expo/vector-icons';
import { Button, Dialog, Portal } from 'react-native-paper';
import * as FileSystem from 'expo-file-system';


export default function MasonryScreen({ path }: { path: string }) {
    const [hasPermissionML, setHasPermissionML] = React.useState(null); 
    const [albumIdx, setAlbumIdx] = useState(0)
    const [albums, setAlbums] = useState([])
    const [images, setImages] = useState([])

    const [visible, setVisible] = React.useState(false);

    const showDialog = () => setVisible(true);
  
    const hideDialog = () => setVisible(false);

    const rank = async () => {
      const formData = new FormData();
      
      for (const uri of images) {
        let file = await FileSystem.readAsStringAsync(uri, {'encoding': FileSystem.EncodingType.Base64})
        formData.append(uri, file)
      }

      fetch('http://35.238.1.235:5000/rank', {method: "POST", body: formData})
      .then(function(res) { return res.json(); })
      .then(function(data) { 
        var items = Object.keys(data).map(function(key) {
          return [key, data[key]];
        });
        
        items.sort(function(first, second) {
          return second[1] - first[1];
        });

        var objs = items.map(function (item) {
          return item[0];
        })

        setImages(objs)
      })
    }

    const getImages = async () => {
      setImages([]);
      let newImages = await MediaLibrary.getAssetsAsync({album: albums[albumIdx]});
      let objs = [];

      let i = 0;
      for(const asset of newImages.assets) {
          objs.push(asset.uri)
          i ++;
      }
      setImages(objs)
    }

    React.useEffect(() => {
        (async () => {
          let albums = await MediaLibrary.getAlbumsAsync();
          setAlbums(albums);
        })();
      }, []);

    React.useEffect(() => {
      getImages()
    }, [albumIdx])

    React.useEffect(() => {
      (async () => {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        setHasPermissionML(status === 'granted');
      })();
    }, []);

  return (
    <View style={styles.container}>
      <FlatList
        style={{height: '85%'}}
        scrollEnabled={true}
        numColumns={1}
        data={images}
        renderItem={({item, index}) => (
            <View style={styles.image}>
              <Image source={{uri: item}}
                style={{
                  margin: 10,
                  width: '100%',
                  height: 400,
                  resizeMode:'contain',
              }}/>
            </View>
          )}>
      </FlatList>

      <View style={{flex:1, flexDirection:"row", justifyContent:"space-between", margin:20, backgroundColor: 'transparent'}}>
        <TouchableOpacity
          style={{
            alignSelf: 'flex-end',
            alignItems: 'center',
            backgroundColor: 'transparent',
            height: 40,
            width: 40
          }}
          onPress={rank}>
          <FontAwesome name="rotate-right" style={{ color: "#000", fontSize: 40}} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignSelf: 'flex-end',
            alignItems: 'center',
            backgroundColor: 'transparent',
            height: 40,
            width: 40
          }}
          onPress={showDialog}>
          <FontAwesome name="th" style={{ color: "#000", fontSize: 40}} />
        </TouchableOpacity>
      </View>

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content>
            <FlatList 
              style={{height: '90%'}}
              scrollEnabled={true} 
              data={albums} 
              renderItem={({item, index}) => (
                <Button color='white' onPress={() => {
                    setAlbumIdx(index);
                    hideDialog();
                  }}>{item.title}</Button>
              )}>
            </FlatList>
          </Dialog.Content>
        </Dialog>
      </Portal>

    </View>
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
  });