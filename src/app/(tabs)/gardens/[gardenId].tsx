// app/(tabs)/gardens/[gardenId].tsx

import React from "react";
import { View, Text, Button, FlatList, StyleSheet, Alert } from "react-native";
import {
  getGardenById,
  deleteGarden,
  getAllPlants,
} from "../../../../src/api/mockDB"; // Ajuste o caminho relativo conforme necessário
import { Garden, Plant } from "../../../../src/api/types";
import { useRouter, useLocalSearchParams } from "expo-router"; // Substituído useSearchParams por useLocalSearchParams

const GardenDetails = () => {
  const router = useRouter();
  const { gardenId } = useLocalSearchParams(); // Substituído useSearchParams por useLocalSearchParams
  const garden = getGardenById(gardenId as string);

  if (!garden) {
    return (
      <View style={styles.container}>
        <Text>Horta não encontrada.</Text>
      </View>
    );
  }

  const associatedPlants: Plant[] = getAllPlants().filter((p) =>
    garden.plantsId.includes(p.id)
  );

  const handleDelete = () => {
    Alert.alert(
      "Confirmar Deleção",
      "Tem certeza que deseja deletar esta horta?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Deletar",
          style: "destructive",
          onPress: () => {
            const success = deleteGarden(garden.id);
            if (success) {
              Alert.alert("Sucesso", "Horta deletada com sucesso!");
              router.back();
            } else {
              Alert.alert("Erro", "Erro ao deletar a horta.");
            }
          },
        },
      ]
    );
  };

  const handleEdit = () => {
    // Navegação com caminho absoluto
    router.push(`./gardens/edit/${garden.id}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.gardenName}>{garden.gardenName}</Text>{" "}
      {/* Corrigido de garden.garden_name */}
      <Text>{garden.gardenDescription}</Text>{" "}
      {/* Corrigido de garden.garden_description */}
      <Text style={styles.sectionTitle}>Plantas na Horta:</Text>
      {associatedPlants.length === 0 ? (
        <Text>Nenhuma planta associada a esta horta.</Text>
      ) : (
        <FlatList
          data={associatedPlants}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.plantItem}>
              <Text style={styles.plantName}>{item.plantName}</Text>{" "}
              {/* Corrigido de item.plant_name */}
              <Text>{item.plantDescription}</Text>{" "}
              {/* Corrigido de item.plant_description */}
            </View>
          )}
        />
      )}
      <View style={styles.buttonContainer}>
        <Button title="Editar Horta" onPress={handleEdit} />
        <Button title="Deletar Horta" onPress={handleDelete} color="red" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  gardenName: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  plantItem: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#b2dfdb",
  },
  plantName: { fontSize: 16, fontWeight: "bold" },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});

export default GardenDetails;
