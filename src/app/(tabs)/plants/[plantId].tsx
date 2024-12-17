// app/(tabs)/plants/[plantId].tsx

import React from "react";
import { View, Text, Button, FlatList, StyleSheet, Alert } from "react-native";
import {
  getPlantById,
  deletePlant,
  getAllCategoryTasks,
} from "../../../../src/api/mockDB";
import { Plant, CategoryTask } from "../../../../src/api/types";
import { useRouter, useLocalSearchParams } from "expo-router";

const PlantDetails = () => {
  const router = useRouter();
  const { plantId } = useLocalSearchParams();
  const plant = getPlantById(plantId as string);

  if (!plant) {
    return (
      <View style={styles.container}>
        <Text>Planta não encontrada.</Text>
      </View>
    );
  }

  const associatedCategories: CategoryTask[] = getAllCategoryTasks().filter(
    (cat) => plant.categoriesPlant.includes(cat.id)
  );

  const handleDelete = () => {
    Alert.alert(
      "Confirmar Deleção",
      "Tem certeza que deseja deletar esta planta?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Deletar",
          style: "destructive",
          onPress: () => {
            const success = deletePlant(plant.id);
            if (success) {
              Alert.alert("Sucesso", "Planta deletada com sucesso!");
              router.back();
            } else {
              Alert.alert("Erro", "Erro ao deletar a planta.");
            }
          },
        },
      ]
    );
  };

  const handleUpdate = () => {
    // Implementar lógica de atualização, por exemplo, navegar para uma tela de edição
    Alert.alert(
      "Atualizar Planta (Mock)",
      "Funcionalidade de atualização ainda não implementada."
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.plantName}>{plant.plantName}</Text>
      <Text>{plant.plantDescription}</Text>
      <Text>{`Data de Plantio: ${plant.plantingDate.toDateString()}`}</Text>
      <Text>{`Data Estimada de Colheita: ${plant.estimatedHarvestDate.toDateString()}`}</Text>
      <Text>{`Status da Planta: ${plant.plantStatus}`}</Text>
      <Text>{`Altura Atual: ${plant.currentHeight} cm`}</Text>
      <Text>{`Largura Atual: ${plant.currentWidth} cm`}</Text>
      <Text>{`Nível de Irrigação: ${plant.irrigationWeek}`}</Text>
      <Text>{`Status de Saúde: ${plant.healthStatus}`}</Text>
      <Text>{`Última Irrigação: ${plant.lastIrrigation.toDateString()}`}</Text>
      <Text>{`Última Fertilização: ${plant.lastFertilization.toDateString()}`}</Text>
      <Text>{`Exposição ao Sol: ${plant.sunExposure} horas`}</Text>
      <Text>{`Semana de Fertilização: ${plant.fertilizationWeek}`}</Text>

      <Text style={styles.sectionTitle}>Categorias Associadas:</Text>
      {associatedCategories.length === 0 ? (
        <Text>Nenhuma categoria associada a esta planta.</Text>
      ) : (
        <FlatList
          data={associatedCategories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.categoryItem}>
              <Text style={styles.categoryName}>{item.name}</Text>
              <Text>{item.description}</Text>
            </View>
          )}
        />
      )}

      <View style={styles.buttonContainer}>
        <Button title="Atualizar Planta" onPress={handleUpdate} />
        <Button title="Deletar Planta" onPress={handleDelete} color="red" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  plantName: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  categoryItem: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#d1c4e9",
  },
  categoryName: { fontSize: 16, fontWeight: "bold" },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});

export default PlantDetails;
