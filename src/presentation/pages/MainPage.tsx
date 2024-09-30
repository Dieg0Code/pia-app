import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Snackbar, Text } from "react-native-paper";
import { useDiaryStore } from "../store/DiaryStore";
import DiaryForm from "../components/DiaryForm";

const MainPage: React.FC = () => {
  const error = useDiaryStore((state) => state.error);
  const response = useDiaryStore((state) => state.response);
  const clearResponse = useDiaryStore((state) => state.clearResponse);

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarColor, setSnackbarColor] = useState("white");

  const handleValidationError = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarColor("red");
    setSnackbarVisible(true);
  };

  useEffect(() => {
    if (error) {
      setSnackbarMessage(error);
      setSnackbarColor("red");
      setSnackbarVisible(true);
    } else if (response) {
      setSnackbarMessage("Formulario enviado exitosamente");
      setSnackbarColor("green");
      setSnackbarVisible(true);
      clearResponse();
    }
  }, [error, response]);

  return (
    <View style={styles.container}>
      <DiaryForm onValidationError={handleValidationError} />
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        action={{
          label: "Cerrar",
          onPress: () => setSnackbarVisible(false),
          labelStyle: { color: "white" },
        }}
        style={[styles.snackbar, { backgroundColor: snackbarColor }]}
      >
        <Text style={{ color: "white" }}>{snackbarMessage}</Text>
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    padding: 16,
  },
  snackbar: {
    position: "absolute",
    bottom: 20,
  },
});

export default MainPage;
