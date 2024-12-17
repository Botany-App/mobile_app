import { colors } from "@/styles/colors";
import { router } from "expo-router";
import { View, Text, Image, TouchableOpacity } from "react-native";

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F8FAFC",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
      }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 30,
        }}>
        <Image
          source={require("../../assets/logo.png")}
          style={{ width: 50, height: 50 }}
        />
        <Text
          style={{ color: colors.green[500], marginLeft: -5, fontSize: 18 }}>
          Botany
        </Text>
      </View>
      <View
        style={{
          gap: 20,
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Image
          source={require("../../assets/seeding.png")}
          style={{ width: 250, height: 250 }}
        />
        <View
          style={{ alignItems: "center", justifyContent: "center", gap: 15 }}>
          <Text
            style={{
              fontSize: 24,
              color: colors.gray[800],
              fontWeight: "bold",
            }}>
            <Text
              style={{
                color: colors.green[400],
                textDecorationLine: "underline",
              }}>
              Técnologia
            </Text>{" "}
            para sua horta!
          </Text>
          <Text
            style={{
              fontSize: 14,
              textAlign: "center",
              color: colors.gray[400],
            }}>
            Gerencie de forma fácil e prática, com diagnósticos e{"\n"} dicas de
            cultivo.
          </Text>
        </View>
        <View style={{ marginTop: 50 }}>
          <TouchableOpacity
            style={{
              backgroundColor: colors.green[300],
              padding: 15,
              width: 300,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 4,
            }}
            onPress={() => router.push("/login")}>
            flex: 1,
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              Já possui uma conta?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/register/one")}
            style={{ alignItems: "center", justifyContent: "center" }}>
            <Text
              style={{
                marginTop: 50,
                fontSize: 16,
                textDecorationLine: "underline",
                fontWeight: "500",
              }}>
              Criar uma conta!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
