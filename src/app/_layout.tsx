// app/_layout.tsx

import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export default function Layout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{}} />
        <Stack.Screen name="(tabs)/home" options={{}} />
        <Stack.Screen name="profile/[id]" options={{}} />
        <Stack.Screen name="profile/edit" options={{}} />
        <Stack.Screen name="profile/reports" options={{}} />
        <Stack.Screen name="register/one" options={{}} />
        <Stack.Screen name="register/two" options={{}} />
        <Stack.Screen name="register/success" options={{}} />
        <Stack.Screen name="login/index" options={{}} />
        <Stack.Screen name="plants/[id]" options={{}} />
      </Stack>
      <StatusBar style="dark" animated backgroundColor="#F8FAFC" />
    </SafeAreaProvider>
  );
}
