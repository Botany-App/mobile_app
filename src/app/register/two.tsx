import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "expo-router";
import { colors } from "@/styles/colors";

export default function ConfirmEmail() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const schema = z.object({
    token: z.string().length(6, "O token deve ter exatamente 6 dígitos"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      token: "",
    },
  });

  const router = useRouter();

  const validateToken = async (data: any) => {
    setLoading(true);
    setErrorMessage("");

    // Simula uma validação do token
    setTimeout(() => {
      setLoading(false);

      if (data.token === "099169") {
        router.push("/register/sucess"); // Redireciona para a próxima página em caso de sucesso
      } else {
        setErrorMessage("Token inválido. Por favor, tente novamente.");
      }
    }, 3000);
  };

  const handleResendToken = () => {
    alert("Um novo token foi enviado para o seu e-mail.");
  };

  return (
    <View style={styles.container}>
      <View style={{ width: "100%" }}>
        <Text style={styles.title}>Confirmação de E-mail</Text>
        <Text style={styles.subtitle}>
          Insira o token enviado para o seu e-mail para confirmar sua conta.
        </Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Token:</Text>
        <Controller
          name="token"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Digite o token"
              keyboardType="numeric"
              maxLength={6}
            />
          )}
        />
        {errors.token && (
          <Text style={styles.errorText}>{errors.token.message}</Text>
        )}
        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSubmit(validateToken)}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Confirmar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={handleResendToken}>
          <Text style={styles.resendLink}>Não recebeu o e-mail? Reenviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "left",
    width: "100%",
  },
  subtitle: {
    fontSize: 16,
    color: "#657786",
    textAlign: "left",
    marginBottom: 20,
  },
  form: {
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    width: "100%",
    backgroundColor: colors.green[400],
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: colors.green[300],
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  resendLink: {
    color: colors.green[400],
    marginTop: 20,
    fontSize: 16,
    textDecorationLine: "underline",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 4,
    textAlign: "center",
  },
});
