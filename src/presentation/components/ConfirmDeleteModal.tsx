import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Modal, Button } from "react-native-paper";
import { theme } from "@/src/core/constants/theme";

interface ConfirmDeleteModalProps {
  visible: boolean;
  onDismiss: () => void;
  onConfirm: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  visible,
  onDismiss,
  onConfirm,
}) => {
  return (
    <Modal
      visible={visible}
      onDismiss={onDismiss}
      contentContainerStyle={styles.modalContent}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Eliminar registro</Text>
        <Text style={{ color: theme.title }}>
          Esta acción no se puede deshacer.
        </Text>
        <View style={styles.buttonsContainer}>
          <Button
            mode="contained"
            onPress={onConfirm}
            style={styles.confirmButton}
            labelStyle={{ color: "#0D0D0D" }}
          >
            Eliminar
          </Button>
          <Button
            mode="outlined"
            onPress={onDismiss}
            style={styles.cancelButton}
            labelStyle={{ color: theme.title }}
          >
            Cancelar
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmDeleteModal;

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "#0D0D0D",
    padding: 20,
    margin: 20,
    borderRadius: 10,
    marginTop: -100,
  },
  container: {
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    color: theme.title,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  confirmButton: {
    backgroundColor: theme.error,
    marginRight: 10,
  },
  cancelButton: {
    borderColor: "#0D0D0D",
    borderWidth: 1,
  },
});
