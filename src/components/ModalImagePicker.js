import React from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet, Image } from "react-native";
import color from "../constants/color";

const ModalImagePicker = ({ visible, imageUri, onChooseImage, onSave, onCancel }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onCancel}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Cambiar Foto de Perfil</Text>
          <Image source={{ uri: imageUri }} style={styles.imagePreview} />
          
          <TouchableOpacity style={styles.imageButton} onPress={onChooseImage}>
            <Text style={styles.imageButtonText}>Seleccionar Imagen</Text>
          </TouchableOpacity>

          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.modalButton} onPress={onCancel}>
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.modalButton, styles.saveButton]} onPress={onSave}>
              <Text style={styles.modalButtonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  imagePreview: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  imageButton: {
    backgroundColor: color.primary,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  imageButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalButtons: {
    flexDirection: 'row',
    marginTop: 10,
  },
  modalButton: {
    backgroundColor: color.secondary,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 8,
  },
  saveButton: {
    backgroundColor: color.primary,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ModalImagePicker;
