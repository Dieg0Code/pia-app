import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { TextInput, Button, Card } from "react-native-paper";
import { useDiaryStore } from "../store/DiaryStore";

const DiaryForm: React.FC<{ onValidationError: (msg: string) => void }> = ({
  onValidationError,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const createDiary = useDiaryStore((state) => state.createDiary);

  const handleSubmit = () => {
    // Validación para campos vacíos
    if (!title.trim()) {
      onValidationError("El título no puede estar vacío");
      return;
    }
    if (!content.trim()) {
      onValidationError("El contenido no puede estar vacío");
      return;
    }

    // Si todo está bien, enviar los datos
    createDiary(title, content);
    setTitle("");
    setContent("");
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <TextInput
          label="Título"
          value={title}
          onChangeText={setTitle}
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Contenido"
          value={content}
          onChangeText={setContent}
          mode="outlined"
          multiline
          numberOfLines={4}
          style={styles.input}
        />
        <Button mode="contained" onPress={handleSubmit} style={styles.button}>
          Enviar Diario
        </Button>
      </Card.Content>
    </Card>
  );
};

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  card: {
    width: Math.min(400, windowWidth - 60),
    maxWidth: "100%",
  },
  input: {
    marginBottom: 16,
    borderColor: "black",
  },
  button: {
    marginTop: 16,
  },
});

export default DiaryForm;
