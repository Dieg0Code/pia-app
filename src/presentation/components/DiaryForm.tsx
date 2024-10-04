import React, { useState } from "react";
import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { TextInput, Button, Card } from "react-native-paper";
import { useDiaryStore } from "../store/DiaryStore";
import { theme } from "@/src/core/constants/theme";

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
          label="¿Pregunta?..."
          value={title}
          onChangeText={setTitle}
          mode="outlined"
          placeholderTextColor="#171717"
          style={styles.input}
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
            label="Respuesta..."
            value={content}
            onChangeText={setContent}
            mode="outlined"
            multiline
            numberOfLines={4}
            placeholderTextColor="#1F1F1F"
            outlineColor="#1F1F1F"
            style={styles.input}
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
          onPress={handleSubmit}
          style={styles.button}
          labelStyle={{ color: "black" }}
          theme={{ colors: { primary: theme.primary } }}
        >
          Añadir
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
    backgroundColor: theme.card,
    marginTop: -60,
  },
  input: {
    marginBottom: 16,
    borderColor: "#171717",
    backgroundColor: theme.input,
    maxHeight: 300,
  },
  scrollView: {
    maxHeight: 200,
  },
  button: {
    marginTop: 16,
  },
});

export default DiaryForm;
