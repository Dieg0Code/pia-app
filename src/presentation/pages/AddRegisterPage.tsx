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
  const success = useDiaryStore((state) => state.success);
  const clearError = useDiaryStore((state) => state.clearError);
  const clearSuccess = useDiaryStore((state) => state.clearSuccess);

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
    if (success) {
      setSnackbarMessage("Registro añadido correctamente");
      setSnackbarColor(primaryColor);
      setSnackbarVisible(true);
      clearSuccess();
    } else if (error) {
      setSnackbarMessage(error);
      setSnackbarColor(errorColor);
      setSnackbarVisible(true);
      clearError();
    }
  }, [success, error, clearSuccess, clearError]);

  // Limpia el estado al desmontar la pantalla
  useEffect(() => {
    return () => {
      clearSuccess();
      clearError();
    };
  }, [clearSuccess, clearError]);

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
            labelStyle: { color: "#0D0D0D" },
          }}
          style={[styles.snackbar, { backgroundColor: snackbarColor }]}
        >
          <Text style={{ color: "#0D0D0D" }}>{snackbarMessage}</Text>
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
    bottom: 60,
  },
});

export default AddRegisterPage;
