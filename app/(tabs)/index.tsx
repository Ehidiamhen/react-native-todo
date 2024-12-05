import { StyleSheet, TextInput, Button, Alert, View, Pressable, Text, } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IconSymbol } from '@/components/ui/IconSymbol';


export default function HomeScreen() {
    const [todoInput, setTodoInput] = useState('');
    const [todoItems, setTodoItems] = useState<Array<string>>([]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [currentEditValue, setCurrentEditValue] = useState('');

    useEffect(() => {
        const getTodos = async () => {
            try {
                const value = await AsyncStorage.getItem('Todos');
                return value != null ? setTodoItems(JSON.parse(value)) : null;
            } catch (e) {
                console.error('Failed to retrieve data:', e);
            }
        }
        getTodos();
    }, [])

    useEffect(() => {
        const storeTodos = async () => {
            try {
                await AsyncStorage.setItem('Todos', JSON.stringify(todoItems));
            } catch (e) {
                console.error('Failed to save data:', e);
            }
        };
        storeTodos();
    }, [todoItems])

    const handleAddTodo = async () => {
        if(todoInput.trim() === '') {
            Alert.alert('Error', 'Please enter a todo item');
        } else {
            setTodoItems([todoInput, ...todoItems])
            setTodoInput('')
        }
    }

    const handleEdit = (index: number) => {
        setEditingIndex(index);
        setCurrentEditValue(todoItems[index]);
    }

    const handleSaveEdit = () => {
        if(editingIndex !== null && currentEditValue !== '') {
            const editedTodos = todoItems.map((item, index) =>
                index === editingIndex ? currentEditValue : item
            );
            setTodoItems(editedTodos);
            setEditingIndex(null);
            setCurrentEditValue('');
        }
        if(currentEditValue === '') {
            Alert.alert('Error', 'Please type a todo item');
        } 
    }

    const handleDelete = (index: number) => {
        const updatedTodos = todoItems.filter((_, i) => i !== index)
        setTodoItems(updatedTodos)
    }

  return (
    <ParallaxScrollView
    headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Todo List</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <View style={{gap: 10}}>
        <TextInput 
          style={styles.input} 
          placeholder='What do you have planned?'
          placeholderTextColor="gray"
          value={todoInput}
          onChangeText={setTodoInput}
        />
        <Button title="Add task" onPress={handleAddTodo} />
        </View>

        <View style={styles.todos}>
            {todoItems.length >= 1 && <ThemedText type="subtitle">Todos</ThemedText>}
            {todoItems.map((item, index) =>
            <ThemedView key={index} style={styles.container}>
              <>
              {editingIndex === index ? 
                <TextInput
                  style={styles.input}
                  value={currentEditValue}
                  onChangeText={setCurrentEditValue}
                /> 
                : 
                <ThemedText type='defaultSemiBold' >{item}</ThemedText> }
              <ThemedView style={styles.options}>
                {editingIndex === index ? 
                  <>
                   <Pressable onPress={() => setEditingIndex(null)}>
                    <Text>CANCEL</Text>
                   </Pressable>
                   <Pressable onPress={() => handleSaveEdit()}>
                    <Text>SAVE</Text>
                   </Pressable>
                  </>
                  :
                  <>
                   <Pressable onPress={() => handleEdit(index)}>
                    <Text>EDIT</Text>
                   </Pressable>
                   <Pressable onPress={() => handleDelete(index)}>
                    <Text>DELETE</Text>
                   </Pressable>
                  </>
                }
              </ThemedView></>
            </ThemedView>
            )}
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'white',
    color: 'white',
    padding: 10,
  },
  container: {
    flexDirection: 'row', 
    flexWrap: 'wrap',
    alignItems: 'center', 
    justifyContent: 'space-between', 
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 10,
  },
  options: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    color: 'black',
    backgroundColor: 'transparent',
  },
  todos: {
    gap: 20,
    marginTop: 20,
  },
  button: {
    marginTop: 10,
  }
});
