// app/(tabs)/gardens/index.tsx

import React, { useState, useEffect } from "react";
import { View, Text, Button, FlatList, StyleSheet, Alert } from "react-native";
import { getAllGardens, deleteGarden } from "../../../../src/api/mockDB"; // Ajuste o caminho relativo conforme necessário
import { Garden } from "../../../../src/api/types";
import { useRouter } from "expo-router";

const GardenList = () => {
  const router = useRouter();
  const [gardens, setGardens] = useState<Garden[]>([]);
  const [filteredGardens, setFilteredGardens] = useState<Garden[]>([]);

  useEffect(() => {
    const allGardens = getAllGardens();
    setGardens(allGardens);
    setFilteredGardens(allGardens);
  }, []);

  const handleFilter = (filters: { name?: string }) => {
    let tempGardens = gardens;

    if (filters.name) {
      const name = filters.name; // Variável intermediária
      tempGardens = tempGardens.filter((g) =>
        g.gardenName.toLowerCase().includes(name.toLowerCase())
      );
    }

    setFilteredGardens(tempGardens);
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      "Confirmar Deleção",
      "Tem certeza que deseja deletar esta horta?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Deletar",
          style: "destructive",
          onPress: () => {
            const success = deleteGarden(id);
            if (success) {
              Alert.alert("Sucesso", "Horta deletada com sucesso!");
              const updatedGardens = gardens.filter((g) => g.id !== id);
              setGardens(updatedGardens);
              setFilteredGardens(updatedGardens);
            } else {
              Alert.alert("Erro", "Erro ao deletar a horta.");
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todas as Hortas</Text>

      {/* Você pode adicionar um componente de filtro semelhante ao TaskFilter */}
      {/* <GardenFilter onFilter={handleFilter} /> */}

      <FlatList
        data={filteredGardens}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.gardenItem}>
            <Text style={styles.gardenName}>{item.gardenName}</Text>{" "}
            {/* Corrigido de garden_name para gardenName */}
            <Text>{item.gardenDescription}</Text>{" "}
            {/* Corrigido de garden_description para gardenDescription */}
            <View style={styles.buttonContainer}>
              <Button
                title="Detalhes"
                onPress={() => router.push(`./gardens/${item.id}`)}
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
          title="Criar Horta"
          onPress={() => router.push("./gardens/create")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  gardenItem: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#f8bbd0",
  },
  gardenName: { fontSize: 18, fontWeight: "bold" },
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

export default GardenList;
