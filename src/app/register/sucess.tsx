import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";

export default function SuccessScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/login"); // Redireciona para a tela de login após 3 segundos
    }, 2000);

    return () => clearTimeout(timer); // Limpa o timer se o componente for desmontado
  }, [router]);

  return (
    <View style={styles.container}>
      {/* Animação de Sucesso */}
      <LottieView
        source={require("../../../assets/sucess.json")} // Caminho do arquivo JSON
        autoPlay
        loop={false} // Executa a animação apenas uma vez
        style={styles.animation}
      />
      <Text style={styles.text}>Cadastro confirmado com sucesso!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  animation: {
    width: 200,
    height: 200,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
});
