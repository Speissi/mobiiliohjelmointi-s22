import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, FlatList, StatusBar, } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { API_KEY } from '@env';

export default function App() {
  var myHeaders = new Headers();
  myHeaders.append("apikey", API_KEY);

  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };

  const [symbols, setSymbols] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState();
  const [amount, setAmount] = useState(0);
  const [result, setResult] = useState(0);

  const getSymbols = () => {
    fetch(`https://api.apilayer.com/exchangerates_data/symbols`, requestOptions)
      .then(response => response.json())
      .then(responseJson => setSymbols(responseJson.symbols))
      .catch(error => {
        Alert.alert('Error', error);
      });
  }

  useEffect(() => {
    getSymbols();
  }, []);

  const pickerItems = Object.keys(symbols).map((key) => {
    return <Picker.Item key={key} label={key} value={key} />
  });

  const calculate = () => {
    fetch(`https://api.apilayer.com/exchangerates_data/convert?to=EUR&from=${selectedSymbol}&amount=${amount}`, requestOptions)
      .then(response => response.json())
      .then(responseJson => {
        setResult(responseJson.result);
      })
      .catch(error => {
        Alert.alert('Error', error);
      });
  }


  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>Currency Converter</Text>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>Result: {result}</Text>
      <View style={{ flexDirection: "row" }}>
        <TextInput style={{ fontSize: 18, padding: 10 }} placeholder='Amount'
          onChangeText={text => setAmount(text)} keyboardType="numeric" />
        <Picker
          style={{ height: 50, width: 200, padding: 30 }}
          selectedValue={selectedSymbol}
          onValueChange={(itemValue) =>
            setSelectedSymbol(itemValue)
          }>
          {pickerItems}
        </Picker>
      </View>
      <Button onPress={calculate} title="Convert" />
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});