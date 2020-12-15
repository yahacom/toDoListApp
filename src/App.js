import React, {useState, useEffect} from 'react';
import {SafeAreaView, StatusBar, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {nanoid} from 'nanoid';
import Header from './components/Header';
import ToDoItem from './components/ToDoItem';

const App = () => {
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const store = await AsyncStorage.getItem('todoTaskList');
      const storedData = store !== null ? JSON.parse(store) : [];
      setData(storedData);
    } catch (e) {}
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    try {
      AsyncStorage.setItem('todoTaskList', JSON.stringify(data));
    } catch (e) {}
  }, [data]);
  const addNewTask = (text) => {
    setData([
      ...data,
      {
        id: nanoid(),
        text,
        status: false,
      },
    ]);
  };
  const toggleTaskStatus = (id) => {
    const arr = [...data];
    const index = data.findIndex((item) => item.id === id);
    arr[index] = {...arr[index], status: !arr[index].status};
    setData(arr);
  };
  const removeTask = (id) => {
    setData([...data.filter((item) => item.id !== id)]);
  };
  const renderItem = ({item}) => (
    <ToDoItem
      item={item}
      toggleTaskStatus={() => toggleTaskStatus(item.id)}
      removeTask={() => removeTask(item.id)}
    />
  );
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        <Header addNewTask={addNewTask} />
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </SafeAreaView>
    </>
  );
};

export default App;
