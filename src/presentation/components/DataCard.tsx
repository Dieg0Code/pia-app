import { theme } from "@/src/core/constants/theme";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text, TouchableRipple, IconButton } from "react-native-paper";

interface DataCardProps {
  title: string;
  content: string;
  onLongPress: () => void;
  onDelete: () => void;
}

const DataCard: React.FC<DataCardProps> = React.memo(
  ({ title, content, onLongPress, onDelete }) => {
    return (
      <Card style={styles.card}>
        <TouchableRipple
          onLongPress={onLongPress}
          rippleColor="rgba(0, 0, 0, .32)"
          style={styles.touchable}
        >
          <View>
            <IconButton
              icon="delete-forever"
              size={20}
              onPress={onDelete}
              style={styles.deleteIcon}
            />
            <Card.Content>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.content}>{content}</Text>
            </Card.Content>
          </View>
        </TouchableRipple>
      </Card>
    );
  }
);

export default DataCard;

const styles = StyleSheet.create({
  card: {
    margin: 8,
    borderRadius: 16,
    backgroundColor: theme.card,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    paddingTop: 8,
    paddingLeft: 8,
  },
  content: {
    fontSize: 14,
    color: "#666",
    paddingLeft: 8,
    paddingBottom: 8,
    textAlign: "left",
  },
  touchable: {
    borderRadius: 16,
  },
  deleteIcon: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 1,
  },
});
