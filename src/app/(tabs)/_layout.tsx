// app/(tabs)/_layout.tsx

import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = "";

          switch (route.name) {
            case "home":
              iconName = focused ? "home" : "home-outline";
              break;
            case "tasks":
              iconName = focused ? "list" : "list-outline";
              break;
            case "plants":
              iconName = focused ? "leaf" : "leaf-outline";
              break;
            case "gardens":
              iconName = focused ? "flower" : "flower-outline";
              break;
            case "camera":
              iconName = focused ? "camera" : "camera-outline";
              break;
            default:
              iconName = "ellipse";
              break;
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#4caf50",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { paddingBottom: 5, height: 60 },
        tabBarLabelStyle: { fontSize: 12 },
      })}>
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      {/* <Tabs.Screen name="tasks" options={{ title: "Tarefas" }} /> */}
      <Tabs.Screen name="plants" options={{ title: "Plantas" }} />
      <Tabs.Screen name="gardens" options={{ title: "Hortas" }} />
      <Tabs.Screen name="camera" options={{ title: "Câmera" }} />
    </Tabs>
  );
}
