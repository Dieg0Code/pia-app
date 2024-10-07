import { StyleSheet } from "react-native";
import React from "react";
import { Button, Modal, Text } from "react-native-paper";
import { AlertIcon } from "./Icons";
import { theme } from "@/src/core/constants/theme";

interface AuthErrorModalProps {
  visible: boolean;
  message: string;
  onClose: () => void;
  iconColor: string;
}

const AuthErrorModal: React.FC<AuthErrorModalProps> = ({
  visible,
  onClose,
  message,
  iconColor,
}) => {
  return (
    <Modal
      visible={visible}
      onDismiss={onClose}
      contentContainerStyle={styles.modalContent}
    >
      <AlertIcon color={iconColor} style={styles.icon} size={60} />
      <Text style={styles.message}>{message}</Text>
      {/* <Button
        mode="text"
        labelStyle={{ color: theme.title }}
        onPress={onClose}
        style={styles.button}
      >
        Ok
      </Button> */}
    </Modal>
  );
};

export default AuthErrorModal;

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: theme.black,
    padding: 20,
    borderRadius: 16,
    alignSelf: "center",
    alignItems: "center",
    width: "80%",
  },
  message: {
    color: theme.textPrimary,
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    margin: 10,
    width: "50%",
  },
  icon: {
    alignSelf: "center",
    margin: 10,
  },
});
