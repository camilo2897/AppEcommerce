import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, TextInput } from 'react-native';
import color from '../constants/color';

function ModalEditProfile({ visible, title, value, onChangeText, onSave, onCancel }) {
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onCancel}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>{title}</Text>
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            placeholder={`Nuevo ${title}`}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onSave} style={styles.button}>
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onCancel} style={[styles.button, styles.cancelButton]}>
              <Text style={[styles.buttonText, styles.cancelButtonText]}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  modalContent: {
    fontSize: 16,
    color: 'blue',
  },
  input: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  Title: {
    fontSize: 20,
    marginTop: 20,
  },
  buttonContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
  },
  button: {
    marginTop: 20,
  },
  buttonText: {
    fontWeight: 'bold',
  },
  cancelButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
  },
  cancelButtonText: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
  },
});


export default ModalEditProfile;