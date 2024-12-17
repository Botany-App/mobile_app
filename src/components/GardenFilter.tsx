// src/components/GardenFilter.tsx

import React from "react";
import { FlatList, Button, View } from "react-native";
import { Garden } from "../api/types";

interface Props {
  gardens: Garden[];
  selectedLocation: string;
  onSelect: (location: string) => void;
}

const GardenFilter: React.FC<Props> = ({
  gardens,
  selectedLocation,
  onSelect,
}) => {
  // Extraia todas as localizações únicas
  const locations = Array.from(
    new Set(gardens.map((g) => g.garden_location))
  ).filter((loc) => loc);

  return (
    <View style={{ marginVertical: 10 }}>
      <FlatList
        horizontal
        data={locations}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item }) => (
          <Button
            title={item}
            onPress={() => onSelect(item)}
            color={selectedLocation === item ? "green" : "gray"}
          />
        )}
      />
    </View>
  );
};

export default GardenFilter;
