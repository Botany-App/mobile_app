// app/(tabs)/camera/_layout.tsx

import { Stack } from "expo-router";
import React from "react";

export default function CameraLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Diagnóstico" }} />
      <Stack.Screen
        name="report"
        options={{ title: "Relatório de Diagnóstico" }}
      />
    </Stack>
  );
}
