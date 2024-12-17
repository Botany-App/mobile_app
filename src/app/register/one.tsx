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
import { createUser } from "../../../mockBackend"; // Ajuste o caminho conforme sua estrutura

const schema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Digite um e-mail válido"),
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
});

type FormData = z.infer<typeof schema>;

export default function RegisterIndex() {
  const [loading, setLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    if (!acceptedTerms) {
      alert("Você precisa aceitar os Termos de Uso para continuar.");
      return;
    }

    setLoading(true);
    try {
      // Cria o usuário mas não faz login ainda
      createUser(data.name, data.email, data.password);
      // Redireciona para a segunda etapa do registro
      router.push("/register/two");
    } catch (error: any) {
      console.error("Erro no processo de cadastro (etapa 1):", error.message);
      alert("Erro no cadastro. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
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
        Crie uma conta
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: "#657786",
          marginTop: -15,
        }}>
        Vamos começar com seu nome, e-mail e senha.
      </Text>
      <View style={{ gap: 2 }}>
        <Text style={{ fontSize: 16, marginVertical: 8 }}>Nome:</Text>
        <Controller
          name="name"
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
              placeholder="Digite seu nome"
            />
          )}
        />
        {errors.name && (
          <Text style={{ color: "red", fontSize: 14, marginTop: 4 }}>
            {errors.name.message}
          </Text>
        )}

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

        {/* Termos de uso */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 12,
          }}>
          <TouchableOpacity
            onPress={() => setAcceptedTerms(!acceptedTerms)}
            style={{
              width: 24,
              height: 24,
              borderWidth: 1,
              borderColor: acceptedTerms ? colors.green[400] : "#ccc",
              backgroundColor: acceptedTerms
                ? colors.green[400]
                : "transparent",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 4,
            }}>
            {acceptedTerms && <AntDesign name="check" size={16} color="#fff" />}
          </TouchableOpacity>
          <Text style={{ marginLeft: 8 }}>
            Aceito os{" "}
            <Text
              style={{
                color: colors.green[400],
                fontWeight: "bold",
                textDecorationLine: "underline",
              }}>
              Termos de Uso
            </Text>
          </Text>
        </View>

        {/* Botão Submit */}
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
            <Text style={{ color: "#fff", fontSize: 16 }}>Cadastrar</Text>
          )}
        </TouchableOpacity>

        {/* Já tem uma conta? */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 12,
          }}>
          <Text>Já tem uma conta? </Text>
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text style={{ color: colors.green[400] }}>Faça o login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
