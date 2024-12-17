// app/(tabs)/plants/_layout.tsx

import { Stack } from "expo-router";
import React from "react";

export default function PlantsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Plantas" }} />
      <Stack.Screen
        name="[plantId]"
        options={{ title: "Detalhes da Planta" }}
      />
      <Stack.Screen name="create" options={{ title: "Criar Planta" }} />
    </Stack>
  );
}
