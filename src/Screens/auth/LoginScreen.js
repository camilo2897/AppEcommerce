import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import color from '../../constants/color';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../services/firebaseConfig';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [errorMensaje, setErrorMensaje] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
      console.log('usuario logueado:',userCredential.user);
      setError(false);        
      setErrorMensaje('');
      navigation.replace('MainTabs');
    })
    .catch((error)=>{
      setError(true)
      setErrorMessages('Error al iniciar sesión:',error.errorMessage)
    })
    
  
    if (!email.trim() || !password) {
      setError(true);
      setErrorMensaje("Debes ingresar un usuario y contraseña.");
      return;
    }

    setLoading(true); 
  
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Usuario autenticado:", user.email);
        navigation.replace('MainTabs');
      })
      .catch((error) => {
        setError(true);
        if (error.code === 'auth/user-not-found') {
          setErrorMensaje('El usuario no está registrado.');
        } else if (error.code === 'auth/wrong-password') {
          setErrorMensaje('Contraseña incorrecta.');
        } else {
          setErrorMensaje('Usuario o clave incorrectos.');
        }
      })
        .finally(() => setLoading(false));
      
  };
  

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/ImagenLogin.png')} style={styles.logo} />
      <Text style={styles.title}>Deseas comprar o vender algún producto tecnológico</Text>
      <Text style={styles.title}>Iniciar sesión</Text>
      
      <Icon name="email-outline" size={24} style={styles.icon} />
      {error && <Text style={styles.errorMessage}>{errorMensaje}</Text>}

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
      {error && (
        <Text style={styles.errorMessage}>
          {/* {errorMessage} */}
          Revisa tus credenciales e intenta de nuevo 😲

        </Text>
      )
      }

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
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 50,
    justifyContent: 'center',
  },
});

export default LoginScreen;
