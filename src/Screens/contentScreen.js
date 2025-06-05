import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const ContentScreen = () => {
  const [showComprar, setShowComprar] = useState(false);
  const [showVender, setShowVender] = useState(false);

  return (
    <View style={styles.container}>
      
      
      <TouchableOpacity onPress={() => setShowComprar(!showComprar)}>
        <Text style={styles.menuTitle}>Comprar ▾</Text>
      </TouchableOpacity>

      
      {showComprar && (
        <View style={styles.subMenu}>
          <Text style={styles.subMenuItem}>Celulares</Text>
          <Text style={styles.subMenuItem}>Consolas</Text>
          <Text style={styles.subMenuItem}>Computadores</Text>
          <Text style={styles.subMenuItem}>Portátiles</Text>
        </View>
      )}

      
      <TouchableOpacity onPress={() => setShowVender(!showVender)}>
        <Text style={styles.menuTitle}>Vender ▾</Text>
      </TouchableOpacity>

      
      {showVender && (
        <View style={styles.subMenu}>
          <Text style={styles.subMenuItem}>Publicar Producto</Text>
          <Text style={styles.subMenuItem}>Mis Ventas</Text>
        </View>
      )}

      
      <Image
        source={require("../assets/bannermovil.jpg")}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#9ad8de",
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    color: "#333",
  },
  subMenu: {
    marginLeft: 15,
    marginTop: 10,
  },
  subMenuItem: {
    fontSize: 16,
    paddingVertical: 5,
    color: "#555",
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    marginTop: 30,
    borderRadius: 10,
  },
});

export default ContentScreen;
