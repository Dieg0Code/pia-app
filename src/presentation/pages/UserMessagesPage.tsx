import React, {
  useEffect,
  useCallback,
  useState,
  useMemo,
  useRef,
} from "react";
import {
  View,
  StyleSheet,
  RefreshControl,
  Animated,
  Vibration,
} from "react-native";
import { Text, FAB, Snackbar } from "react-native-paper";
import { AnimatedFlashList, FlashList } from "@shopify/flash-list";
import { useDiaryStore } from "../store/DiaryStore";
import { UserMessageDTO } from "@/src/data/models/UserMessageDTO";
import { theme } from "@/src/core/constants/theme";
import UserMessageCard from "../components/UserMessageCard";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import SearchBar from "../components/SearchBar";

const SCROLL_THRESHOLD = 600;
const PAGE_SIZE = 20;

const UserMessagesPage = () => {
  const {
    userMessages,
    loading,
    error,
    getUserMessages,
    deleteMessage,
    deleteMessageSuccess,
    clearDeleteMessageSuccess,
  } = useDiaryStore();

  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [messages, setMessages] = useState<UserMessageDTO[]>([]);
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState({
    visible: false,
    message: "",
    color: "white",
  });

  const listRef = useRef<FlashList<UserMessageDTO>>(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  const fetchMessages = useCallback(
    async (pageNum: number, refresh = false) => {
      await getUserMessages(pageNum, PAGE_SIZE);
      if (refresh) setRefreshing(false);
    },
    [getUserMessages]
  );

  useEffect(() => {
    fetchMessages(page);
  }, [fetchMessages, page]);

  useEffect(() => {
    if (userMessages && Array.isArray(userMessages)) {
      setMessages((prevMessages) => {
        if (page === 1) return userMessages;
        const newMessages = userMessages.filter(
          (newMessage) =>
            !prevMessages.some(
              (prevMessage) => prevMessage.id === newMessage.id
            )
        );
        return [...prevMessages, ...newMessages];
      });
    }
  }, [userMessages, page]);

  useEffect(() => {
    if (deleteMessageSuccess) {
      showSnackbar("Mensaje eliminado correctamente", theme.warning);
      clearDeleteMessageSuccess();
    } else if (error) {
      showSnackbar(error, theme.error);
    }
  }, [deleteMessageSuccess, error]);

  const showSnackbar = (message: string, color: string) => {
    setSnackbar({ visible: true, message, color });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(1);
    fetchMessages(1, true);
  }, [fetchMessages]);

  const loadMoreMessages = () => {
    if (!loading) setPage((prevPage) => prevPage + 1);
  };

  const handleDeleteMessage = useCallback(async () => {
    if (!messageToDelete) return;
    Vibration.vibrate(100);
    try {
      await deleteMessage(messageToDelete);
    } catch (error) {
      showSnackbar("Error al eliminar el mensaje", theme.error);
    } finally {
      setMessageToDelete(null);
      setIsDeleteModalVisible(false);
      onRefresh();
    }
  }, [messageToDelete, deleteMessage, onRefresh]);

  const filteredMessages = useMemo(() => {
    return messages.filter((message) => {
      const messageContent = message.messageContent?.toLowerCase() || "";
      const senderLocation = message.senderLocation?.toLowerCase() || "";
      const query = searchQuery.toLowerCase();

      return messageContent.includes(query) || senderLocation.includes(query);
    });
  }, [messages, searchQuery]);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: true,
      listener: (event: { nativeEvent: { contentOffset: { y: number } } }) => {
        setShowScrollTopButton(
          event.nativeEvent.contentOffset.y > SCROLL_THRESHOLD
        );
      },
    }
  );

  const scrollToTop = () => {
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const renderItem = useCallback(
    ({ item }: { item: UserMessageDTO }) => (
      <UserMessageCard
        messageContent={item.messageContent}
        senderLocation={item.senderLocation}
        onDelete={() => {
          setMessageToDelete(item.id);
          setIsDeleteModalVisible(true);
        }}
      />
    ),
    []
  );

  if (error && !deleteMessageSuccess) {
    return <Text style={styles.infoText}>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <SearchBar setSearchQuery={setSearchQuery} value={searchQuery} />
      {filteredMessages.length > 0 ? (
        <>
          <AnimatedFlashList
            contentContainerStyle={styles.listContainer}
            ref={listRef}
            data={filteredMessages}
            renderItem={renderItem}
            estimatedItemSize={100}
            keyExtractor={(item) => item.id.toString()}
            onEndReached={loadMoreMessages}
            onEndReachedThreshold={0.5}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[theme.black]}
                progressBackgroundColor={theme.primary}
              />
            }
            ListFooterComponent={
              loading ? (
                <Text style={styles.infoText}>Loading more...</Text>
              ) : null
            }
            onScroll={handleScroll}
            scrollEventThrottle={16}
          />
          {showScrollTopButton && (
            <FAB
              style={styles.fab}
              icon="arrow-up"
              onPress={scrollToTop}
              color={theme.title}
            />
          )}
        </>
      ) : (
        <Text style={styles.infoText}>
          {searchQuery
            ? "No se encontraron resultados"
            : "No hay mensajes disponibles"}
        </Text>
      )}

      <ConfirmDeleteModal
        visible={isDeleteModalVisible}
        onDismiss={() => setIsDeleteModalVisible(false)}
        onConfirm={handleDeleteMessage}
      />

      <Snackbar
        visible={snackbar.visible}
        onDismiss={() => setSnackbar((prev) => ({ ...prev, visible: false }))}
        duration={3000}
        action={{
          label: "Cerrar",
          onPress: () => setSnackbar((prev) => ({ ...prev, visible: false })),
          labelStyle: { color: "#0D0D0D" },
        }}
        style={[styles.snackbar, { backgroundColor: snackbar.color }]}
      >
        <Text style={{ color: "#0D0D0D" }}>{snackbar.message}</Text>
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  listContainer: {
    paddingTop: 10,
    paddingBottom: 140,
  },
  fab: {
    position: "absolute",
    margin: 16,
    alignSelf: "center",
    bottom: 60,
    borderRadius: 50,
    backgroundColor: theme.fab,
  },
  snackbar: {
    position: "absolute",
    bottom: 60,
    marginHorizontal: 30,
  },
  infoText: {
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
});

export default UserMessagesPage;
