// app/(tabs)/camera/report.tsx

import React from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

const DiagnosisReportScreen = () => {
  const router = useRouter();
  const { imageUri, disease, location } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relatório de Diagnóstico</Text>
      {imageUri && (
        <Image source={{ uri: imageUri as string }} style={styles.image} />
      )}
      <View style={styles.overlay}>
        <Text style={styles.diseaseText}>{disease}</Text>
        <Text style={styles.locationText}>{location}</Text>
      </View>
      <Text style={styles.details}>Doença Identificada: {disease}</Text>
      <Text style={styles.details}>Localização na Planta: {location}</Text>
      <Button
        title="Realizar Novo Diagnóstico"
        onPress={() => router.push("/(tabs)/camera")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  image: { width: 300, height: 300, borderRadius: 10 },
  overlay: {
    position: "absolute",
    top: 100,
    left: 100,
    backgroundColor: "rgba(76, 175, 80, 0.7)",
    padding: 5,
    borderRadius: 5,
  },
  diseaseText: { color: "#fff", fontWeight: "bold" },
  locationText: { color: "#fff" },
  details: { fontSize: 16, marginTop: 20 },
});

export default DiagnosisReportScreen;
