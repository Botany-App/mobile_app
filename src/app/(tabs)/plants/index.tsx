// app/(tabs)/plants/index.tsx

import React, { useState, useEffect } from "react";
import { View, Text, Button, FlatList, StyleSheet, Alert } from "react-native";
import { getAllPlants, deletePlant } from "../../../api/mockDB";
import { Plant } from "../../../api/types";
import { useRouter } from "expo-router";

const PlantList = () => {
  const router = useRouter();
  const [plants, setPlants] = useState<Plant[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<Plant[]>([]);

  useEffect(() => {
    const allPlants = getAllPlants();
    setPlants(allPlants);
    setFilteredPlants(allPlants);
  }, []);

  const handleFilter = (filters: { name?: string; categoryId?: string }) => {
    let tempPlants = plants;

    if (filters.name) {
      tempPlants = tempPlants.filter(
        (p) => p.plantName.toLowerCase().includes(filters.name.toLowerCase()) // Corrigido de filters.Name para filters.name
      );
    }

    if (filters.categoryId) {
      tempPlants = tempPlants.filter(
        (p) => p.categoriesPlant.includes(filters.categoryId) // Corrigido de p.categoriesPlantategoriesId para p.categoriesId
      );
    }

    setFilteredPlants(tempPlants);
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      "Confirmar Deleção",
      "Tem certeza que deseja deletar esta planta?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Deletar",
          style: "destructive",
          onPress: () => {
            const success = deletePlant(id);
            if (success) {
              Alert.alert("Sucesso", "Planta deletada com sucesso!");
              const updatedPlants = plants.filter((p) => p.id !== id);
              setPlants(updatedPlants);
              setFilteredPlants(updatedPlants);
            } else {
              Alert.alert("Erro", "Erro ao deletar a planta.");
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todas as Plantas</Text>

      {/* Você pode adicionar um componente de filtro semelhante ao TaskFilter */}
      {/* <PlantFilter onFilter={handleFilter} /> */}

      <FlatList
        data={filteredPlants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.plantItem}>
            <Text style={styles.plantName}>{item.plantName}</Text>{" "}
            {/* Corrigido de plant_name para plantName */}
            <Text>{item.plantDescription}</Text>{" "}
            {/* Corrigido de plant_description para plantDescription */}
            <View style={styles.buttonContainer}>
              <Button
                title="Detalhes"
                onPress={() => router.push(`/plants/${item.id}`)}
              />
              <Button
                title="Deletar"
                onPress={() => handleDelete(item.id)}
                color="red"
              />
            </View>
          </View>
        )}
      />

      <View style={styles.navigationButtons}>
        <Button
          title="Criar Planta"
          onPress={() => router.push("/plants/create")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  plantItem: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#c8e6c9",
  },
  plantName: { fontSize: 18, fontWeight: "bold" },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
});

export default PlantList;
