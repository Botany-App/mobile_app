// src/screens/Home/HomeScreen.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  ScrollView,
  StyleSheet,
} from "react-native";
import Header from "../../../components/Header";
import SearchBar from "../../../components/SearchBar";
import {
  searchData,
  getRecentlyAccessed,
  getTasksByUrgency,
} from "../../../api/mockDB"; // Caminho corrigido
import { useRouter } from "expo-router"; // Usar useRouter do expo-router

const HomeScreen = () => {
  const [query, setQuery] = useState("");
  const router = useRouter(); // Usar useRouter do expo-router

  const { tasks, gardens, plants } = searchData(query);
  const { gardens: recentGardens, plants: recentPlants } =
    getRecentlyAccessed();
  const urgentTasks = getTasksByUrgency();

  return (
    <ScrollView style={styles.container}>
      <Header />

      {/* Campo de pesquisa */}
      <SearchBar
        placeholder="Buscar tarefas, hortas, plantas..."
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={() => {}}
      />

      {/* Lista Horizontal de Acessados Recentemente */}
      <Text style={styles.sectionTitle}>Acessados Recentemente:</Text>
      <FlatList
        horizontal
        data={[...recentGardens, ...recentPlants]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.recentItem}>
            <Text style={styles.itemName}>
              {"gardenName" in item ? item.gardenName : item.plantName}
            </Text>
            {/* Aqui você pode adicionar uma imagem genérica ou específica */}
            {/* Exemplo: <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.image} /> */}
          </View>
        )}
      />

      {/* Lista Vertical de Tarefas Mais Urgentes */}
      <Text style={styles.sectionTitle}>Tarefas Mais Urgentes:</Text>
      {urgentTasks.length === 0 ? (
        <Button
          title="Criar Horta ou Tarefa"
          onPress={() => router.push("./gardens/create")} // Usar caminho absoluto
        />
      ) : (
        <FlatList
          data={urgentTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.taskItem}>
              <Text style={styles.taskName}>{item.name}</Text>
              <Text>Urgência: {item.urgencyLevel}</Text>{" "}
              {/* Corrigido de urgency_level para urgencyLevel */}
            </View>
          )}
        />
      )}

      {/* Resultados da Pesquisa */}
      {query.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Resultados da Pesquisa:</Text>
          <Text style={styles.subtitle}>Tarefas Encontradas:</Text>
          {tasks.length === 0 ? (
            <Text>Nenhuma tarefa encontrada.</Text>
          ) : (
            tasks.map((t) => <Text key={t.id}>{t.name}</Text>)
          )}

          <Text style={styles.subtitle}>Hortas Encontradas:</Text>
          {gardens.length === 0 ? (
            <Text>Nenhuma horta encontrada.</Text>
          ) : (
            gardens.map((g) => <Text key={g.id}>{g.gardenName}</Text>)
          )}

          <Text style={styles.subtitle}>Plantas Encontradas:</Text>
          {plants.length === 0 ? (
            <Text>Nenhuma planta encontrada.</Text>
          ) : (
            plants.map((p) => <Text key={p.id}>{p.plantName}</Text>)
          )}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  recentItem: {
    padding: 10,
    marginRight: 10,
    backgroundColor: "#c8e6c9",
    borderRadius: 5,
    width: 150,
    alignItems: "center",
  },
  itemName: { fontSize: 16, fontWeight: "bold" },
  taskItem: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#ffccbc",
  },
  taskName: { fontSize: 16, fontWeight: "bold" },
  subtitle: { fontSize: 16, fontWeight: "bold", marginTop: 10 },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
});

export default HomeScreen;
