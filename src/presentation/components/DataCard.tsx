import React from "react";
import { StyleSheet } from "react-native";
import { Card, Text, Button } from "react-native-paper";

interface DataCardProps {
  title: string;
  content: string;
}

const DataCard: React.FC<DataCardProps> = ({ title, content }) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.content}>{content}</Text>
      </Card.Content>
      <Card.Actions>
        <Button mode="contained" onPress={() => {}} style={styles.button}>
          Ver más
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default DataCard;

const styles = StyleSheet.create({
  card: {
    margin: 8,
    borderRadius: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  content: {
    fontSize: 14,
    color: "#666",
  },
  button: {
    marginTop: 8,
  },
});
