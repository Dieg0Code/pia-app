import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { theme } from "@/src/core/constants/theme";

interface UserChatBubbleProps {
  content: string;
}

const UserChatBubble: React.FC<UserChatBubbleProps> = ({ content }) => {
  return (
    <View style={styles.messageBubble}>
      <Text style={styles.messageText}>{content}</Text>
    </View>
  );
};

export default UserChatBubble;

const styles = StyleSheet.create({
  messageBubble: {
    alignSelf: "flex-end",
    backgroundColor: theme.card,
    maxWidth: "80%",
    padding: 10,
    borderRadius: 20,
    marginVertical: 5,
  },
  messageText: {
    color: theme.title,
  },
});
