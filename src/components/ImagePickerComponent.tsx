// src/components/ImagePickerComponent.tsx

import React from "react";
import { View, Button, Image, StyleSheet } from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

interface Props {
  imageUri: string | null;
  setImageUri: (uri: string) => void;
}

const ImagePickerComponent: React.FC<Props> = ({ imageUri, setImageUri }) => {
  const handleTakePhoto = () => {
    launchCamera(
      {
        mediaType: "photo",
        quality: 0.8,
      },
      (response) => {
        if (response.didCancel) {
          console.log("Usuário cancelou a captura de imagem.");
        } else if (response.errorCode) {
          console.log("Erro ao capturar imagem:", response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          setImageUri(response.assets[0].uri || "");
        }
      }
    );
  };

  const handleChoosePhoto = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        quality: 0.8,
      },
      (response) => {
        if (response.didCancel) {
          console.log("Usuário cancelou a seleção de imagem.");
        } else if (response.errorCode) {
          console.log("Erro ao selecionar imagem:", response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          setImageUri(response.assets[0].uri || "");
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      <Button title="Tirar Foto" onPress={handleTakePhoto} />
      <Button title="Escolher da Galeria" onPress={handleChoosePhoto} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: "center", marginVertical: 10 },
  image: { width: 200, height: 200, marginBottom: 10, borderRadius: 10 },
});

export default ImagePickerComponent;
