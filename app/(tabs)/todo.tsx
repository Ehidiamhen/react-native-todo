import { Image, StyleSheet, Platform, TextInput, Button, Alert, View, Pressable, Text, Modal, SafeAreaView } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import EditModal from '@/components/EditModal';

export default function HomeScreen() {
    const [todoInput, setTodoInput] = useState('')
    const [todoItems, setTodoItems] = useState<any[]>([])
    const [modalVisible, setModalVisible] = useState(false)
    const [edit, setEdit] = useState(false)
    const [itemEdit, setItemEdit] = useState('')

    const [editingIndex, setEditingIndex] = useState<number | null>(null)
    const [currentEditValue, setCurrentEditValue] = useState('')



    const handleAddTodo = () => {
        if(todoInput.trim() === '') {
            Alert.alert('Error', 'Please enter a todo item');
        } else {
            // Alert.alert('Success', 'Todo added');
            setTodoItems([todoInput, ...todoItems])
            setTodoInput('')
        }
    }

    const handleEdit = (index: number) => {
        // Alert.alert(`Edit`,)
        // setModalVisible(true)
        // setEdit(true)
        // setItemEdit()
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
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Todo</ThemedText>
        <View>
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

        
        {/* <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12'
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText> */}
      </ThemedView>
      {/* <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView> */}
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
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
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
    flexDirection: 'row', // Align children horizontally
    flexWrap: 'wrap',
    alignItems: 'center', // Align items vertically in the center
    justifyContent: 'space-between', // Space out children
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 10,
    // borderBottomWidth: 1, // Optional: Add a bottom border for separation
    // borderColor: '#ccc',
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
});
