import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { z } from "zod";
import { colors } from "@/styles/colors";
import { login as mockLogin } from "../../../mockBackend"; // Ajuste o caminho conforme seu projeto

const schema = z.object({
  email: z.string().email("Digite um e-mail válido"),
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
});

type FormData = z.infer<typeof schema>;

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    // Simulamos um pequeno atraso só para feedback de UX
    setTimeout(() => {
      const user = mockLogin(data.email, data.password);
      setLoading(false);

      if (user) {
        // Login bem-sucedido
        console.log("Usuário logado:", user);
        router.push("/(tabs)/home"); // Redireciona para a home/dash
      } else {
        // Falha no login
        alert("E-mail ou senha inválidos.");
      }
    }, 2000);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F8FAFC",
        gap: 20,
        paddingTop: 60,
        padding: 20,
      }}>
      <TouchableOpacity>
        <AntDesign
          name="arrowleft"
          size={32}
          color="black"
          onPress={() => router.back()}
        />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
        }}>
        Bem-vindo de volta
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: "#657786",
          marginTop: -15,
        }}>
        Insira suas credenciais para acessar sua conta.
      </Text>
      <View style={{ gap: 2 }}>
        {/* Campo E-mail */}
        <Text style={{ fontSize: 16, marginVertical: 8 }}>E-mail:</Text>
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 4,
                padding: 10,
                fontSize: 16,
              }}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Digite seu e-mail"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
        />
        {errors.email && (
          <Text style={{ color: "red", fontSize: 14, marginTop: 4 }}>
            {errors.email.message}
          </Text>
        )}

        {/* Campo Senha */}
        <Text style={{ fontSize: 16, marginVertical: 8 }}>Senha:</Text>
        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 4,
                padding: 10,
                fontSize: 16,
              }}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Digite sua senha"
              secureTextEntry
            />
          )}
        />
        {errors.password && (
          <Text style={{ color: "red", fontSize: 14, marginTop: 4 }}>
            {errors.password.message}
          </Text>
        )}

        {/* Botão de Login */}
        <TouchableOpacity
          style={{
            marginTop: 20,
            backgroundColor: colors.green[400],
            padding: 10,
            alignItems: "center",
            borderRadius: 4,
          }}
          onPress={handleSubmit(onSubmit)}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={{ color: "#fff", fontSize: 16 }}>Entrar</Text>
          )}
        </TouchableOpacity>

        {/* Esqueceu sua senha */}
        <TouchableOpacity
          style={{ marginTop: 15, alignItems: "center" }}
          onPress={() => console.log("Recuperar senha não implementado")}>
          <Text
            style={{
              color: colors.green[400],
              fontWeight: "bold",
              textDecorationLine: "underline",
            }}>
            Esqueceu sua senha?
          </Text>
        </TouchableOpacity>

        {/* Não tem uma conta? */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20,
          }}>
          <Text>Não tem uma conta? </Text>
          <TouchableOpacity onPress={() => router.push("/register/one")}>
            <Text style={{ color: colors.green[400] }}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
