import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';


export default function App() {
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [result, setResult] = useState('');

  const minus = () => {
    setResult(parseInt(number1) - parseInt(number2));
  }

  const plus = () => {
    setResult(parseInt(number1) + parseInt(number2));
  }

  return (
    <View style={styles.container}>
      <Text>Result: {result} </Text>
      <TextInput style={styles.input} onChangeText={setNumber1} value={number1} keyboardType="numeric" />
      <TextInput style={styles.input} onChangeText={setNumber2} value={number2} keyboardType="numeric" />
      <View style={styles.buttonContainer}>
        <Button onPress={plus} title="+" />
        <Button onPress={minus} title="-" />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 200,
    borderColor: 'gray',
    borderWidth: 1
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
});
