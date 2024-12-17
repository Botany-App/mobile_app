// app/(tabs)/camera/index.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import ImagePickerComponent from "../../../../src/components/ImagePickerComponent";
import { createDiagnosis } from "../../../../src/api/mockDB";
import { useRouter } from "expo-router";

const DiagnoseScreen = () => {
  const router = useRouter();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!imageUri) {
      Alert.alert(
        "Erro",
        "Por favor, capture ou selecione uma imagem primeiro."
      );
      return;
    }

    setLoading(true);

    try {
      // Simulação de análise de imagem
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulando resultado
      const simulatedDisease = "Mildiú Polvorento";
      const simulatedLocation = "Folha Inferior";

      // Salvar diagnóstico no mockDB
      createDiagnosis({
        plantImage: imageUri,
        disease: simulatedDisease,
        location: simulatedLocation,
      });

      Alert.alert(
        "Diagnóstico Completo",
        `Doença Identificada: ${simulatedDisease}\nLocalização: ${simulatedLocation}`
      );

      // Navegar para a tela de relatório do diagnóstico com parâmetros
      router.push({
        pathname: "./(tabs)/camera/report",
        params: {
          imageUri: imageUri as string,
          disease: simulatedDisease,
          location: simulatedLocation,
        },
      });
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Houve um problema ao analisar a imagem.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Diagnóstico de Doenças em Plantas</Text>
      <ImagePickerComponent imageUri={imageUri} setImageUri={setImageUri} />
      {loading ? (
        <ActivityIndicator size="large" color="#4caf50" />
      ) : (
        <Button title="Analisar Imagem" onPress={handleAnalyze} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
});

export default DiagnoseScreen;
