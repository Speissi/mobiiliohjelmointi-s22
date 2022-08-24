import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Modal, Pressable } from 'react-native';

export default function App() {
  const [guess, setGuess] = useState('');
  const [guesses, setGuesses] = useState(1);
  const [text, setText] = useState('Guess a number between 1 and 100');
  const [secretNumber, setSecret] = useState(Math.floor(Math.random() * 100) + 1);
  const [modalVisible, setModalVisible] = useState(false);

  const makeGuess = () => {
    if (guess == secretNumber) {
      if (guesses == 1) {
        setText('You got it on your first try!');
      } else {
        setText('You guessed the number in ' + guesses + ' guesses');
      }
      setModalVisible(true);
    } else if (guess > secretNumber) {
      setText(`Your guess ${guess} is too high`);
      setGuesses(guesses + 1);
    } else if (guess < secretNumber) {
      setText(`Your guess ${guess} is too low`);
      setGuesses(guesses + 1);
    } else {
      setText('You did something weird');
    }

  }

  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <TextInput style={styles.input} onChangeText={setGuess} value={guess} keyboardType="numeric" />
      <Button onPress={makeGuess} title="Make Guess" />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.container}>
          <Text>{text}</Text>
          <Button title="Close" onPress={() => {
            setModalVisible(!modalVisible);
          }
          } />
        </View>
      </Modal >
      <StatusBar style="auto" />
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
  input: {
    width: 40,
    borderColor: 'gray',
    borderWidth: 1
  },
});
