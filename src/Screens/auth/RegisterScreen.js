import React ,{useState}from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../../services/firebaseConfig';

const RegisterScreen = ({navigation}) =>{
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [error, setError] = useState('');
      const [errorMensaje, setErrorMensaje] = useState('');

     const handleRegister = () => {
        createUserWithEmailAndPassword (auth, email, password).then((userCredential)=>{
            const user= userCredential.user
            updateProfile(user,{
                displayName: Name
            }).then(()=>{
                console.log("Usuario registrado con nombre",user.displayName);
                navigation.navigate('login',{screen:"LoginScreen"})
            }).catch((error) => {
                setError(true);
                setErrorMensaje(error.message);
            })
            .catch((error) => {
                setError(true);
                setErrorMensaje(error.message);

            })

     return(
     <View style={styles.container}>
           <Image source={require('../../../assets/ImagenLogin.png')} style={styles.logo} />
           <Text style={styles.title}>Crea una Cuenta</Text>
           
           <Icon name="account-outline" size={24} style={styles.icon} />
     
           <View style={styles.container}>
            <Icon name="account-outline" size={24} style={styles.icon} />
             <TextInput
             placeholder="nombre"
             value={Name}
             onChangeText={setName}/>
           </View>

           <View style={styles.container}>
           <Icon name="email-outline" size={24} style={styles.icon} />
            <TextInput
             placeholder="email"
             value={email}
             onChangeText={setEmail}/>
           </View>

           <View style={styles.container}>
           <Icon name="email-outline" size={24} style={styles.icon} />
            <TextInput
             placeholder="email"
             value={email}
             onChangeText={setEmail}/>
           </View>

           <View style={styles.container}>
           <Icon name="lock-outline" size={24} style={styles.icon} />
            <TextInput
             placeholder="contraseña"
             value={password}
             onChangeText={setPassword}/>
           </View>
            <TouchableOpacity style={styles.buttonText} onPress={handleRegister}>
                <Text style={styles.registerButtonText}>Crear cuenta</Text>
            </TouchableOpacity>

            <View styles={styles.loginContainer}>
                <Text style={styles.loginText}>¿Ya tienes una cuenta?</Text>
                <TouchableOpacity onPress={()=> navigation.navigate('login')}>
                <Text style={styles.loginText}>Iniciar Sesión</Text>

                </TouchableOpacity>
            </View>
           
     
         
         </View>
    )
}

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
    color: 'fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 15,
  },
});

export default RegisterScreen