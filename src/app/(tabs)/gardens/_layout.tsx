// app/(tabs)/gardens/_layout.tsx

import { Stack } from "expo-router";
import React from "react";

export default function GardensLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Hortas" }} />
      <Stack.Screen
        name="[gardenId]"
        options={{ title: "Detalhes da Horta" }}
      />
      <Stack.Screen name="create" options={{ title: "Criar Horta" }} />
      <Stack.Screen
        name="edit/[gardenId]"
        options={{ title: "Editar Horta" }}
      />
    </Stack>
  );
}
