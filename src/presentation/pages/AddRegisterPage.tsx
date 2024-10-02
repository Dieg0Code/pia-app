import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Snackbar, Text } from "react-native-paper";
import { useDiaryStore } from "../store/DiaryStore";
import DiaryForm from "../components/DiaryForm";
import { theme } from "@/src/core/constants/theme";

const AddRegisterPage: React.FC = () => {
  const error = useDiaryStore((state) => state.error);
  const response = useDiaryStore((state) => state.response);
  const clearResponse = useDiaryStore((state) => state.clearResponse);
  const clearError = useDiaryStore((state) => state.clearError);

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarColor, setSnackbarColor] = useState("white");

  const primaryColor = theme.primary;
  const errorColor = theme.error;

  const handleValidationError = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarColor(errorColor);
    setSnackbarVisible(true);
  };

  useEffect(() => {
    if (error) {
      setSnackbarMessage(error);
      setSnackbarColor(errorColor);
      setSnackbarVisible(true);
    } else if (response) {
      setSnackbarMessage("Formulario enviado exitosamente");
      setSnackbarColor(primaryColor);
      setSnackbarVisible(true);
      clearResponse();
    }
  }, [error, response]);

  // Limpia el estado al desmontar la pantalla
  useEffect(() => {
    return () => {
      clearResponse();
      clearError();
    };
  }, [clearResponse, clearError]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.background,
    padding: 16,
  },
  snackbar: {
    position: "absolute",
    bottom: 20,
  },
});

export default AddRegisterPage;
