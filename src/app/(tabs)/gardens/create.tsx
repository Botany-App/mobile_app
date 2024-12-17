// app/(tabs)/gardens/create.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { getAllPlants, createGarden } from "../../../../src/api/mockDB"; // Ajuste o caminho relativo
import { Plant, Garden } from "../../../../src/api/types";
import { useRouter } from "expo-router";

const CreateGarden = () => {
  const router = useRouter();
  const plants: Plant[] = getAllPlants();

  const [gardenName, setGardenName] = useState("");
  const [gardenDescription, setGardenDescription] = useState("");
  const [selectedPlants, setSelectedPlants] = useState<string[]>([]);

  const handleTogglePlant = (id: string) => {
    if (selectedPlants.includes(id)) {
      setSelectedPlants(selectedPlants.filter((pId) => pId !== id));
    } else {
      setSelectedPlants([...selectedPlants, id]);
    }
  };

  const handleCreateGarden = () => {
    if (!gardenName) {
      Alert.alert("Erro", "Nome da horta é obrigatório!");
      return;
    }

    createGarden({
      gardenName, // Corrigido de garden_name para gardenName
      gardenDescription, // Corrigido de garden_description para gardenDescription
      plantsId: selectedPlants,
    });

    Alert.alert("Sucesso", "Horta criada com sucesso!");
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Criar Horta</Text>

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
            title={p.plantName} // Corrigido de p.plant_name para p.plantName
            onPress={() => handleTogglePlant(p.id)}
            color={selectedPlants.includes(p.id) ? "green" : "gray"}
          />
        ))
      )}

      <Button title="Criar Horta" onPress={handleCreateGarden} />
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

export default CreateGarden;
