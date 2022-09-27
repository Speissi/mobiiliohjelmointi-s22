import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, View, TextInput, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { API_KEY } from 'react-native-dotenv';

export default function App() {
  const [location, setLocation] = useState({});
  const [currentLocation, setCurrentLocation] = useState({ longitude: 0, latitude: 0 });
  const [address, setAddress] = useState("");

  useEffect(() => {
    async function fetchCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('No permission to get location')
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      setCurrentLocation({ ...currentLocation, longitude: currentLocation.coords.longitude, latitude: currentLocation.coords.latitude });
    }
    fetchCurrentLocation();
  });

  const getLocation = () => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`)
      .then(response => response.json())
      .then(responseJson => setLocation({ latitude: responseJson.results[0].geometry.location.lat, longitude: responseJson.results[0].geometry.location.lng }))
      .catch(error => {
        alert(error);
      });
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={Object.keys(location).length !== 0 ? { ...location, latitudeDelta: 0.0322, longitudeDelta: 0.0221 } : { ...currentLocation, latitudeDelta: 0.0322, longitudeDelta: 0.0221 }}
      >
        {Object.keys(location).length !== 0 ? <Marker coordinate={location} /> : <Marker coordinate={{ latitude: currentLocation.latitude, longitude: currentLocation.longitude }} />}
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