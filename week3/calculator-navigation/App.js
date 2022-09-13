import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function CalculatorScreen({ navigation }) {
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);

  function reset() {
    setNumber1('');
    setNumber2('');
  }

  function calculate(operation) {
    var temp = 0;
    if (operation == '+') {
      temp = parseInt(number1) + parseInt(number2);
    } else if (operation == '-') {
      temp = parseInt(number1) - parseInt(number2);
    }
    setResult(temp);
    reset();
    return temp
  }

  const minus = () => {
    setHistory([...history, { key: number1 + ' - ' + number2 + ' = ' + calculate('-') }]);
  }

  const plus = () => {
    setHistory([...history, { key: number1 + ' + ' + number2 + ' = ' + calculate('+') }]);
  }

  return (
    <View style={styles.container}>
      <Text>Result: {result} </Text>
      <TextInput style={styles.input} onChangeText={setNumber1} value={number1} keyboardType="numeric" />
      <TextInput style={styles.input} onChangeText={setNumber2} value={number2} keyboardType="numeric" />
      <View style={styles.buttonContainer}>
        <Button onPress={plus} title="+" />
        <Button onPress={minus} title="-" />
        <Button onPress={() => navigation.navigate('History', { history: history })} title="History" />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

function HistoryScreen({ route, navigation }) {
  const { history } = route.params;

  return (
    <View style={styles.container}>
      <Text>History</Text>
      <FlatList data={history} renderItem={({ item }) => <Text>{item.key}</Text>} />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Calculator" component={CalculatorScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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
    borderWidth: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
