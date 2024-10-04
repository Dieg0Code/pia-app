import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Vibration,
} from "react-native";
import { useDiaryStore } from "@/src/presentation/store/DiaryStore";
import { theme } from "@/src/core/constants/theme";
import { Icon, IconButton } from "react-native-paper";

const AssistantPage = () => {
  const [inputText, setInputText] = useState("");
  const {
    getPIAResponse,
    piaResponse,
    loading,
    error,
    chatHistory,
    clearChatHistory,
  } = useDiaryStore();
  const flatListRef = useRef<FlatList<any>>(null);

  useEffect(() => {
    if (piaResponse) {
      scrollToBottom();
    }
  }, [piaResponse]);

  const handleSend = async () => {
    if (inputText.trim()) {
      await getPIAResponse(inputText);
      setInputText("");
    }
  };

  const handleClearChat = () => {
    if (chatHistory.messages.length === 0) return;
    Vibration.vibrate(100);
    clearChatHistory();
  };

  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  type Message = {
    role: string;
    content: string;
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageBubble,
        item.role === "user" ? styles.userBubble : styles.assistantBubble,
      ]}
    >
      <Text style={styles.messageText}>{item.content}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.chatListContainer}>
        <FlatList
          ref={flatListRef}
          data={chatHistory.messages}
          renderItem={renderMessage}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.chatContainer}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <View style={styles.inputContainer}>
        <IconButton
          onLongPress={handleClearChat}
          icon="broom"
          iconColor={theme.textPrimary}
          style={styles.clearButton}
        />
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Escribe tu mensaje..."
          placeholderTextColor={theme.textPrimary}
        />
        <IconButton
          icon="send"
          iconColor={theme.black}
          onPress={handleSend}
          style={styles.sendButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    justifyContent: "space-between",
  },
  chatListContainer: {
    flex: 1,
    marginBottom: 10,
  },
  chatContainer: {
    padding: 10,
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 10,
    borderRadius: 20,
    marginVertical: 5,
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: theme.card,
  },
  assistantBubble: {
    alignSelf: "flex-start",
    backgroundColor: theme.background,
  },
  messageText: {
    color: theme.title,
  },
  inputContainer: {
    flexDirection: "row",
    paddingBottom: 10,
  },
  input: {
    flex: 1,
    backgroundColor: theme.input,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    color: theme.textPrimary,
  },
  sendButton: {
    backgroundColor: theme.primary,
    borderRadius: 20,
    width: 50,
  },
  sendButtonText: {
    color: theme.background,
    fontWeight: "bold",
  },
  clearButton: {
    backgroundColor: theme.input,
    borderRadius: 20,
    justifyContent: "center",
    marginRight: 10,
    width: 40,
    height: 40,
  },
  errorText: {
    color: theme.error,
    textAlign: "center",
    marginVertical: 10,
  },
});

export default AssistantPage;
