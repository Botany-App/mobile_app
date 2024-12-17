import { colors } from "@/styles/colors";
import {  StyleSheet } from "react-native";
export  const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    height: 260,
    width: "100%",
 
    position: "relative",
  },
   arrow: {
    position: "absolute",
    top: 60,
    left: 20,
    fontWeight: "bold",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 50,
  },
  content: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    padding: 20,
  },
  avatarContainer: {
    height: 150,
    width: 150,
    borderRadius: 100,
    overflow: "hidden",
    marginTop: -100,
    borderColor: "#F8FAFC",
    alignSelf: "center",
  },
  avatar: {
   flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  email: {
    fontSize: 12,
    textAlign: "center",
    color: colors.gray[500],
  },
  button: {
    backgroundColor: colors.green[300],
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 30,
    marginBottom: 30,
    width: 200,
  },
  edit: {
    color: colors.black,
    textAlign: "center",
    fontWeight: "bold",
  }
  
});
