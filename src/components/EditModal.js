import React from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from "react-native-web";
import color from "../constants/color";
import { StyleSheet } from "react-native";

const EditModal = ({visible, title, value, onchangeText, onSave, onCancel})=>{
    return(
        <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onCancel}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>{title}</Text>
                    <TextInput style={styles.modalInput} placeholder={`Nuevo ${title.toLowerCase()}`}
                    value={value} onChangeText={onchangeText}/>

                    <View style={styles.modalButtons}>
                    </View>
                     <TouchableOpacity style={styles.modalButton} onPress={onCancel}>
                        <Text style={styles.modalButtonText}>Cancelar</Text>
                     </TouchableOpacity>
                     <TouchableOpacity style={styles.saveButton} onPress={onSave}>
                        <Text style={styles.modalButtonText}>Guardar</Text>
                     </TouchableOpacity>
                    </View>
            </View>
        </Modal>
    )
}

 const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        width: '75%',
        backgroundColor: color.variante2,
        padding: 22,
        alignItems: 'center',
    }, 
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color:color.variante3,
    }
 })

 export default EditModal

