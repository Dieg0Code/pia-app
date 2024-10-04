import React from "react";
import { Modal, TextInput, Button } from "react-native-paper";
import { ScrollView, StyleSheet, View } from "react-native";
import { DiaryDTO } from "@/src/data/models/DiaryDTO";
import { theme } from "@/src/core/constants/theme";

interface EditRegistryModalProps {
  visible: boolean;
  onClose: () => void;
  editingEntry: DiaryDTO | null;
  onUpdateEntry: () => void;
  onChangeTitle: (text: string) => void;
  onChangeContent: (text: string) => void;
}

const EditRegistryModal: React.FC<EditRegistryModalProps> = ({
  visible,
  onClose,
  editingEntry,
  onUpdateEntry,
  onChangeTitle,
  onChangeContent,
}) => {
  const handleUpdatePress = () => {
    if (!editingEntry?.title.trim() || !editingEntry?.content.trim()) {
      onUpdateEntry();
    } else {
      onUpdateEntry();
    }
  };

  return (
    <Modal
      visible={visible}
      onDismiss={onClose}
      contentContainerStyle={styles.modalContent}
    >
      <TextInput
        label="Title"
        value={editingEntry?.title}
        onChangeText={onChangeTitle}
        style={styles.input}
        mode="outlined"
        outlineColor="#1F1F1F"
        theme={{
          colors: {
            primary: theme.primary,
          },
          roundness: 16,
        }}
      />
      <ScrollView>
        <TextInput
          label="Content"
          value={editingEntry?.content}
          onChangeText={onChangeContent}
          multiline
          style={styles.input}
          mode="outlined"
          outlineColor="#1F1F1F"
          theme={{
            colors: {
              primary: theme.primary,
            },
            roundness: 16,
          }}
        />
      </ScrollView>
      <Button
        mode="contained"
        onPress={handleUpdatePress}
        style={styles.button}
        labelStyle={{ color: "black" }}
        theme={{ colors: { primary: theme.primary } }}
      >
        Update Entry
      </Button>
      <Button
        mode="text"
        onPress={onClose}
        style={styles.button}
        theme={{ colors: { primary: theme.primary, outline: theme.primary } }}
      >
        Cancel
      </Button>
    </Modal>
  );
};

export default EditRegistryModal;

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: theme.input,
    padding: 20,
    margin: 20,
    borderRadius: 10,
    marginTop: -80,
  },
  input: {
    marginBottom: 10,
    maxHeight: 260,
    backgroundColor: theme.card,
    borderColor: "#171717",
  },
  button: {
    marginTop: 10,
  },
});
