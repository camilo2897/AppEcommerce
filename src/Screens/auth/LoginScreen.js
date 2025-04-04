import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import color from '../../constants/color';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [errorMensaje, setErrorMensaje] = useState('');

  const handleLogin = () => {
    navigation.replace('MainTabs');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/ImagenLogin.png')} style={styles.logo} />
      <Text style={styles.title}>Deseas comprar o vender algún producto tecnológico</Text>
      <Text style={styles.title}>Iniciar sesión</Text>
      
      <Icon name="email-outline" size={24} style={styles.icon} />

      <TextInput
        style={styles.inputWrapper}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.inputWrapper}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      <Text style={styles.title}>¿Aún no tienes una cuenta?</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text>Regístrate aquí</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.variante1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  title: {
    fontSize: 18,
    color: color.principal,
    fontWeight: '600',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: color.gradienteAccion,
  },
  icon: {
    marginRight: 10,
  },
  button: {
    backgroundColor: color.principal,
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginBottom: 30,
  },
  buttonText: {
    color: color.variante2,
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 15,
    backgroundColor: color.variante2,
  },
});

export default LoginScreen;
