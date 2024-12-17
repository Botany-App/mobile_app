// app/(tabs)/gardens/edit/[gardenId].tsx

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import {
  getGardenById,
  getAllPlants,
  updateGarden,
} from "../../../../../src/api/mockDB"; // Verifique se este caminho está correto
import { Garden, Plant } from "../../../../../src/api/types";
import { useRouter, useLocalSearchParams } from "expo-router";

const EditGarden = () => {
  const router = useRouter();
  const { gardenId } = useLocalSearchParams();
  const garden = getGardenById(gardenId as string);
  const plants: Plant[] = getAllPlants();

  const [gardenName, setGardenName] = useState("");
  const [gardenDescription, setGardenDescription] = useState("");
  const [selectedPlants, setSelectedPlants] = useState<string[]>([]);

  useEffect(() => {
    if (garden) {
      setGardenName(garden.gardenName); // Corrigido de garden.garden_name
      setGardenDescription(garden.gardenDescription); // Corrigido de garden.garden_description
      setSelectedPlants(garden.plantsId);
    }
  }, [garden]);

  if (!garden) {
    return (
      <View style={styles.container}>
        <Text>Horta não encontrada.</Text>
      </View>
    );
  }

  const handleTogglePlant = (id: string) => {
    if (selectedPlants.includes(id)) {
      setSelectedPlants(selectedPlants.filter((pId) => pId !== id));
    } else {
      setSelectedPlants([...selectedPlants, id]);
    }
  };

  const handleUpdateGarden = () => {
    if (!gardenName) {
      Alert.alert("Erro", "Nome da horta é obrigatório!");
      return;
    }

    // Atualizar a horta com as propriedades camelCase
    updateGarden(garden.id, {
      gardenName, // Corrigido de garden_name
      gardenDescription, // Corrigido de garden_description
      plantsId: selectedPlants,
    });

    Alert.alert("Sucesso", "Horta atualizada com sucesso!");
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Editar Horta</Text>

      <TextInput
        placeholder="Nome da Horta"
        value={gardenName}
        onChangeText={setGardenName}
        style={styles.input}
      />

      <TextInput
        placeholder="Descrição da Horta"
        value={gardenDescription}
        onChangeText={setGardenDescription}
        style={styles.input}
      />

      <Text style={styles.sectionTitle}>Plantas na Horta:</Text>
      {plants.length === 0 ? (
        <Text>Nenhuma planta disponível. Crie uma primeiro.</Text>
      ) : (
        plants.map((p) => (
          <Button
            key={p.id}
            title={p.plantName} // Corrigido de p.plant_name
            onPress={() => handleTogglePlant(p.id)}
            color={selectedPlants.includes(p.id) ? "green" : "gray"}
          />
        ))
      )}

      <Button title="Atualizar Horta" onPress={handleUpdateGarden} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderColor: "#ccc",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
});

export default EditGarden;
