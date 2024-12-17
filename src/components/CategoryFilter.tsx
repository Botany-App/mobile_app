import React from "react";
import { FlatList, Button, View } from "react-native";
import { CategoryPlant } from "../api/types";

interface Props {
  categories: CategoryPlant[];
  selectedCategory: string;
  onSelect: (id: string) => void;
}

const CategoryFilter: React.FC<Props> = ({
  categories,
  selectedCategory,
  onSelect,
}) => {
  return (
    <View style={{ marginVertical: 10 }}>
      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Button
            title={item.name}
            onPress={() => onSelect(item.id)}
            color={selectedCategory === item.id ? "green" : "gray"}
          />
        )}
      />
    </View>
  );
};

export default CategoryFilter;
