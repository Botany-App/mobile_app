// app/(tabs)/plants/create.tsx

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
import { getAllCategoryTasks, createPlant } from "../../../api/mockDB"; // Importação corrigida
import { CategoryTask, CreatePlantInput } from "../../../api/types"; // Importação corrigida
import { useRouter } from "expo-router";

const CreatePlant = () => {
  const router = useRouter();
  const categoriesTask: CategoryTask[] = getAllCategoryTasks();

  const [plantName, setPlantName] = useState("");
  const [plantDescription, setPlantDescription] = useState("");
  const [plantingDate, setPlantingDate] = useState<string>(""); // Armazenar como string para simplificar
  const [estimatedHarvestDate, setEstimatedHarvestDate] = useState<string>("");
  const [plantStatus, setPlantStatus] = useState("");
  const [currentHeight, setCurrentHeight] = useState<string>("0"); // Armazenar como string e converter
  const [currentWidth, setCurrentWidth] = useState<string>("0");
  const [irrigationWeek, setIrrigationWeek] = useState<string>("0");
  const [healthStatus, setHealthStatus] = useState<string>("Healthy");
  const [lastIrrigation, setLastIrrigation] = useState<string>("");
  const [lastFertilization, setLastFertilization] = useState<string>("");
  const [sunExposure, setSunExposure] = useState<string>("0");
  const [fertilizationWeek, setFertilizationWeek] = useState<string>("0");
  const [userId, setUserId] = useState<string>("");
  const [speciesId, setSpeciesId] = useState<string>("");
  const [categoriesId, setCategoriesId] = useState<string[]>([]);

  const handleToggleCategory = (id: string) => {
    if (categoriesId.includes(id)) {
      setCategoriesId(categoriesId.filter((catId) => catId !== id));
    } else {
      setCategoriesId([...categoriesId, id]);
    }
  };

  const handleCreatePlant = () => {
    if (!plantName) {
      Alert.alert("Erro", "Nome da planta é obrigatório!");
      return;
    }

    // Validação básica das datas
    if (
      !plantingDate ||
      !estimatedHarvestDate ||
      !lastIrrigation ||
      !lastFertilization
    ) {
      Alert.alert("Erro", "Todos os campos de data são obrigatórios!");
      return;
    }

    // Conversão das strings para Date e números
    const plantingDateObj = new Date(plantingDate);
    const estimatedHarvestDateObj = new Date(estimatedHarvestDate);
    const lastIrrigationObj = new Date(lastIrrigation);
    const lastFertilizationObj = new Date(lastFertilization);

    const currentHeightNum = parseFloat(currentHeight);
    const currentWidthNum = parseFloat(currentWidth);
    const irrigationWeekNum = parseInt(irrigationWeek);
    const sunExposureNum = parseFloat(sunExposure);
    const fertilizationWeekNum = parseFloat(fertilizationWeek);

    if (
      isNaN(currentHeightNum) ||
      isNaN(currentWidthNum) ||
      isNaN(irrigationWeekNum) ||
      isNaN(sunExposureNum) ||
      isNaN(fertilizationWeekNum)
    ) {
      Alert.alert("Erro", "Por favor, insira valores numéricos válidos!");
      return;
    }

    const input: CreatePlantInput = {
      plantName,
      plantDescription,
      plantingDate: plantingDateObj,
      estimatedHarvestDate: estimatedHarvestDateObj,
      plantStatus,
      currentHeight: currentHeightNum,
      currentWidth: currentWidthNum,
      irrigationWeek: irrigationWeekNum,
      healthStatus,
      lastIrrigation: lastIrrigationObj,
      lastFertilization: lastFertilizationObj,
      sunExposure: sunExposureNum,
      fertilizationWeek: fertilizationWeekNum,
      userId,
      speciesId,
      categoriesPlant: categoriesId,
      // createdAt e updatedAt geralmente são gerados automaticamente
    };

    createPlant(input);

    Alert.alert("Sucesso", "Planta criada com sucesso!");
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Criar Planta</Text>

      <TextInput
        placeholder="Nome da Planta"
        value={plantName}
        onChangeText={setPlantName}
        style={styles.input}
      />

      <TextInput
        placeholder="Descrição da Planta"
        value={plantDescription}
        onChangeText={setPlantDescription}
        style={styles.input}
      />

      <TextInput
        placeholder="Data de Plantio (YYYY-MM-DD)"
        value={plantingDate}
        onChangeText={setPlantingDate}
        style={styles.input}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Data Estimada de Colheita (YYYY-MM-DD)"
        value={estimatedHarvestDate}
        onChangeText={setEstimatedHarvestDate}
        style={styles.input}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Status da Planta"
        value={plantStatus}
        onChangeText={setPlantStatus}
        style={styles.input}
      />

      <TextInput
        placeholder="Altura Atual (cm)"
        value={currentHeight}
        onChangeText={setCurrentHeight}
        style={styles.input}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Largura Atual (cm)"
        value={currentWidth}
        onChangeText={setCurrentWidth}
        style={styles.input}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Semana de Irrigação"
        value={irrigationWeek}
        onChangeText={setIrrigationWeek}
        style={styles.input}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Status de Saúde"
        value={healthStatus}
        onChangeText={setHealthStatus}
        style={styles.input}
      />

      <TextInput
        placeholder="Última Irrigação (YYYY-MM-DD)"
        value={lastIrrigation}
        onChangeText={setLastIrrigation}
        style={styles.input}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Última Fertilização (YYYY-MM-DD)"
        value={lastFertilization}
        onChangeText={setLastFertilization}
        style={styles.input}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Exposição ao Sol (horas)"
        value={sunExposure}
        onChangeText={setSunExposure}
        style={styles.input}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Semana de Fertilização"
        value={fertilizationWeek}
        onChangeText={setFertilizationWeek}
        style={styles.input}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="ID do Usuário"
        value={userId}
        onChangeText={setUserId}
        style={styles.input}
      />

      <TextInput
        placeholder="ID da Espécie"
        value={speciesId}
        onChangeText={setSpeciesId}
        style={styles.input}
      />

      <Text style={styles.sectionTitle}>Categorias de Planta:</Text>
      {categoriesTask.length === 0 ? (
        <Text>Nenhuma categoria disponível. Crie uma primeiro.</Text>
      ) : (
        categoriesTask.map((cat) => (
          <Button
            key={cat.id}
            title={cat.name}
            onPress={() => handleToggleCategory(cat.id)}
            color={categoriesId.includes(cat.id) ? "green" : "gray"}
          />
        ))
      )}

      <Button title="Criar Planta" onPress={handleCreatePlant} />
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

export default CreatePlant;
