import React from "react";
import { TextInput, StyleSheet } from "react-native";

interface Props {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onSubmitEditing?: () => void;
}

const SearchBar: React.FC<Props> = ({
  placeholder,
  value,
  onChangeText,
  onSubmitEditing,
}) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder || "Buscar..."}
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 10,
    margin: 10,
    borderRadius: 5,
    borderColor: "#ccc",
  },
});

export default SearchBar;
