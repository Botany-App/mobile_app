import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { getCurrentUserData } from "../api/mockDB";

const Header = () => {
  const user = getCurrentUserData();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Olá, {user ? user.name : "Convidado"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#4caf50",
  },
  text: {
    color: "#fff",
    fontSize: 18,
  },
});

export default Header;
