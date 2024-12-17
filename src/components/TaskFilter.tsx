// src/components/TaskFilter.tsx

import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  Text,
} from "react-native";
import { CategoryTask } from "../api/types";
import { getAllCategoriesTask } from "../api/mockDB";

interface Props {
  onFilter: (filters: {
    urgencyLevel?: number;
    status?: string;
    name?: string;
    categoryId?: string;
  }) => void;
}

const TaskFilter: React.FC<Props> = ({ onFilter }) => {
  const categoriesTask: CategoryTask[] = getAllCategoriesTask();
  const [urgencyLevel, setUrgencyLevel] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleApplyFilters = () => {
    const filters: {
      urgencyLevel?: number;
      status?: string;
      name?: string;
      categoryId?: string;
    } = {};

    if (urgencyLevel) filters.urgencyLevel = parseInt(urgencyLevel);
    if (status) filters.status = status;
    if (name) filters.name = name;
    if (selectedCategory) filters.categoryId = selectedCategory;

    onFilter(filters);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Filtrar Tarefas:</Text>

      <TextInput
        placeholder="Nível de Urgência (1-5)"
        value={urgencyLevel}
        onChangeText={setUrgencyLevel}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Status da Tarefa"
        value={status}
        onChangeText={setStatus}
        style={styles.input}
      />

      <TextInput
        placeholder="Nome da Tarefa"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <Text style={styles.label}>Categoria:</Text>
      <FlatList
        horizontal
        data={categoriesTask}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Button
            title={item.name}
            onPress={() =>
              setSelectedCategory(selectedCategory === item.id ? "" : item.id)
            }
            color={selectedCategory === item.id ? "green" : "gray"}
          />
        )}
        style={styles.categoryList}
      />

      <Button title="Aplicar Filtros" onPress={handleApplyFilters} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    marginVertical: 10,
  },
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  input: {
    borderWidth: 1,
    padding: 8,
    marginVertical: 5,
    borderRadius: 5,
    borderColor: "#ccc",
  },
  categoryList: { marginVertical: 10 },
});

export default TaskFilter;
