import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Modal,
  TextInput,
  Switch,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import {
  getCurrentUserData,
  logout,
  // deleteUserAccount,
} from "../../../mockBackend";

export default function ProfileInspiredScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [themeEnabled, setThemeEnabled] = useState(false);

  useEffect(() => {
    const user = getCurrentUserData();
    if (user) {
      setUserName(user.name);
      setUserEmail(user.email);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.green[400]} />
      </View>
    );
  }

  function handleEditUserData() {
    setModalVisible(true);
    setEditName(userName);
    setEditEmail(userEmail);
  }

  function handleSaveUserData() {
    setUserName(editName);
    setUserEmail(editEmail);
    setModalVisible(false);
  }

  function handleToggleNotifications(value: boolean) {
    setNotificationsEnabled(value);
  }

  function handleToggleTheme(value: boolean) {
    setThemeEnabled(value);
    Alert.alert("Tema", value ? "Tema ativado" : "Tema desativado");
  }

  async function handleLogout() {
    logout();
    router.replace("/login");
  }

  async function handleDeleteAccount() {
    Alert.alert(
      "Deletar Conta",
      "Você tem certeza que deseja deletar sua conta? Essa ação não pode ser desfeita.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Deletar",
          style: "destructive",
          onPress: () => {
            // deleteUserAccount();
            router.replace("/register/one");
          },
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      {/* Cabeçalho Ondulado com Gradiente Verde */}
      <View style={styles.headerContainer}>
        <LinearGradient
          colors={["#32a852", "#88d499"]}
          style={styles.gradientBackground}>
          <View style={styles.headerTopRow}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}>
              <AntDesign
                name="arrowleft"
                size={24}
                color="#fff"
                style={{ padding: 10 }}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.profileName}>{userName}</Text>
          <Text style={styles.profileRole}>{userEmail}</Text>
        </LinearGradient>
      </View>

      {/* Corpo / Menu */}
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={handleEditUserData}>
          <AntDesign
            name="edit"
            size={20}
            color={colors.green[400]}
            style={styles.icon}
          />
          <Text style={styles.menuItemText}>Mudar dados</Text>
        </TouchableOpacity>

        <View style={styles.separator} />

        {/* Notificações */}
        <View style={styles.menuItem}>
          <Ionicons
            name="notifications-outline"
            size={20}
            color={colors.green[400]}
            style={styles.icon}
          />
          <Text style={styles.menuItemText}>Notificações</Text>
          <View style={{ flex: 1 }} />
          <Switch
            value={notificationsEnabled}
            onValueChange={handleToggleNotifications}
          />
        </View>

        <View style={styles.separator} />

        {/* Mudar Tema (Switch) */}
        <View style={styles.menuItem}>
          <AntDesign
            name="smileo"
            size={20}
            color={colors.green[400]}
            style={styles.icon}
          />
          <Text style={styles.menuItemText}>Tema</Text>
          <View style={{ flex: 1 }} />
          <Switch value={themeEnabled} onValueChange={handleToggleTheme} />
        </View>

        <View style={styles.separator} />

        {/* Relatórios de Diagnóstico */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push("/profile/reports")}>
          <MaterialCommunityIcons
            name="file-document-outline"
            size={20}
            color={colors.green[400]}
            style={styles.icon}
          />
          <Text style={styles.menuItemText}>Relatórios</Text>
        </TouchableOpacity>

        <View style={styles.separator} />

        {/* Sair da Conta */}
        <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
          <AntDesign
            name="logout"
            size={20}
            color={colors.green[400]}
            style={styles.icon}
          />
          <Text style={styles.menuItemText}>Sair da conta</Text>
        </TouchableOpacity>

        <View style={styles.separator} />

        {/* Deletar Conta (sem fundo, texto vermelho) */}
        <TouchableOpacity
          style={[styles.menuItem, { paddingVertical: 20 }]}
          onPress={handleDeleteAccount}>
          <AntDesign
            name="deleteuser"
            size={20}
            color="red"
            style={styles.icon}
          />
          <Text style={[styles.menuItemText, { color: "red" }]}>
            Deletar conta
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal para editar dados */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Editar Dados</Text>
            <Text style={styles.modalLabel}>Nome:</Text>
            <TextInput
              style={styles.modalInput}
              value={editName}
              onChangeText={setEditName}
            />
            <Text style={styles.modalLabel}>E-mail:</Text>
            <TextInput
              style={styles.modalInput}
              value={editEmail}
              onChangeText={setEditEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButtonCancel}
                onPress={() => setModalVisible(false)}>
                <Text style={{ color: "#fff" }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButtonSave}
                onPress={handleSaveUserData}>
                <Text style={{ color: "#fff" }}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const HEADER_HEIGHT = 250;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  headerContainer: {
    height: HEADER_HEIGHT,
    overflow: "hidden",
  },
  gradientBackground: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 80,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  headerTopRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 20,
    position: "absolute",
    top: 40,
    left: 20,
  },
  backButton: {
    padding: 5,
  },
  profileName: {
    marginTop: 20,
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  profileRole: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginTop: 5,
  },
  menuContainer: {
    flex: 1,
    marginTop: -20,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
    paddingHorizontal: 20,
    elevation: 3,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
  },
  icon: {
    marginRight: 15,
  },
  menuItemText: {
    fontSize: 16,
    color: "#333",
  },
  separator: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#eee",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#FFF",
    width: "80%",
    borderRadius: 8,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButtonCancel: {
    backgroundColor: "#aaa",
    padding: 10,
    borderRadius: 4,
    width: "45%",
    alignItems: "center",
  },
  modalButtonSave: {
    backgroundColor: colors.green[400],
    padding: 10,
    borderRadius: 4,
    width: "45%",
    alignItems: "center",
  },
});
