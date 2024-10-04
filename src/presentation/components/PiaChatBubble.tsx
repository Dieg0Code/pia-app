import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { theme } from "@/src/core/constants/theme";
import Markdown from "react-native-markdown-display";

interface PiaChatBubbleProps {
  content: string;
}

const PiaChatBubble: React.FC<PiaChatBubbleProps> = ({ content }) => {
  return (
    <View style={styles.messageBubble}>
      <Markdown style={markdownStyles}>{content}</Markdown>
    </View>
  );
};

export default PiaChatBubble;

const styles = StyleSheet.create({
  messageBubble: {
    alignSelf: "flex-start",
    backgroundColor: theme.background,
    maxWidth: "80%",
    padding: 10,
    borderRadius: 20,
    marginVertical: 5,
  },
});

const markdownStyles = StyleSheet.create({
  heading1: {
    color: theme.title,
    fontWeight: "bold",
  },
  text: {
    color: theme.title,
  },
  link: {
    color: theme.primary,
  },
  strong: {
    fontWeight: "bold",
  },
  em: {
    fontStyle: "italic",
  },
  code_inline: {
    backgroundColor: theme.card,
    padding: 2,
    borderRadius: 4,
  },
  code_block: {
    backgroundColor: theme.card,
    padding: 10,
    borderRadius: 4,
  },
  blockquote: {
    backgroundColor: theme.card,
    padding: 10,
    borderRadius: 4,
  },
  bullet_list: {
    marginVertical: 5,
  },
  ordered_list: {
    marginVertical: 5,
  },
  list_item: {
    marginVertical: 5,
  },
  hr: {
    marginVertical: 5,
  },
  image: {
    marginVertical: 5,
  },
  table: {
    marginVertical: 5,
  },
  table_header: {
    marginVertical: 5,
  },
  table_row: {
    marginVertical: 5,
  },
  table_cell: {
    marginVertical: 5,
  },
  paragraph: {
    marginVertical: 5,
  },
});
