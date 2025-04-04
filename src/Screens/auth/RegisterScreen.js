import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../services/firebaseConfig";
import color from "../../constants/color";

const RegisterScreen = ({ navigation }) => {
  const [Name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [errorMensaje, setErrorMensaje] = useState('');

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        return updateProfile(user, { displayName: Name });
      })
      .then(() => {
        console.log("Usuario registrado con nombre:", Name);
        navigation.navigate("LoginScreen");
      })
      .catch((error) => {
        setError(true);
        setErrorMensaje(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../../assets/ImagenLogin.png")} style={styles.logo} />
      <Text style={styles.title}>Crea una Cuenta</Text>

      <View style={styles.inputContainer}>
        <Icon name="account-outline" size={24} style={styles.icon} />
        <TextInput placeholder="Nombre" value={Name} onChangeText={setName} style={styles.input} />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="email-outline" size={24} style={styles.icon} />
        <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock-outline" size={24} style={styles.icon} />
        <TextInput placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      </View>

      {error && <Text style={styles.errorMessage}>{errorMensaje}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Crear cuenta</Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>¿Ya tienes una cuenta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <Text style={styles.loginLink}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.variante1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 30,
  },
  title: {
    fontSize: 18,
    color: color.principal,
    fontWeight: "600",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: color.variante2,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: color.gradienteSecundario,
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
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginContainer: {
    flexDirection: "row",
  },
  loginText: {
    color: color.variante3,
    fontSize: 14,
  },
  loginLink: {
    marginLeft: 5,
    color: color.variante3,
    fontWeight: "bold",
  },
  errorMessage: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
});

export default RegisterScreen;
