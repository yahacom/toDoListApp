import React from 'react';
import CheckBox from '@react-native-community/checkbox';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';

const ToDoItem = ({item, toggleTaskStatus, removeTask}) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <CheckBox value={item.status} onValueChange={toggleTaskStatus} />
        <Text style={[styles.title, item.status ? styles.done : {}]}>
          {item.text}
        </Text>
      </View>
      <TouchableOpacity onPress={removeTask}>
        <Text>❌</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ToDoItem;
