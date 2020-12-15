import React, {useState} from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import styles from './styles';

const Header = ({addNewTask}) => {
  const [text, setText] = useState('');
  const add = () => {
    addNewTask(text);
    setText('');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>ToDo List</Text>
      <TextInput
        value={text}
        onChangeText={(t) => setText(t)}
        placeholder="New task"
        style={styles.input}
      />
      <Button title="Add" onPress={add} disabled={text === ''} />
    </View>
  );
};

export default Header;
