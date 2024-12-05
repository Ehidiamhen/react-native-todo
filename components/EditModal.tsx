import { useState } from "react";
import { StyleSheet, View , Pressable, Alert, TextInput, Text} from "react-native";
import { Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { SafeAreaProvider } from "react-native-safe-area-context";

interface ModalProps {
    item: string
}

export default function EditModal ({ item }: ModalProps) {
    const [modalVisible, setModalVisible] = useState(false)

    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Edit Your Todo</Text>
                <TextInput
                  style={styles.input}
                  placeholder="What do you have planned?"
                  placeholderTextColor="gray"
                  value={item}
                //   onChangeText={setTodoInput}
                />
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Save</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          {/* <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable> */}
        </SafeAreaView>
      </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    modalView: {
      margin: 20,
      backgroundColor: 'black',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
      marginTop: 10,
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
      color: 'white',
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    input: {
      height: 40,
      borderWidth: 1,
      borderColor: 'white',
      color: 'white',
      padding: 10,
    },
})