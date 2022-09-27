import React, { useState } from 'react';
import { StyleSheet, StatusBar, View, TextInput, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { API_KEY } from 'react-native-dotenv';

export default function App() {
  const [location, setLocation] = useState({});
  const [address, setAddress] = useState("");

  const getLocation = () => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`)
      .then(response => response.json())
      .then(responseJson => setLocation({ latitude: responseJson.results[0].geometry.location.lat, longitude: responseJson.results[0].geometry.location.lng }))
      .catch(error => {
        Alert.alert('Error', error);
      });
  }

  const initial = {
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initial}
        region={{ ...location, latitudeDelta: 0.0322, longitudeDelta: 0.0221 }}
      >
        <Marker
          coordinate={location}
        />
      </MapView>
      <TextInput style={{ fontSize: 18, height: 50 }} placeholder='Address'
        onChangeText={text => setAddress(text)} />
      <Button title="Show" onPress={getLocation} />
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%"
  }
});