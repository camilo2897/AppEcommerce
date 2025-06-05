import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import ModalEditProfile from '../components/ModalEditProfile';
import { updateEmail, updatePassword, updateProfile } from 'firebase/auth';
import { showMessage } from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';
import ModalImagePicker from '../components/ModalImagePicker';
import * as ImagePicker from 'expo-image-picker';
import color from '../constants/color';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dvt9eesc4/image/upload';
const UPLOAD_PRESET = 'IMAGE_ECOMMERCE';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const { user, setUser } = useAuth();
  const [imageUri, setImageUri] = useState(null);
  const defaultImage = require('../assets/Profile.jpg');
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [fieldValue, setFieldValue] = useState('');
  const [isImageModalVisible, setImageModalVisible] = useState(false);

  useEffect(() => {
    if (user?.photoURL) {
      setImageUri(user.photoURL);
    } else {
      setImageUri(defaultImage);
    }
  }, [user]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleChooseImage = async () => {
  try {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      showMessage({
        message: 'Permiso denegado',
        description: 'Se necesita permiso para acceder a la galería.',
        type: 'danger',
      });
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType?.Images || 'Images', // <-- Aquí la corrección clave
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (result.canceled) {
      showMessage({
        message: 'Cancelado',
        description: 'No se seleccionó ninguna imagen.',
        type: 'info',
      });
      return;
    }

    setFieldValue(`data:image/jpeg;base64,${result.assets[0].base64}`);
    setModalTitle('Foto de perfil');
    setModalVisible(true);
  } catch (error) {
    console.error('Error seleccionando la imagen:', error);
    showMessage({
      message: 'Error',
      description: 'Ocurrió un error al seleccionar la imagen',
      type: 'danger',
    });
  }
};

  const uploadImage = async () => {
    if (!user || !fieldValue) return;
    
    try {
      const filedata = fieldValue.split(',')[1];
      const formData = new FormData();
      formData.append('file', filedata);
      formData.append('upload_preset', UPLOAD_PRESET);

      const response = await fetch(CLOUDINARY_URL, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.secure_url) {
        await updateProfile(user, { photoURL: data.secure_url });
        setUser({ ...user, photoURL: data.secure_url });
        setImageUri(data.secure_url);
        showMessage({
          message: 'Éxito',
          description: 'Foto de perfil actualizada correctamente.',
          type: 'success',
        });
      } else {
        throw new Error(data.error?.message || 'Error en la subida');
      }
    } catch (error) {
      console.error('Error subiendo imagen:', error);
      showMessage({
        message: 'Error',
        description: error.message,
        type: 'danger',
      });
    }
  };

  const handleEditProfile = (field) => {
    setModalTitle(field);
    setFieldValue(
      field === 'Nombre' ? user?.displayName || '' :
      field === 'Correo' ? user?.email || '' :
      ''
    );
    setModalVisible(true);
  };

  const handleSave = async () => {
    try {
      if (modalTitle === 'Nombre') {
        await updateProfile(user, { displayName: fieldValue });
        setUser({ ...user, displayName: fieldValue });
        showMessage({ message: 'Nombre actualizado correctamente.', type: 'success' });
      } else if (modalTitle === 'Correo') {
        await updateEmail(user, fieldValue);
        setUser({ ...user, email: fieldValue });
        showMessage({ message: 'Correo actualizado correctamente.', type: 'success' });
      } else if (modalTitle === 'Contraseña') {
        await updatePassword(user, fieldValue);
        showMessage({ message: 'Contraseña actualizada correctamente.', type: 'success' });
      } else if (modalTitle === 'Foto de perfil') {
        await uploadImage();
      }
    } catch (error) {
      console.error('Error actualizando datos:', error);
      if (error.code === 'auth/requires-recent-login') {
        showMessage({
          message: 'Reautenticación requerida',
          description: 'Por seguridad, vuelve a iniciar sesión para actualizar esta información.',
          type: 'warning',
        });
        
      } else {
        showMessage({
          message: 'Error',
          description: error.message,
          type: 'danger',
        });
      }
    } finally {
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGoBack}>
        <Text style={styles.backButtonText}>Volver</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>Ajustes</Text>
      <Text style={styles.sectionTitle}>Sobre tu cuenta</Text>

      <TouchableOpacity onPress={handleChooseImage}>
        <Image
          source={typeof imageUri === 'string' ? { uri: imageUri } : defaultImage}
          style={styles.profileImage}
        />
      </TouchableOpacity>

      <View style={styles.section}>
        <Text style={styles.label}>Nombre:</Text>
        <Text>{user?.displayName || 'Sin nombre'}</Text>
        <TouchableOpacity onPress={() => handleEditProfile('Nombre')}>
          <Text>Editar Nombre</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Correo:</Text>
        <Text>{user?.email || 'Sin correo'}</Text>
        <TouchableOpacity onPress={() => handleEditProfile('Correo')}>
          <Text>Editar Correo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Contraseña:</Text>
        <Text>******</Text>
        <TouchableOpacity onPress={() => handleEditProfile('Contraseña')}>
          <Text>Editar Contraseña</Text>
        </TouchableOpacity>
      </View>

      <ModalEditProfile
        visible={isModalVisible}
        title={modalTitle}
        value={fieldValue}
        onChangeText={setFieldValue}
        onSave={handleSave}
        onCancel={() => setModalVisible(false)}
        isImage={modalTitle === 'Foto de perfil'}
      />

      <ModalImagePicker
        visible={isImageModalVisible}
        imageUri={imageUri}
        onChooseImage={handleChooseImage}
        onSave={uploadImage}
        onCancel={() => setImageModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backButtonText: {
    fontSize: 16,
    color: 'blue',
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    marginTop: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
  },
  section: {
    marginTop: 20,
  },
  label: {
    fontWeight: 'bold',
  },
});



export default SettingsScreen;


