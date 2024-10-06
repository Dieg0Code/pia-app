import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Vibration,
  Keyboard,
} from "react-native";
import { useDiaryStore } from "@/src/presentation/store/DiaryStore";
import { theme } from "@/src/core/constants/theme";
import { IconButton } from "react-native-paper";
import { ChatMessage } from "@/src/data/models/ChatMessage";
import UserChatBubble from "../components/UserChatBubble";
import PiaChatBubble from "../components/PiaChatBubble";

const AssistantPage = () => {
  const [inputText, setInputText] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  const {
    getPIAResponse,
    piaResponse,
    error,
    chatHistory,
    clearChatHistory,
    loading,
  } = useDiaryStore();
  const flatListRef = useRef<FlatList<ChatMessage>>(null);
  const [contentVerticalOffset, setContentVerticalOffset] = useState(0);

  const scrollToBottom = useCallback(() => {
    if (flatListRef.current && contentVerticalOffset > 0) {
      flatListRef.current.scrollToOffset({
        offset: contentVerticalOffset,
        animated: true,
      });
    }
  }, [contentVerticalOffset]);

  useEffect(() => {
    if (piaResponse || messageSent) {
      // Usar requestAnimationFrame para asegurar que el scroll ocurra en el próximo frame de renderizado
      requestAnimationFrame(() => {
        scrollToBottom();
        Keyboard.dismiss();
      });
    }
  }, [piaResponse, messageSent, scrollToBottom]);

  const handleSend = async () => {
    if (inputText.trim()) {
      setMessageSent(true);
      Vibration.vibrate(100);
      setInputText("");
      await getPIAResponse(inputText);
    }
  };

  const handleClearChat = () => {
    if (chatHistory.messages.length === 0) return;
    Vibration.vibrate(100);
    clearChatHistory();
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => {
    return item.role === "user" ? (
      <UserChatBubble content={item.content} />
    ) : (
      <PiaChatBubble content={item.content} />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.chatListContainer}>
        <FlatList
          ref={flatListRef}
          data={chatHistory.messages}
          renderItem={renderMessage}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.chatContainer}
          onContentSizeChange={(width, height) => {
            setContentVerticalOffset(height);
          }}
          onLayout={scrollToBottom}
          onScroll={({ nativeEvent }) => {
            setContentVerticalOffset(nativeEvent.contentSize.height);
          }}
          scrollEventThrottle={16}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <View style={styles.inputContainer}>
        <IconButton
          onPress={handleClearChat}
          icon="broom"
          iconColor={theme.textPrimary}
          style={styles.clearButton}
        />
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={handleSend}
          placeholder="Escribe tu mensaje..."
          placeholderTextColor={theme.textPrimary}
        />
        <IconButton
          icon="arrow-up"
          loading={loading}
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
    marginBottom: 30,
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
    paddingBottom: 24,
  },
  input: {
    flex: 1,
    backgroundColor: theme.input,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: theme.textPrimary,
  },
  sendButton: {
    backgroundColor: theme.primary,
    borderRadius: 20,
    justifyContent: "center",
    width: 40,
    height: 40,
    marginLeft: 16,
    marginRight: 16,
  },
  sendButtonText: {
    color: theme.background,
    fontWeight: "bold",
  },
  clearButton: {
    backgroundColor: theme.input,
    borderRadius: 20,
    justifyContent: "center",
    marginRight: 16,
    marginLeft: 16,
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
